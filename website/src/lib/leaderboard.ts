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

enum Stat {
    deaths = "deaths",
    elo = "elo",
    captures = "flagsCaptured",
    games_played = "gamesPlayed",
    wins = "gamesWon",
    kills = "kills",
    points = "totalPoints",
    kdr = "kdratio"
}

export type { Player, PlayerStats, Leaderboard, LeaderboardChunk };
export { Stat };