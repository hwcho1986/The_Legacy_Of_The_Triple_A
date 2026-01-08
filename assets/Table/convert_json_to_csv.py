import json
import csv
import os

base_path = r"h:\01. 게임\The_Legacy_Of_The_Triple_A\The_Legacy_Of_The_Triple_A\assets\Table"
loc_path = os.path.join(base_path, "LOCALIZATION.JSON")
play_path = os.path.join(base_path, "PLAY.JSON")
loc_csv_path = os.path.join(base_path, "LOCALIZATION.csv")
play_csv_path = os.path.join(base_path, "PLAY.csv")

def convert_localization():
    try:
        with open(loc_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Headers as requested
        headers = ["Key", "KO", "EN", "JP", "CN_S", "CN_T", "ES"]
        
        with open(loc_csv_path, 'w', encoding='utf-8-sig', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(headers)
            
            for key, val in data.items():
                row = [key]
                # Fallback to empty string if lang key missing
                row.append(val.get("KO", ""))
                row.append(val.get("EN", ""))
                row.append(val.get("JP", ""))
                row.append(val.get("CN_S", ""))
                row.append(val.get("CN_T", ""))
                row.append(val.get("ES", ""))
                writer.writerow(row)
        print(f"Created {loc_csv_path}")
    except Exception as e:
        print(f"Error converting LOCALIZATION: {e}")

def convert_play():
    try:
        with open(play_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        headers = ["Index", "type", "Value01", "Value02", "Value03", "Value04", "Value05"]
        
        with open(play_csv_path, 'w', encoding='utf-8-sig', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(headers)
            
            for item in data:
                row = []
                row.append(item.get("Index", ""))
                row.append(item.get("type", ""))
                
                for i in range(1, 6):
                    key = f"Value0{i}"
                    val = item.get(key, "")
                    if isinstance(val, (list, dict)):
                        row.append(json.dumps(val, ensure_ascii=False))
                    else:
                        row.append(str(val))
                writer.writerow(row)
        print(f"Created {play_csv_path}")
    except Exception as e:
        print(f"Error converting PLAY: {e}")

if __name__ == "__main__":
    convert_localization()
    convert_play()
