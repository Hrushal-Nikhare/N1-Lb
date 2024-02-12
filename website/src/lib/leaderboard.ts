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