import { MongoClient } from "mongodb";

if (!import.meta.env.DB) {
	throw new Error('Invalid environment variable: "DB"');
}

const uri = import.meta.env.DB;
const options = {};
let cachedMongo;

const connectToDB = async () => {
	const mongo = await new MongoClient(uri, options).connect();
	// Change this to your own DB name of course.
	// Or better yet, put it in your .env
	return mongo.db("N1");
};

export const getDB = async () => {
	// In development mode, use a global variable so that the value
	// is preserved across module reloads caused by HMR (Hot Module Replacement).
	// Text above copied from :
	// https://github.com/vercel/next.js/blob/canary/examples/with-mongodb/lib/mongodb.ts

	if (import.meta.env.NODE_ENV === "development") {
		if (!global._mongoConnection) {
			global._mongoConnection = await connectToDB();
			cachedMongo = global._mongoConnection;
		}
		return cachedMongo;
	}
	const mongo = await connectToDB();
	return mongo;
};

export const Users = async () => {
	const db = await getDB();
	return db.collection("LB");
};

export const getAllUsers = async () => {
	const users = await (await Users()).find({}).toArray();
	return users;
};

async function upsertListingByName(nameOfListing, updatedListing) {
    const db = await getDB();
    await db.collection("LB")
        .updateOne({ name: nameOfListing },
            { $set: updatedListing },
            { upsert: true });
}

export async function AddOrUpdateData(name, updated) {
    try {
        await upsertListingByName(name, updated);
    } catch (e) {
        console.error(e);
    }
}


export const getTopXUsersByKDRatio = async (x) => {
    const db = await getDB();

    const topXUsers = await db.collection("LB")
        .aggregate([
            {
                $addFields: {
                    kdRatio: {
                        $cond: {
                            if: { $gt: ["$stats.deaths", 0] },
                            then: { $divide: ["$stats.kills", "$stats.deaths"] },
                            else: "$stats.kills"
                        }
                    }
                }
            },
            { $sort: { kdRatio: -1 } },
            { $limit: x }
        ])
        .toArray();

    return topXUsers;
};



export const getTopXUsersByStat = async (stat, x) => {
    const db = await getDB();

    // Sort users by the specified stat in descending order and limit to X
    const topXUsers = await db.collection("LB")
        .find({})
        .sort({ [`stats.${stat}`]: -1 })
        .limit(x)
        .toArray();

    return topXUsers;
};
