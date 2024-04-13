async function deleteMessage(deleteID) {
    // alert(deleteID)
    try {
      // Open a connection to the IndexedDB database
      const db = await new Promise((resolve, reject) => {
        const request = indexedDB.open('TaskDatabase', 1);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
  
      // Access the object store where the file is stored
      const transaction = db.transaction(['TaskTable'], 'readwrite');
      const objectStore = transaction.objectStore('TaskTable');
  
      // Use the delete method to remove the file from the object store
      await new Promise((resolve, reject) => {
        const deleteRequest = objectStore.delete(deleteID);
        deleteRequest.onsuccess = () => resolve();
        deleteRequest.onerror = () => reject(deleteRequest.error);

      });
  
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }

  export default deleteMessage; 