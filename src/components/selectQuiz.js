import React from 'react';
import { useState, useEffect } from 'react';
import QuizData from './quizData';
import './selectQuiz.css';
import quizify from '../media/quizify.png';
import model from '../media/model.png';


const Home = () => {
  
  const [quiz, setQuiz] = useState(null);
  const [start, setStart] = useState(false);
  const [select,setSelect]=useState();


  let selectQuizButtons = [
    { id: '1', label: 'JavaScript', quiz:'html', status:'Uncompleted'},
    { id: '2', label: 'HTML', quiz:'css', status:'Uncompleted'},
    { id: '3', label: 'CSS' , quiz:'javascript', status:'Uncompleted'},
    { id: '4', label: 'React' , quiz:'react', status:'Uncompleted'},
    { id: '5', label: 'Node.js' , quiz:'node', status:'Uncompleted'},
    { id: '6', label: 'Data structures' , quiz:'data', status:'Uncompleted'},
    { id: '7', label: 'Algorithms' , quiz:'algorithms', status:'Uncompleted'},
  ];

  const savedState = localStorage.getItem('selectQuizButtons');

  if (savedState) {
  selectQuizButtons = JSON.parse(savedState);
}
  const handleComplete=(id)=>{
    selectQuizButtons[id-1].status = 'Completed';
    localStorage.setItem('selectQuizButtons', JSON.stringify(selectQuizButtons));
    console.log( selectQuizButtons[id-1].status);
  }
   
  const SelectQuiz = () => {
    return (

    <div className="select-section">

        <div className="blob-background"/>

        <div className="left-content"> 
      
                <img src={quizify} className="title"></img>
                <span className="description1">Easy online quiz maker: beautiful quizzes in minutes.
                </span>
                
                <div className="description2">Our quiz maker provides a simple and intuitive interface 
                    that allows you to quickly create quizzes. 
                    Whether you need to create quizzes for education, training, marketing, 
                    or entertainment, our quiz maker has got you covered.        
                </div>
                <div className="description3">
                    You can also enhance your knowledge with our engaging quizzes, spanning a broad range of subjects.     
                </div>

                <div className="main-buttons">
                    <div className="select-a-quiz" onClick={()=>setSelect('active')}>Select quiz</div>
                    <span>or</span>
                    <div className="select-a-quiz">Create your own</div>
                </div>
        </div>
        

           
        {select==='active'?
        
        (<div className='right-content'>
          
           <div className="select-quiz-section">
          
              {selectQuizButtons.map(button => (
                
                 <div className="quiz-button-status" key={button.id}>
                  <button
                    key={button.id}
                    className={`select-quiz-button`}>
                  
                      {button.label}
                      <div  
                        className={`quiz-status ${button.status==='Uncompleted'?'uncompleted':'completed'}`} 
                        onClick={() => (setQuiz(button.quiz),setStart(true), handleComplete(button.id))}>                                         
                      {button.status}             
                     </div>                   
                  </button>
                </div>
              
              ))}
         
           </div>
           
         <div className="select-a-quiz back" onClick={()=>(setSelect(''))}>Back</div>
        
        </div>)  :   
        
        (<img className="model" src={model}></img>)}
            
    </div>
 
    );
  }; 
 
  console.log('quiz:', quiz)
  
  return (
    <>

    <div>
    {start ? <QuizData quiz={quiz} /> : <SelectQuiz/>} 
    </div>

    </>
  );
};

export default Home;
