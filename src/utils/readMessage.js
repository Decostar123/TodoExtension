async function readMessage() {
    const databaseName = "TaskDatabase";
    const objectStoreName = "TaskTable";

    return new Promise((resolve, reject) => {
        const request = indexedDB.open(databaseName);

        request.onerror = function(event) {
            reject(new Error('Error opening database: ' + event.target.error));
        };

        request.onsuccess = function(event) {
            const database = event.target.result;
            const transaction = database.transaction(objectStoreName, 'readonly');
            const objectStore = transaction.objectStore(objectStoreName);
            const data = [];

            const cursorRequest = objectStore.openCursor();

            cursorRequest.onsuccess = function(event) {
                const cursor = event.target.result;

                if (cursor) {
                    data.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(data);
                }
            };

            cursorRequest.onerror = function(event) {
                reject(new Error('Error opening cursor: ' + event.target.error));
            };
        };

        request.onupgradeneeded = function(event) {
            // This is called if the database needs to be upgraded, e.g., to create the object store.
            const database = event.target.result;
            if (!database.objectStoreNames.contains(objectStoreName)) {
                database.createObjectStore(objectStoreName);
            }
        };
    });
}

export default readMessage;
