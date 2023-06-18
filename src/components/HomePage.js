import React from 'react';
import SelectQuiz from './selectQuiz';
import '../App.css';
import { useState } from 'react';
import quizify from '../media/quizify.png';
import model from '../media/model.png';


const HomePage = ({setStart, setQuiz}) => {

const [select,setSelect]=useState();

return (
<>
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
                    <div className="select-a-quiz" onClick={()=>alert('This feature is not currently available!')}>Create your own</div>
                </div>
                
        </div>
        {
        select==='active'?
        <>
          <SelectQuiz  setStart={setStart} setQuiz={setQuiz} setSelect={setSelect}/> 
          
        </>
        :     
        <img className="model" src={model}></img>
        }     

    </div>
 </>   
    );
  }; 

  export default HomePage