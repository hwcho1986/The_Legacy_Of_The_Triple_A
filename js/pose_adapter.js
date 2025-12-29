/**
 * PoseAdapter: Handles Teachable Machine Pose Model
 */
export class PoseAdapter {
    constructor(onPrediction) {
        this.onPrediction = onPrediction; // Callback function(direction)
        this.model = null;
        this.webcam = null;
        this.maxPredictions = 0;
        this.isReady = false;
    }

    async init() {
        const URL = "./my_model/";
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        try {
            this.model = await tmPose.load(modelURL, metadataURL);
            this.maxPredictions = this.model.getTotalClasses();

            // Convenience function to setup a webcam
            const size = 200;
            const flip = true; // whether to flip the webcam
            this.webcam = new tmPose.Webcam(size, size, flip);
            await this.webcam.setup(); // request access to the webcam
            await this.webcam.play();

            // Append webcam canvas to DOM
            const container = document.getElementById("webcam-container");
            container.innerHTML = ''; // Clear previous if any
            container.appendChild(this.webcam.canvas);

            this.isReady = true;
            window.requestAnimationFrame(this.loop.bind(this));
        } catch (e) {
            console.error("Error loading Teachable Machine model:", e);
            // Optionally notify user via UI if camera fails
        }
    }

    async loop() {
        if (this.isReady) {
            this.webcam.update(); // update the webcam frame
            await this.predict();
            window.requestAnimationFrame(this.loop.bind(this));
        }
    }

    async predict() {
        // Prediction #1: run input through posenet
        // estimatePose can take in an image, video or canvas html element
        const { pose, posenetOutput } = await this.model.estimatePose(this.webcam.canvas);
        // Prediction 2: run input through teachable machine classification model
        const prediction = await this.model.predict(posenetOutput);

        // Find highest probability class
        let maxProb = 0;
        let bestClass = "";

        for (let i = 0; i < this.maxPredictions; i++) {
            if (prediction[i].probability > maxProb) {
                maxProb = prediction[i].probability;
                bestClass = prediction[i].className;
            }
        }

        // Mapping labels to directions
        // Labels: ["왼쪽", "오른쪽", "정면", "위", "아래"]
        if (maxProb > 0.8) { // Threshold
            if (bestClass === "왼쪽") {
                this.onPrediction('left');
            } else if (bestClass === "오른쪽") {
                this.onPrediction('right');
            } else {
                this.onPrediction('stop');
            }
        } else {
            this.onPrediction('stop');
        }
    }
}
