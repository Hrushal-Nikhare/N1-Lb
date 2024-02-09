
import type { APIRoute } from 'astro';
import { getTopXUsersByStat, getTopXUsersByKDRatio } from "../../lib/db";

export const GET: APIRoute = async ({ request }) => {
    return new Response(null, {
        status: 400,
        statusText: "Bad request",
    }); 
}

export const POST: APIRoute = async ({ request }) => {
    if (request.headers.get("Content-Type") === "application/json") {
        const User = await request.json();
        try {
            if (User.stat == "kdratio") {
                const users = await getTopXUsersByKDRatio(User.x);
                if (!users) {
                    return new Response(null, {
                        status: 404,
                        statusText: "Not found",
                    });
                }
                return new Response(JSON.stringify(users), {
                    status: 200,
                });
            } else {
                // var startTime = performance.now()
                const users = await getTopXUsersByStat(User.stat, User.x);
                // var endTime = performance.now()
                // console.log("Time taken to process request: " + (endTime - startTime) + "ms")
                if (!users) {
                    return new Response(null, {
                        status: 404,
                        statusText: "Not found",
                    });
                }
                return new Response(JSON.stringify(users), {
                    status: 200,
                });
            }
        }
        // console.log(User.username, User)

        catch (e) {
            return new Response(null, { status: 400 });
        }
    }
    return new Response(null, { status: 400 });
}