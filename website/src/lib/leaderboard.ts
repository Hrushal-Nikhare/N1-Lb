interface Player {
    id: string,
    is_guest: boolean,
    stats: PlayerStats,
    username: string,
    verified: string
}

type PlayerStats = {
    [key in Stat]?: number
};
// the leaderboard will dynamically load more entries when the user scrolls down
// each batch of entries is in its own chunk
interface LeaderboardChunk {
    data: Player[],
    min: number,
    max: number,
}
interface Leaderboard {
    chunks: LeaderboardChunk[],
    stat: Stat
}
class Controls {
    shown_stats: {
        [key in Stat]: boolean
    } = {
        deaths: true,
        elo: true,
        flagsCaptured: true,
        gamesPlayed: true,
        gamesWon: true,
        kills: true,
        totalPoints: true,
        kdratio: true
    };
    sort_stat: Stat = "kills";
}


type Stat = keyof typeof STATS;
// object, left is the server name for a property, right is the displayed name
const STATS = {
    "deaths": "Deaths",
    "elo": "Elo",
    "flagsCaptured": "Captures",
    "gamesPlayed": "Games Played",
    "gamesWon": "Wins",
    "kills": "Kills",
    "totalPoints": "Points",
    "kdratio": "KDR"
}

export type { Player, PlayerStats, Leaderboard, LeaderboardChunk, Stat };
export { STATS, Controls };