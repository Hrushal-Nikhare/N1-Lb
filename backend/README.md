# Narrow one Backend /api

### all paths
- `/api/post`
    - POST request
    - Update / Create a User
    - Request Body is in JSON
    - Example:
```json
{
	"username": "Here we go",
	"isGuest": false,
	"stats": {
		"deaths": 874,
		"elo": 0.24142472677767968,
		"flagsCaptured": 147,
		"gamesPlayed": 229,
		"gamesWon": 135,
		"kills": 1054,
		"totalPoints": 65917
	},
	"dbId": "65a39ffbf9fa9a00b60d332a",
	"usernameData": {
		"username": "Here we go",
		"verified": false
	}
}
```
---
- `/api/getAll` 
    - GET request
    - Get all users
---
- `/api/getOne/:id`
    - GET request
    - Get one user by dbId
    - here `:id` is the dbId of the user
---
- `/api/getTopXByKDRatio/:x`
    - GET request
    - Get top x users by KDRatio
    - here `:x` is the number of users to get
---
- `/api/getTopXByStat/:stat/:x`
    - GET request
    - Get top x users by a stat
    - here `:stat` is the stat to sort by and `:x` is the number of users to get
    - Valid stats are: `deaths`, `elo`, `flagsCaptured`, `gamesPlayed`, `gamesWon`, `kills`, `totalPoints`
---
- `/api/getTopByStatInRange/:stat/:min/:max`
    - GET request
    - Get top users by a stat in a range
    - here `:stat` is the stat to sort by, `:min` and `max` are the range of players to get
    - Valid stats are: `deaths`, `elo`, `flagsCaptured`, `gamesPlayed`, `gamesWon`, `kills`, `totalPoints`
---
- `/api/getTopByKDRatioInRange/:min/:max`
    - GET request
    - Get top users by KDRatio in a range
    - here `:min` and `max` are the range of players to get
---
## Done!
