# The Legacy of the Triple A (대괴도 AAA의 유산)

A standalone visual novel engine built with HTML5, Tailwind CSS, and JSON-driven scenario logic.

## How to Run

Because the game loads scenario and localization data from external JSON files, modern browsers' security policies (CORS) may block it if you open `index.html` directly from your file explorer.

### Recommended: Local Web Server
1. If you are using **VS Code**, install the **Live Server** extension.
2. Open the project folder in VS Code.
3. Click "Go Live" at the bottom right.

### Alternative: Firefox
Firefox handles local file permissions differently and may allow the game to run even without a server.

## Project Structure
- `index.html`: Main game engine and UI.
- `assets/Table/`: Contains `PLAY.JSON` (scenario) and `LOCALIZATION.JSON` (text).
- `assets/images/`: Organized background and character assets.
- `assets/audio/`: BGM and SFX files.
