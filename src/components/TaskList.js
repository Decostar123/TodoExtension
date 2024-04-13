import React , {useEffect , useState } from 'react'
import ".././styles/TaskList.css"
import { BadgeX } from 'lucide-react';
import markAsCompleted from '../utils/markAsCompleted';
import addMessage from "../utils/addMessage"
import readMessage from "../utils/readMessage"
import deleteMessage from "../utils/deleteMessage"
import openDatabase from '../utils/openDatabase';

const TaskList = () => {

    useEffect(()=>{


        async function fun(){
            await openDatabase("TaskDatabase" , "TaskTable") ; 
            await getTask() ;
        }
        fun() ; 
        
       
        
       

    } , [] )

   
    const [ taskArray , setTaskArray] = useState([])  ;
    const [ currentTask , setCurrentTask] = useState("") ; 


    async function addTask(e){
        if( e.key === 'Enter'){
            // alert(currentTask) ; 
            let timeStamp = Date.now() ; 
         
            let taskObj = { task:currentTask ,  taskID:timeStamp , taskCompleted:false }  ; 
            const res = await addMessage(taskObj) ;
            setCurrentTask("")
            getTask() ; 

        }
       }

       async function toggleTask(id){
        // alert("hi")
        // alert(id) ; 
        await markAsCompleted(id) ;
        getTask() ;   
        
       }
       async function getTask(){
        const res = await readMessage() ; 
        setTaskArray( ()=> res ) ; 
       }

       async function removeTask( uniqueID, taskID ){
       
        try{
            const res = await deleteMessage( taskID  ) ; 
            getTask() ; 

        }catch(e){
            alert("Some error ocured try again later ")
        }
      
       }

  return (
    <div id="todoDiv">
    <input id="taskName" value={currentTask} onChange={(e)=> setCurrentTask( e.target.value)} placeholder='Enter your task ' onKeyDown={addTask}/>
    <div id="taskList">
        {
                taskArray.map( ele =>  {
                    return <div key={ele.taskIDid} className="individualTask" >
                  
                        <input  checked={ele.taskCompleted} type="checkbox" onClick={ ()=> toggleTask(ele.id)}/>
                        <p style={{ "textDecoration" : ele.taskCompleted ? "line-through" :""} }>{ele.task}</p> 
                        <BadgeX height="15px" width="20px" onClick={()=>removeTask(ele.taskID , ele.id )} />
                        </div>
                })
        }
       

    </div>
</div>
  )
}

export default TaskList