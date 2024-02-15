const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
	username: {
		type: "string",
	},
	isGuest: {
		type: "boolean",
	},
	stats: {
		type: "object",
		properties: {
			deaths: {
				type: "integer",
			},
			elo: {
				type: "number",
			},
			flagsCaptured: {
				type: "integer",
			},
			gamesPlayed: {
				type: "integer",
			},
			gamesWon: {
				type: "integer",
			},
			kills: {
				type: "integer",
			},
			totalPoints: {
				type: "integer",
			},
		},
		required: [
			"deaths",
			"elo",
			"flagsCaptured",
			"gamesPlayed",
			"gamesWon",
			"kills",
			"totalPoints",
		],
	},
	dbId: {
		type: "string",
		required: true
	},
	usernameData: {
		type: "object",
		properties: {
			username: {
				type: "string",
			},
			verified: {
				type: "boolean",
			},
		},
		required: ["username", "verified"],
	},
},{ timestamps: true,strict: false });

module.exports = mongoose.model("test", dataSchema);
