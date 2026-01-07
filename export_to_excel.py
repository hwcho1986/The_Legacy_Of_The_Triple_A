import json
import pandas as pd
import os

# Define paths
play_json_path = r"h:\01. 게임\The_Legacy_Of_The_Triple_A\The_Legacy_Of_The_Triple_A\assets\Table\PLAY.JSON"
loc_json_path = r"h:\01. 게임\The_Legacy_Of_The_Triple_A\The_Legacy_Of_The_Triple_A\assets\Table\LOCALIZATION.JSON"
excel_output_path = r"h:\01. 게임\The_Legacy_Of_The_Triple_A\The_Legacy_Of_The_Triple_A\assets\Table\MainforEdit.xlsx"

def export_to_excel():
    # Load PLAY.JSON
    with open(play_json_path, 'r', encoding='utf-8') as f:
        play_data = json.load(f)
    
    # PLAY data is a list of dictionaries
    df_play = pd.DataFrame(play_data)

    # Load LOCALIZATION.JSON
    with open(loc_json_path, 'r', encoding='utf-8') as f:
        loc_data = json.load(f)
    
    # LOCALIZATION data is a dict of dicts: { "KEY": { "KO": "...", "EN": "..." } }
    # We want "KEY" as a column or index. orient='index' puts keys as rows.
    df_loc = pd.DataFrame.from_dict(loc_data, orient='index')
    df_loc.index.name = 'Key'
    df_loc.reset_index(inplace=True)

    # Write to Excel
    with pd.ExcelWriter(excel_output_path, engine='openpyxl') as writer:
        df_play.to_excel(writer, sheet_name='PLAY', index=False)
        df_loc.to_excel(writer, sheet_name='LOCALIZATION', index=False)
    
    print(f"Excel file created successfully at: {excel_output_path}")

if __name__ == "__main__":
    export_to_excel()
