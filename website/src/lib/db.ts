import * as lb from './leaderboard';
const DB_SERVER_URL = 'https://n1-api.vercel.app/api';

function db_player2player(db_player: any): lb.Player {
    let stats: lb.PlayerStats = {};
    stats.deaths = db_player.stats.deaths;
    stats.elo = db_player.stats.elo;
    stats.flagsCaptured = db_player.stats.flagsCaptured;
    stats.gamesPlayed = db_player.stats.gamesPlayed;
    stats.gamesWon = db_player.stats.gamesWon;
    stats.kills = db_player.stats.kills;
    stats.totalPoints = db_player.stats.totalPoints;
    if (stats.kills && stats.deaths) {
        stats.elo = stats.kills / stats.deaths;
    }
    return {
        id: db_player.dbId,
        is_guest: db_player.isGuest,
        stats: stats,
        username: db_player.username,
        verified: db_player.usernameData.verified
    }
}

async function get_with_range(stat: lb.Stat, min: number, max: number): Promise<lb.LeaderboardChunk> {
    let url = '';
    if (stat === "kdratio") {
        url = DB_SERVER_URL +  `/getTopByKDRatioInRange/${min}/${max}`;
    } else {
        url = DB_SERVER_URL + `/getTopByStatInRange/${stat}/${min}/${max}`;
    }
    let res = await fetch(url);
    let body = (await res.json()).map((x: any) => db_player2player(x)) as lb.Player[];

    return {
        data: body,
        min: min,
        max: max
    };
}
async function get_n(stat: lb.Stat, n: number): Promise<lb.LeaderboardChunk> {
    let url = '';
    if (stat === "kdratio") {
        url = DB_SERVER_URL + `/getTopXByKDRatio/${n}`;
    } else {
        url = DB_SERVER_URL + `/getTopXByStat/${stat}/${n}`;
    }
    let res = await fetch(url);
    let body = (await res.json()).map((x: any) => db_player2player(x)) as lb.Player[];
    console.log(body);
    return {
        data: body,
        min: body[0].stats[stat]??Number.MIN_VALUE,
        max: body[body.length - 1].stats[stat]??Number.MAX_VALUE
    };
}
export { get_with_range, get_n };