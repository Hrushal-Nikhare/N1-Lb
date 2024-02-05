# Usage Information

### /api/update

-  #### **Method**: `POST`
-   **Description**: Update the information of a specific user.
-   **Request**:
    -   **Body**: JSON
        -   **username**: String
        -   **isGuest**: Boolean
        -   **stats**: Object
            -   **deaths**: Number
            -   **elo**: Number
            -   **flagsCaptured**: Number
            -   **gamesPlayed**: Number
            -   **gamesWon**: Number
            -   **kills**: Number
            -   **totalPoints**: Number
        -   **dbId**: String
        -   **usernameData**: Object
            -   **username**: String
            -   **verified**: Boolean
    - example:
        ```json
        {
            "username": "test",
            "isGuest": false,
            "stats": {
                "deaths": 0,
                "elo": 1000,
                "flagsCaptured": 0,
                "gamesPlayed": 0,
                "gamesWon": 0,
                "kills": 0,
                "totalPoints": 0
            },
            "dbId": "5f9e3e3e3e3e3e3e3e3e3e3e",
            "usernameData": {
                "username": "test",
                "verified": true
            }
        }
        ```
---
### /api/lb
- #### **Method**: `POST`
- **Description**: Get the leaderboard for a specific stat.
- **Request**:
    - **Body**: JSON
        - **stat**: String
        - **limit**: Number
    - example:
        ```json
        {
            "stat": "elo",
            "limit": 10
        }
        ```
    - **Response**: JSON
        - **leaderboard**: Array
            - **username**: String
            - **stat**: Number
        - example:
            ```json
            {
                "leaderboard": [
                    {
                        "username": "test",
                        "stat": 1000
                    }
                ]
            }
            ```
    - Possible stats:
        - deaths
        - elo
        - flagsCaptured
        - gamesPlayed
        - gamesWon
        - kills
        - totalPoints
        - kdratio