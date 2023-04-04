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
  const [activeButton, setActiveButton] = useState(null);

  function handleClick(buttonId) {
    setActiveButton(buttonId);
  }

  const buttonsHtml = [
    { id: '1', label: 'Beginner', quiz:html},
    { id: '2', label: 'Intermediate', quiz:html},
    { id: '3', label: 'Advanced' , quiz:html},
  ];

  const buttonsCss = [
    { id: '4', label: 'Beginner' , quiz:css},
    { id: '5', label: 'Intermediate' , quiz:css},
    { id: '6', label: 'Advanced' , quiz:css},
  ];

  const buttonsJs = [
    { id: '7', label: 'Beginner' , quiz:javascript},
    { id: '8', label: 'Intermediate' , quiz:javascript},
    { id: '9', label: 'Advanced', quiz:javascript },
  ];

  

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

            {buttonsHtml.map(button => (
              <button
                key={button.id}
                className={`select-button ${button.id === activeButton ? 'active' : ''}`}
                onClick={() => (handleClick(button.id), setSelectedQuiz(button.quiz))}
              >
                {button.label}
        </button>
      ))}
          </div>

          <div className="card css">
            <img src={css_image}></img>
            {buttonsCss.map(button => (
              <button
                key={button.id}
                className={`select-button ${button.id === activeButton ? 'active' : ''}`}
                onClick={() => (handleClick(button.id), setSelectedQuiz(button.quiz))}
              >
                {button.label}
        </button>
      ))}
          </div>

          <div className="card javascript">
            <img src={js_image}></img>
            {buttonsJs.map(button => (
              <button
                key={button.id}
                className={`select-button ${button.id === activeButton ? 'active' : ''}`}
                onClick={() => (handleClick(button.id), setSelectedQuiz(button.quiz))}
              >
                {button.label}
        </button>
      ))}
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
