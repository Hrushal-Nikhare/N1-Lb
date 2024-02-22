const express = require("express");
const Model = require("../models/model");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const kv = require("@vercel/kv");
const {
	getTopXUsersByKDRatio,
	getTopXUsersByStat,
	getTopUsersByStatInRange,
	getTopUsersByKDRatioInRange,
} = require("../lib/fetch");

const bannedIPs = [];

// Rate Limiter
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10,
	message:
		"Too many requests from this IP, please try again after some time.",
});

const ipBanningMiddleware = (req, res, next) => {
	const clientIP = req.ip;

	if (bannedIPs.includes(clientIP)) {
		return res.status(403).send("Access forbidden for this IP.");
	}

	next();
};

// sync kv and mongo
const syncData = async () => {
	const allRecords = await Model.find();
	const allRecordsById = {};
	for (const record of allRecords) {
		allRecordsById[record.dbId] = record;
	}
	cachedData.allRecords = allRecords;
	cachedData.recordById = allRecordsById;
};


// Cache Setup
let cachedData = {
	allRecords: [],
	recordById: {},
	topXByKDRatio: [],
	topXByStat: {},
};

let DataUpdated = true;

// Function to update the cache
const updateCache = async () => {
	try {
		// Update the cache based on your business logic
		cachedData.allRecords = await Model.find();
		cachedData.topXByKDRatio = await getTopXUsersByKDRatio(10);
		const stats = [
			"deaths",
			"elo",
			"flagsCaptured",
			"gamesPlayed",
			"gamesWon",
			"kills",
			"totalPoints",
		];
		for (const stat of stats) {
			cachedData.topXByStat[stat] = await getTopXUsersByStat(stat, 10);
		}
		// Add more cache updates as needed

		// Set DataUpdated to false after updating the cache
		DataUpdated = false;
	} catch (error) {
		console.error("Error in updateCache:", error);
		throw error;
	}
};

// Middleware to check and update the cache before handling requests
const cacheMiddleware = async (req, res, next) => {
	if (DataUpdated) {
		// If DataUpdated is true, update the cache before handling the request
		await updateCache();
	}
	next();
};

//Post Method
router.post("/post", ipBanningMiddleware, async (req, res) => {
	if (!req.body.isGuest) {
		try {
			var query = { dbId: req.body.dbId };
			savedData = await Model.findOneAndUpdate(query, req.body, {
				new: true,
				upsert: true,
				runValidators: true,
			});
			// res.send("Successfully saved.");
			res.status(200).json(savedData);
			DataUpdated = true;
			console.log("Data Updated");
			syncData();
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	} else {
		res.send("Not Accepting Guests For Now");
	}
});

// Route to get all records with caching
router.get("/getAll", cacheMiddleware, async (req, res) => {
	try {
		res.json(cachedData.allRecords);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Route to get one record by ID with caching
router.get("/getOne/:id", cacheMiddleware, async (req, res) => {
	try {
		const data = cachedData.allRecords.find(
			(record) => record.dbId === req.params.id
		);
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Route to get top X users by KD ratio with caching
router.get("/getTopXByKDRatio/:x", cacheMiddleware, async (req, res) => {
	try {
		const x = Number(req.params.x);
		if (!cachedData.topXByKDRatio) {
			// If the cache is not available, fetch and cache it
			cachedData.topXByKDRatio = await getTopXUsersByKDRatio(x);
		}
		res.json(cachedData.topXByKDRatio.slice(0, x));
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Route to get top X users by a specified stat with caching
router.get("/getTopXByStat/:stat/:x", cacheMiddleware, async (req, res) => {
	try {
		const stat = req.params.stat;
		const x = Number(req.params.x);
		if (!cachedData.topXByStat[stat]) {
			// If the cache for the specified stat is not available, fetch and cache it
			cachedData.topXByStat[stat] = await getTopXUsersByStat(stat, x);
		}
		res.json(cachedData.topXByStat[stat].slice(0, x));
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Route to get top users by a specified stat within a range with caching
router.get(
	"/getTopByStatInRange/:stat/:min/:max",
	cacheMiddleware,
	async (req, res) => {
		try {
			const stat = req.params.stat;
			const minRange = parseFloat(req.params.min);
			const maxRange = parseFloat(req.params.max);

			const topUsers = await getTopUsersByStatInRange(
				stat,
				minRange,
				maxRange
			);
			res.json(topUsers);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
);

// Route to get top users by KD ratio within a range with caching
router.get(
	"/getTopByKDRatioInRange/:min/:max",
	cacheMiddleware,
	async (req, res) => {
		try {
			const minRange = parseFloat(req.params.min);
			const maxRange = parseFloat(req.params.max);

			const topUsers = await getTopUsersByKDRatioInRange(
				minRange,
				maxRange
			);
			res.json(topUsers);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
);

//Delete by ID Method
// router.delete("/delete/:id", async (req, res) => {
// 	try {
// 		const id = req.params.id;
// 		const data = await Model.findByIdAndDelete(id);
// 		res.send(`Document with ${data.name} has been deleted..`);
// 	} catch (error) {
// 		res.status(400).json({ message: error.message });
// 	}
// });

module.exports = router;
