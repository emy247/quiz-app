import React from 'react';
import {useState} from 'react';
import html from './html';
import css from './css';
import javascript from './javascript';


const Test = (props) => {

  const [number, setNumber]=useState(1);
  const [score,setScore]=useState(0);
  const [finish,setFinish]=useState(false);
  const [question,setQuestion]=useState([]);
  const [test,setTest]=useState('');


  const test_pick=(questions)=>{
   setQuestion([questions[Math.floor(Math.random()*3)]])
   setNumber(1);
   setScore(0);
   setFinish(false);
  }
   

  const Pick_test=()=>{
    return(<>
            <button onClick={()=>(test_pick(javascript),setTest('javascript'))}>Javascript</button>
            <button onClick={()=>(test_pick(html),setTest('html'))}>html</button>
            <button onClick={()=>(test_pick(css),setTest('css'))}>css</button>
           </>)
  }

  const handleNext=()=>{
    if(test==='javascript')
    setQuestion([javascript[Math.floor(Math.random()*3)]])

    if(test==='html')
    setQuestion([html[Math.floor(Math.random()*3)]])

    if(test==='css')
    setQuestion([css[Math.floor(Math.random()*3)]])

    setNumber(number+1);
  }
  

  const Finish=()=>{
    if(number===3)
    return(<button onClick={()=>setFinish(true)}>finish</button>);
  }

  const Score=()=>{
    if(finish)
    return(<span>Your final score is: {score} </span>)
  }

  const Next=()=>{
    if(number<3)
    return(<button className="next" onClick={handleNext}>Next question</button>);
  }
  

  const listQuestion=question.map((item)=>(
    <div className="question-section" key={item.id}>
        <div className="question">{item.question}</div>
        <div className="answer" onClick={()=>setScore(score)}>{item.wrong1} </div>
        <div className="answer" onClick={()=>setScore(score)}>{item.wrong2} </div>
        <div className="answer" onClick={()=>setScore(score+1)}>{item.correct} </div>
        <div className="answer" onClick={()=>setScore(score)}>{item.wrong3} </div>
    </div>
  ))

  return (
    
    <>
       <div><Pick_test/></div>
            {listQuestion}
       <div><Next/></div>
       <span>{score}/{number}</span>
       <div><Finish/></div>
       <div><Score/></div>
       
    </>
  )
}

export default Test