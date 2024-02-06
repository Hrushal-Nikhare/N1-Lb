
import type { APIRoute } from 'astro';
// import {getAllUsers} from "../../lib/db"; // for GET request
import { AddOrUpdateData } from "../../lib/db";

// Not needed right now but could be used in the future
// export const GET: APIRoute = async ({ params, request }) => {
//     const users = await getAllUsers();
//     if (!users) {
//         return new Response(null, {
//             status: 404,
//             statusText: "Not found",
//         });
//     }

//     return new Response(JSON.stringify(users), {
//         status: 200,
//     });
// }
export const ALL: APIRoute = async ({ request }) => {
    return new Response(JSON.stringify("found"), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    });
}


export const POST: APIRoute = async ({ request }) => {
    if (request.headers.get("Content-Type") === "application/json") {
        const User = await request.json();
        // console.log(User.username, User)
        await AddOrUpdateData(User.username, User);
        return new Response(JSON.stringify(null), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
    }
    return new Response(null, {
        status: 400,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    });

}