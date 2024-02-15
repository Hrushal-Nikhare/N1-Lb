let hasRun = false;
let debug = false;

function debugLog(...args) {
	if (debug) console.log("[getData.js]", ...args);
}

async function getData() {
	// Open the IndexedDB database
	await new Promise((r) => setTimeout(r, 2000));
	var request = indexedDB.open("keyValuesDb");

	request.onerror = function (event) {
		console.error("Failed to open the database:", event.target.errorCode);
	};

	request.onsuccess = function (event) {
		var db = event.target.result;

		var transaction = db.transaction(["keyValues"], "readwrite");

		var objectStore = transaction.objectStore("keyValues");

		// Get the value by key ("cachedProfileState")
		var request = objectStore.get("cachedProfileState");

		request.onsuccess = function (event) {
			// Access the data
			var cachedProfileState = event.target.result;

			// Do something with cachedProfileState
			debugLog("Cached Profile State:",cachedProfileState)
			// debugLog("Json Format for api test :) :", JSON.stringify(cachedProfileState))

			// The URL where you want to send the POST request
			const apiUrl = "https://n1-api.vercel.app/api/post";

			debugLog(`Sending POST request to: ${apiUrl}`);

			// send the POST request
			fetch(apiUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(cachedProfileState),
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					// console.log({ success: true });
					debugLog("POST request was successful");
				})
				.catch((error) => {
					// console.error("Error:", error.message);
					debugLog("POST request failed");
					console.log(
						debug ? { success: false, error: error.message } : ""
					);
				});
		};

		request.onerror = function (event) {
			console.error("Error retrieving data:", event.target.errorCode);
		};
	};
}

document.addEventListener("DOMContentLoaded", (event) => {
	getData();
});
