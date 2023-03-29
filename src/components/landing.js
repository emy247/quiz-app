import React from 'react';
import Test from './test';
import {useState} from 'react';



const Landing = () => {
  
    const [start,setStart]=useState(false);
  
    
  return (
    <div>
        <button className="start-quiz" onClick={()=>setStart(true)}>Start quiz</button>
        {start&&<Test/>}
   
    </div>
  )
}


export default Landing