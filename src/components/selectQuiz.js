import React from 'react'
import selectButtons from './selectButtons';
import '../App.css';

const SelectQuiz = ( {setStart, setQuiz, setSelect}) => {

let selectQuizButtons=selectButtons;
const savedState = localStorage.getItem('selectUpdatedButtons');
  
if (savedState) {
  selectQuizButtons = JSON.parse(savedState);
  }

return (
 <div className='right-content'>      
          <div className="select-quiz-section">
              {selectQuizButtons.map(button => ( 
                 <div className="quiz-button-status" key={button.id}>
                  <button
                    key={button.id}
                    className={`select-quiz-button`}>               
                      {button.label}                  
                        <div  
                          className={`quiz-status ${button.status==='Uncompleted'?'uncompleted':'completed'}`} 
                          onClick={() => (setQuiz(button.quiz),setStart(true))}>                                         
                          {button.status}             
                        </div>                                  
                  </button>
                  
                </div>      
              ))}   
          </div>  
          <div className="select-a-quiz back" onClick={()=>(setSelect(''))}>Back</div>       
    </div>)
 
}

export default SelectQuiz