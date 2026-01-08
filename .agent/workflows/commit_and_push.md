---
description: Commit and push all changes to the repository
---

1. Check the current git status
    ```bash
    git status
    ```

2. Stage all changes
    ```bash
    git add .
    ```

3. Commit changes
    - Unless the user provides a specific message, use a descriptive message relevant to the recent changes.
    - If unsure, use "Update: Apply recent changes".
    ```bash
    git commit -m "Update: Apply recent changes"
    ```

4. Push to remote
    - Pull first to ensure no conflicts.
    ```bash
    git pull --rebase
    git push
    ```
