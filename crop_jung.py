from PIL import Image
import os

def crop_transparency(image_path):
    try:
        img = Image.open(image_path)
        img = img.convert("RGBA")
        bbox = img.getbbox()
        if bbox:
            cropped_img = img.crop(bbox)
            cropped_img.save(image_path)
            print(f"Cropped: {image_path}")
        else:
            print(f"No content found in: {image_path}")
    except Exception as e:
        print(f"Error processing {image_path}: {e}")

target_dir = r"h:\01. 게임\The_Legacy_Of_The_Triple_A\The_Legacy_Of_The_Triple_A\assets\images\character"
target_file = "jung.png"
full_path = os.path.join(target_dir, target_file)

if os.path.exists(full_path):
    crop_transparency(full_path)
else:
    print(f"File not found: {full_path}")
