import openDatabase from "./openDatabase"; // Correct the import statement

async function markAsCompleted(taskID) {
    // taskID = 4 ; 
    const databaseName = "TaskDatabase";
    const objectStoreName = "TaskTable";
    
    return new Promise((resolve, reject) => {
        // Open a connection to the IndexedDB database
        openDatabase(databaseName, objectStoreName)
        .then(db => {
            // Start a transaction with 'readwrite' mode
            const transaction = db.transaction(objectStoreName, 'readwrite');
            const objectStore = transaction.objectStore(objectStoreName);

            // Retrieve the message you want to update from the object store
            const getRequest = objectStore.get(taskID);

            getRequest.onsuccess = function(event) {
                const existingData = event.target.result;
                console.log(" the exising dtat a" , existingData )

                if (existingData) {
                    // Toggle the completed status
                    // const newObj = {..}
                    // existingData.completed = !existingData.completed;
                    const newObj = {...existingData} ; 
                    newObj.taskCompleted = !newObj.taskCompleted ; 

                    // Store the updated message back into the object store
                    const updateRequest = objectStore.put(newObj);

                    updateRequest.onsuccess = function(event) {
                        resolve('Message updated successfully');
                    };

                    updateRequest.onerror = function(event) {
                        reject(new Error('Error updating message: ' + event.target.error));
                    };
                } else {
                    reject(new Error('Message not found'));
                }
            };

            getRequest.onerror = function(event) {
                reject(new Error('Error retrieving message: ' + event.target.error));
            };

            // Close the database connection
            transaction.oncomplete = function() {
                db.close();
            };
        })
        .catch(error => {
            reject(new Error('Error opening database: ' + error));
        });
    });
}

export default markAsCompleted;
