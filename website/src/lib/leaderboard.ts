interface LeaderdoardItem {
    player: Player
    stat: number
}
interface Player {
    username: string,
    icon?: string
}
interface Leaderboard {
    stat: Stat
    data: LeaderdoardItem[]
}
enum Stat {
    deaths = "deaths",
    elo = "elo",
    captures = "flagsCaptured",
    gamesPlayed = "gamesPlayed",
    wins = "gamesWon",
    kills = "kills",
    points = "totalPoints",
    kdr = "kdratio"
}

export type { LeaderdoardItem, Leaderboard, Player };
export { Stat };