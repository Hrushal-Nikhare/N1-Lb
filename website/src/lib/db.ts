import type { Leaderboard, LeaderdoardItem, Stat } from "./leaderboard";
const DB_SERVER_URL = "";


async function get(stat: Stat, max_items: number, max_stat_value: number): Promise<Leaderboard> {
    let res = await fetch(DB_SERVER_URL, {
        method: "POST",
        body: JSON.stringify({
            "stat": stat,
            "limit": max_items,
            "max": max_stat_value
        })
    });
    let body = await res.json() as LeaderdoardItem[];
    return {
        stat: stat,
        data: body
    };
}