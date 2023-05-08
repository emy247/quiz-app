import React from 'react';
import {useState, useEffect} from 'react';
import './test.css';
import final_message from '../media/final_message.png';
import begin_model from '../media/begin_model.png';
import './selectQuiz.css';


const Test = ({selectedQuiz, shuffledQuestions, quiz}) => {

  const [number, setNumber]=useState(0);
  const [finish,setFinish]=useState(false);
  const [question,setQuestion]=useState([shuffledQuestions[0]]);
  
  const [userAnswer,setUserAnswer]=useState([]);
  const [answers,setAnswers]=useState(Array(selectedQuiz.length).fill(null)); //initializeaza o lista cu null-uri de lungimea numarului de intrebari din test 
                                                                     //in care se vor stoca raspunsurile userului

  const [correctAnswers,setCorrectAnswers]=useState(false); //doar cand e true, userul va putea vizualiza raspunsurile corecte si pe cele gresite
  const [begin, setBegin]=useState(false);  
                                                       //state-ul se schimba la finalul testului 
  let correctList=[];
  let score=0;
  

  useEffect(() => {
    function handleScroll() {
       const scrollPosition = window.scrollY;
       
       if (scrollPosition > 0) { 
          window.scrollY=0;
       }
         else
         window.scrollY=0;
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
       window.removeEventListener('scroll', handleScroll);
    };
 }, []);




  useEffect(() => {  
    setQuestion([shuffledQuestions[number]])
   }, [number, shuffledQuestions]);

  const Start_selected_quiz=()=>{
    return(<>
      <div className="message">This quiz contains multiple choice questions with single correct answers. 
      You have the option to go back to previous questions and review your answers, 
      so take your time and make sure to read each question and its options carefully.
      </div>
      <div className="quiz-description">There is no time limit for this quiz, so don't rush through the questions. 
      Take your time to think about each answer before making your selection. 
      </div>
      <div className='quiz-description'>Good luck and enjoy the quiz!</div>
      
      <button className="button-quiz begin" onClick={()=>(setBegin(true))}>Begin quiz</button>
      <img className="begin-model" alt="" src={begin_model}></img>
      
      </>)
  }

  function handleRefresh() {
    window.location.reload(); // Refresh page
  }

  const handleNewAnswers=(answer)=>{
    setUserAnswer(answer);
    const newAnswers = [...answers];
    newAnswers[number] = answer;
    setAnswers(newAnswers);}


  const handleNext=()=>{
 
    if(number<shuffledQuestions.length-1)
    {
      setNumber(number+1) ; 
    }
    if(number===shuffledQuestions.length-1)
    {
      setFinish(true);     
    }      

  }


  const handleBack=()=>{  

    setNumber(number-1);    
      // acelasi lucru ca la next, doar ca revenim la indexul anterior al listei cu intrebari random
    
  };
  
  
  
  const Next=()=>{
    if(number<selectedQuiz.length-1)
    return(<button className="next" onClick={handleNext}>Next question</button>);
    if(number===selectedQuiz.length-1)
    return(<button className="next" onClick={handleNext}>Submit</button>);
  }
  
  const Back=()=>{
    if(number>0)
    return(<button className="next" onClick={handleBack}>Previous question</button>)
  }
  
  

  //randare intrebari si raspunsuri in timpul testarii
  
  const listQuestion=question.map((item)=>(  //afisare intrebari+raspunsuri, verificare daca in lista shuffled raspunsul pe care se da click e egal cu itemul corect
   
   <div className="question-section" key={item.id}>
        <div className="question">{item.question}</div>
        <div className="answers">
          {item.answers.map((answer,index)=>(
          <div className={`answer ${userAnswer===answer || answers[number]===answer  ?'active':''}`} key={index} onClick={()=>handleNewAnswers(answer)}>
          {answer}     
          </div>
           ))       
       }
       </div>
    </div>)) 
  

  const HandleCorrect=()=>{
     setCorrectAnswers(true);
     
     setFinish(false);
  }

  const HandleCheckList=(answer, answers,itemCorrect)=>{
    
    if(answer===itemCorrect)     //  Daca answer(raspunsul pe care il randam in acel moment) este egal cu raspunsul corect din intrebare=>verde
                                    //===>face toate raspunsurile corecte verzi
    return 'active';

    if(answers.includes(answer) && answers.indexOf(answer)===number)    //daca answers (=array-ul cu toate raspunsurile alese de user) contine answer(raspunsul randat in acel moment)===>rosu indiferent daca este corect sau nu
                                    //daca ar fi fost corect ar fi ramas verde          
    return 'active-red';
    
    }
  
  //randare intrebari si raspunsurile corecte+alese

  const listCorrect=question.map((item)=>(  
    
      <div className="question-section" key={item.id}>
          <div className="question">{item.question}</div>
          <div className="answers">
            {item.answers.map((answer,index)=>(
            <div className={`answer ${HandleCheckList(answer,answers,item.correct)}`} key={index} onClick={()=>handleNewAnswers(answer)}>
            {answer}             
            </div>
            ))       
            }     
        </div>
        
      </div>)) 
  
  
  const FinalMessage=()=>{
    return(
    <div className="final">
      <div className="final-message-score">Congratulations, your final score is {score}/{shuffledQuestions.length}!
        <span className="message">
        Great job on staying committed to your interview preparation! It's important to remember that preparation is key to performing well 
        during an interview. The more you practice and refine your skills and knowledge, 
        the more confident you will feel when it's time for the actual interview.</span>
        {finish===true?<CorrectAnswers/>:''}
        <span className="social">
        
        Share your results
            <a href="#" className="fa fa-facebook"></a>
            <a href="#" className="fa fa-instagram"></a>
            <a href="#" className="fa fa-twitter"></a>
            
        </span> 
      </div>
      <img className="final-image" alt="" src={final_message}></img>
    </div>)

  }
  
  const CorrectAnswers=()=>{
    return(<button className="see-correct" onClick={HandleCorrect}>See correct answers</button>)
  }

     
  for(let i=0;i<shuffledQuestions.length;i++)     // cand testul e ales (correct!=undefined), putem face o noua lista cu raspunsurile corecte 
    {
    correctList.push(shuffledQuestions[i].correct); // In ordinea in care au picat intrebarile, folosindu-ne de array-ul cu cele 10 numere random si iterand prin aceasta
                                                              //extragem .correct, raspunsul corect aferent intrebarii cu numarul picat la randomQuestion
    }
  
  if(finish)
  {
    for(let i=0;i<shuffledQuestions.length;i++)
    {
      if(correctList[i]===answers[i])       // comparam lista cu raspunsurile corecte cu cea cu raspunsurile alese
      score+=1;
    }
  }
  
  console.log('Lista corecte',correctList)
      console.log('user answers', answers)
      console.log('number',number);
   

  return (  
    <div className="test-section"> 
      <div className="header">
       {!finish&&begin?<div className="question-number">Question <span className="number">{number+1}</span>/{shuffledQuestions.length}</div>:'' }

       <button className={`button-quiz home ${number!==0?'in-quiz':''}`} onClick={handleRefresh}>Home</button></div>
       { !begin &&number===0 ? <Start_selected_quiz/>:''}
       
       <div className="next-back">
          { !finish &&begin?<Next/>:''}   
          { !finish &&begin?<Back/>:''}
       </div>

       { !finish&& !correctAnswers &&begin ? listQuestion:''} 
       
       { finish ? <FinalMessage/>:''}  
         
       
       { !finish &&correctAnswers ? listCorrect:''}  

       

       
           
       
    </div>
  )
}

export default Test