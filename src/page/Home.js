// import React from 'react'
import "../styles/Home.css"
import {useState, useEffect} from "react" ; 
import natureImage from ".././assets/nature.jpg" ; 
import TaskList from '../components/TaskList';

const Home = () => {
    const [ backgroundImage , setBackgroundImage ] = useState("") ; 
   
    
    useEffect(()=>{

        function getURL(){
          fetch("https://peapix.com/bing/feed").
          then( data => data.json())
          .then( (arr)=>{
            console.log( arr  ) ; 
            const len = arr.length ; 
            const ind = Math.floor(Math.random() * len);
            // alert( ind)
            const url = arr[ind].fullUrl ; 
            if( url){
              setBackgroundImage( url)
            }
          }).catch( err =>{
            setBackgroundImage(natureImage)
          })
        }

        getURL( ) ; 
    }
   , [ ]) ; 

   
    

  return (
    <div id="container" style={ { backgroundImage:`url(${backgroundImage})`} }>
    <TaskList  />
       

    </div>
  )
}

export default Home