const getTopXUsersByKDRatio = async (x) => {
	try {
		const topXUsers = await Model.aggregate([
			{
				$addFields: {
					kdRatio: {
						$cond: {
							if: { $gt: ["$stats.deaths", 0] },
							then: {
								$divide: ["$stats.kills", "$stats.deaths"],
							},
							else: "$stats.kills",
						},
					},
				},
			},
			{ $sort: { kdRatio: -1 } },
			{ $limit: x },
		]);

		return topXUsers;
	} catch (error) {
		console.error("Error in getTopXUsersByKDRatio:", error);
		throw error;
	}
};

const getTopXUsersByStat = async (stat, x) => {
	try {
		const topXUsers = await Model.aggregate([
			{ $sort: { [`stats.${stat}`]: -1 } },
			{ $limit: x },
		]);

		return topXUsers;
	} catch (error) {
		console.error("Error in getTopXUsersByStat:", error);
		throw error;
	}
};

const getTopUsersByKDRatioInRange = async (start, end) => {
	try {
		const topUsers = await Model.aggregate([
			{
				$addFields: {
					kdRatio: {
						$cond: {
							if: { $gt: ["$stats.deaths", 0] },
							then: {
								$divide: ["$stats.kills", "$stats.deaths"],
							},
							else: "$stats.kills",
						},
					},
				},
			},
			{ $sort: { kdRatio: -1 } },
		]);

		const slicedTopUsers = topUsers.slice(start, end);

		return slicedTopUsers;
	} catch (error) {
		console.error("Error in getTopUsersByKDRatioInRange:", error);
		throw error;
	}
};

const getTopUsersByStatInRange = async (stat, start, end) => {
	try {
		const topUsers = await Model.aggregate([
			{ $sort: { [`stats.${stat}`]: -1 } },
		]);

		const slicedTopUsers = topUsers.slice(start, end);

		return slicedTopUsers;
	} catch (error) {
		console.error("Error in getTopUsersByStatInRange:", error);
		throw error;
	}
};

module.exports = {
	getTopXUsersByKDRatio,
	getTopXUsersByStat,
	getTopUsersByKDRatioInRange,
	getTopUsersByStatInRange,
};
