/**
 * Google Sheets Data Loader
 * Fetches and parses CSV data from published Google Sheets.
 * Falls back to local JSON files if fetch fails or URLs are not configured.
 */

const SHEET_CONFIG = {
    // [USER SETUP REQUIRED]
    // Replace these URLs with your published Google Sheet CSV links.
    // See GOOGLE_SHEET_SETUP.md for instructions.
    localizationUrl: "", // e.g. "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdRMDw8LGfQiBMzW_9vVnkVXIhwuVw8cFtNdHEenyamaGX41sSEJn3wcWmsDox6Uw8BPDiIwoFrOoL/pub?gid=0&single=true&output=csv"
    playUrl: ""          // e.g. "https://docs.google.com/spreadsheets/d/e/2PACX-1vSovBNzdHYEOu2Tp1fkHndFo7b2CErE-DtVTwD6INEzm6d6o0x1-bt-z5yxQnJYSdIktgkPuiIFtfNj/pub?gid=0&single=true&output=csv"
};

const DataLoader = {
    async loadData() {
        console.log("DataLoader: Starting data load...");

        try {
            // Check if URLs are configured
            if (!SHEET_CONFIG.localizationUrl || !SHEET_CONFIG.playUrl) {
                console.warn("DataLoader: Google Sheet URLs not configured. Falling back to local JSON.");
                return await this.loadLocalData();
            }

            // Try fetching from Sheets
            const [locText, playText] = await Promise.all([
                this.fetchCSV(SHEET_CONFIG.localizationUrl),
                this.fetchCSV(SHEET_CONFIG.playUrl)
            ]);

            const localization = this.processLocalization(this.parseCSV(locText));
            const events = this.processPlay(this.parseCSV(playText));

            console.log("DataLoader: Successfully loaded data from Google Sheets.");
            return { localization, events };

        } catch (error) {
            console.error("DataLoader: Fetch failed or error parsing Sheets data.", error);
            console.log("DataLoader: Falling back to local JSON...");
            return await this.loadLocalData();
        }
    },

    async loadLocalData() {
        try {
            const [resP, resL] = await Promise.all([
                fetch('assets/Table/PLAY.JSON'),
                fetch('assets/Table/LOCALIZATION.JSON')
            ]);

            if (!resP.ok || !resL.ok) throw new Error("Failed to load local JSON files.");

            const events = await resP.json();
            const localization = await resL.json();

            // Sort events by Index just in case
            events.sort((a, b) => a.Index - b.Index);

            return { localization, events };
        } catch (e) {
            console.error("DataLoader: Critical error loading local data.", e);
            alert("Game Data Load Error: " + e.message);
            return { localization: {}, events: [] };
        }
    },

    async fetchCSV(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.text();
    },

    // Robust CSV Parser handling quotes and newlines
    parseCSV(text) {
        const rows = [];
        let currentRow = [];
        let currentCell = '';
        let insideQuotes = false;

        // Normalize newlines
        text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const nextChar = text[i + 1];

            if (char === '"') {
                if (insideQuotes && nextChar === '"') {
                    // Escaped quote ("") -> single quote (")
                    currentCell += '"';
                    i++;
                } else {
                    // Toggle quote state
                    insideQuotes = !insideQuotes;
                }
            } else if (char === ',' && !insideQuotes) {
                // End of cell
                currentRow.push(currentCell);
                currentCell = '';
            } else if (char === '\n' && !insideQuotes) {
                // End of row
                currentRow.push(currentCell);
                if (currentRow.length > 0) rows.push(currentRow);
                currentRow = [];
                currentCell = '';
            } else {
                currentCell += char;
            }
        }

        // Push last cell/row if exists
        if (currentCell || currentRow.length > 0) {
            currentRow.push(currentCell);
            rows.push(currentRow);
        }

        return rows;
    },

    processLocalization(rows) {
        if (rows.length < 2) return {};

        const headers = rows[0].map(h => h.trim());
        const data = {};

        // Find language columns indices
        const keyIndex = headers.indexOf('Key');
        if (keyIndex === -1) throw new Error("LOCALIZATION sheet missing 'Key' column.");

        // Build object: { "KEY": { "KO": "...", "EN": "..." } }
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const key = row[keyIndex];
            if (!key) continue;

            data[key] = {};

            headers.forEach((header, colIndex) => {
                if (header !== 'Key' && colIndex < row.length) {
                    data[key][header] = row[colIndex];
                }
            });
        }
        return data;
    },

    processPlay(rows) {
        if (rows.length < 2) return [];

        const headers = rows[0].map(h => h.trim());
        const events = [];

        // Map row array to object
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const eventObj = {};
            let isEmpty = true;

            headers.forEach((header, colIndex) => {
                if (colIndex >= row.length) return;

                let value = row[colIndex];

                if (value && value.trim() !== '') {
                    isEmpty = false;

                    // Conversions
                    if (header === 'Index') {
                        value = parseInt(value, 10);
                    } else if (header.startsWith('Value')) {
                        // Try parsing numbers
                        if (!isNaN(value) && value.trim() !== '') {
                            // Check if it's really a number (not a string like "001" if that matters, but JSON usually treats them as numbers if they look like it)
                            // However, let's simplistic check: JSON.parse might be safer for types if user inputs valid JSON
                            try {
                                const parsed = JSON.parse(value);
                                value = parsed;
                            } catch (e) {
                                // Keep as string
                            }
                        }
                    }
                }

                // Only add if not empty string? Or add empty string? 
                // JSON usually has fields even if empty, but let's just assign what is there.
                // The original JSON usually omits undefined fields or has them.
                // We'll set everything present in CSV.
                if (value !== undefined && value !== "") {
                    eventObj[header] = value;
                }
            });

            if (!isEmpty && eventObj.Index !== undefined) {
                events.push(eventObj);
            }
        }

        return events.sort((a, b) => a.Index - b.Index);
    }
};

window.DataLoader = DataLoader; // Expose to global
