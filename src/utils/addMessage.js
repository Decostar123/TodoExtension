import openDatabase from "./openDatabase" ; 
async function addMessage(  taskData) {
    try {
      // Open or create the database
      const db = await openDatabase('TaskDatabase', "TaskTable");
  
      // Start a transaction
      const transaction = db.transaction(['TaskTable'], 'readwrite');
      const objectStore = transaction.objectStore('TaskTable');
  
      // Prepare the data to be saved
      const newData = { id: 1, name: 'John Doe', email: 'john@example.com' };
  
      // Save the data
      await addObject(objectStore, taskData);

        
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }
  
  // Function to open or create the database
 
  
  // Function to add an object to the object store
  function addObject(objectStore, data) {
    // alert( "taskData")
    return new Promise((resolve, reject) => {
      const request = objectStore.add(data);
      request.onsuccess = () => resolve();
      request.onerror = () => reject('Failed to save data');
    });
  }
  
  
  export default addMessage ; 