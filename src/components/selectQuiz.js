import React from 'react';
import { useState } from 'react';
import Test from './test';
import html from './html';
import css from './css';
import javascript from './javascript';
import './selectQuiz.css';
import galaxy from '../media/background.jpg';
import html_image from '../media/html_image.png';
import css_image from '../media/css_image.png';
import js_image from '../media/js_image.png';
import model from '../media/model.png';

const Home = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [start, setStart] = useState(false);
  const [select,setSelect]=useState();

  const SelectQuiz = () => {
    return (
      <div className="select-section">

        <div className="left-content">

                <div className="title">Quizify</div>
                <span className="description1">Easy online quiz maker: beautiful quizzes in minutes.
                </span>
                

                <div className="main-buttons">
                    <div className="select-a-quiz" onClick={()=>setSelect('active')}>Select quiz</div>
                    <span>or</span>
                    <div className="select-a-quiz">Create your own</div>
                </div>

                <div className="description2">Our quiz maker provides a simple and intuitive interface 
                    that allows you to quickly create quizzes. 
                    Whether you need to create quizzes for education, training, marketing, 
                    or entertainment, our quiz maker has got you covered.</div>
                </div>
         <div>     
        {select==='active'?
        (<div className="select-quiz-section">
          <div className="card html">
            <img src={html_image}></img>
           
  
            <div class="circle"><div class="checkmark"></div></div><button className="select-button" onClick={() => setSelectedQuiz(html)}>Beginner</button>
            <span class="circle"><div class="checkmark"></div></span><button  className="select-button" onClick={() => setSelectedQuiz(html)}>Intermediate</button>
            <span class="circle"><div class="checkmark"></div></span><button  className="select-button" onClick={() => setSelectedQuiz(html)}>Advanced</button>
          </div>

          <div className="card css">
            <img src={css_image}></img>
            <button className="select-button" onClick={() => setSelectedQuiz(css)}>Beginner</button>
            <button className="select-button" onClick={() => setSelectedQuiz(css)}>Intermediate</button>
            <button className="select-button" onClick={() => setSelectedQuiz(css)}>Advanced</button>
          </div>

          <div className="card javascript">
            <img src={js_image}></img>
            <button className="select-button" onClick={() => setSelectedQuiz(javascript)}>Beginner</button>
            <button className="select-button" onClick={() => setSelectedQuiz(javascript)}>Intermediate</button>
            <button className="select-button" onClick={() => setSelectedQuiz(javascript)}>Advanced</button>
          </div>
        </div>)
        :
        (<img className="model" src={model}></img>)}
        </div> 
        {selectedQuiz ? (
          <button className="start-quiz" onClick={() => setStart(true)}>
            Start quiz
          </button>
        ) : (
          ''
        )}
         
      </div>
    );
  };

  return (
    <div className="selectQuiz">
      
      {start ? <Test selectedQuiz={selectedQuiz} /> : <SelectQuiz />}
    </div>
  );
};

export default Home;
