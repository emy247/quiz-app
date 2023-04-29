import React from 'react';
import {useState} from 'react';
import './test.css';
import final_message from '../media/final_message.png';
import begin_model from '../media/begin_model.png';
import './selectQuiz.css';


const Test = ({selectedQuiz, randomQuestion, quiz}) => {

  const [number, setNumber]=useState(0);
  const [finish,setFinish]=useState(false);
  const [question,setQuestion]=useState([]);
  
  const [stack, setStack]=useState([]);
  const [userAnswer,setUserAnswer]=useState([]);
  const [answers,setAnswers]=useState(Array(selectedQuiz.length).fill(null)); //initializeaza o lista cu null-uri de lungimea numarului de intrebari din test 
                                                                              //in care se vor stoca raspunsurile userului
  
  const [picked, setPicked]=useState();
  const [correctAnswers,setCorrectAnswers]=useState(false); //doar cand e true, userul va putea vizualiza raspunsurile corecte si pe cele gresite
                                                         //state-ul se schimba la finalul testului 
  let correctList=[];
  let score=0;
  
  

  function handleRefresh() {
    window.location.reload(); // Refresh page
  }

  const handleNewAnswers=(answer)=>{
    setUserAnswer(answer);
    const newAnswers = [...answers];
    newAnswers[number-1] = answer;
    setAnswers(newAnswers);}
  

  const Test_pick=(questions,question_number)=>{        //questions = testul ales; questions_number = care intrebare e aleasa din test
  
      const shuffledQuestions = questions.map(q => {     
        const shuffledAnswers = [...q.answers].sort(() => Math.random() - 0.5); // amesteca raspunsurile
        return {...q, answers:shuffledAnswers};                                 // pune impreuna intrebarea respectiva cu raspunsurile amestecate 
                                                                                //valabil pentru oricare intrebare din test
      });   
                                                                              
      setFinish(false);
      setQuestion([questions[question_number]]);           //alege o intrebare random din cele amestecate 
      setStack([...stack,question]);  
                                 //question_number il luam mai tarziu din lista cu numere random generate mai sus      
  }
    
  

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
      
      <button className="button-quiz begin" onClick={()=>( Test_pick(selectedQuiz,randomQuestion[number]),
      setNumber(number+1),
      setPicked(selectedQuiz))}>Begin quiz</button>
      <img className="begin-model" alt="" src={begin_model}></img>
      
      </>)
   
  }
  console.log(quiz)


  const handleNext=()=>{
    
    setNumber(number+1) ; 
    
    if(number<selectedQuiz.length)
    {
      Test_pick(selectedQuiz,randomQuestion[number]);  //aceeasi logica ca atunci cand pornim testul si numarul random generat, dar acum de pe indexul urmator al listei cu numere random
      
      if(correctAnswers===false)                    //(tinem evidenta indexului cu ajutorul state-ului numberului initial la inceput)    
      setStack([...stack,question]);
    }
      

    if(number>=selectedQuiz.length)
    {
      setStack([...stack,question]);
      setFinish(true);     
    }
   
    
                        
  }
  
  const handleBack=()=>{   
     // acelasi lucru ca la next, doar ca revenim la indexul anterior al listei cu numere random
     setNumber(number-1);  
     setQuestion(stack[number-1]);    
     
     
  };
  
  
  
  const Next=()=>{
    if(number<selectedQuiz.length)
    return(<button className="next" onClick={handleNext}>Next question</button>);
    if(number===selectedQuiz.length)
    return(<button className="next" onClick={handleNext}>Submit</button>);
  }
  
  const Back=()=>{
    if(number>1)
    return(<button className="next" onClick={handleBack}>Previous question</button>)
  }
  
  

  //randare intrebari si raspunsuri in timpul testarii
  const listQuestion=question.map((item)=>(  //afisare intrebari+raspunsuri, verificare daca in lista shuffled raspunsul pe care se da click e egal cu itemul corect
   
   <div className="question-section" key={item.id}>
        <div className="question">{item.question}</div>
        <div className="answers">
          {item.answers.map((answer,index)=>(
          <div className={`answer ${userAnswer===answer && answers[number-1]===answer ?'active':''}`} key={index} onClick={()=>handleNewAnswers(answer)}>
          {answer}     
          </div>
           ))       
       }
       </div>
    </div>)) 
    
   

  const HandleCorrect=()=>{
     setCorrectAnswers(true);
     setNumber(number-1); 
     setQuestion(stack[number-1]);  
     setFinish(false);
  }

  const HandleCheckList=(answer, answers,itemCorrect)=>{
    
    if(answer===itemCorrect)     //  Daca answer(raspunsul pe care il randam in acel moment) este egal cu raspunsul corect din intrebare=>verde
                                    //===>face toate raspunsurile corecte verzi
    return 'active';

    if(answers.includes(answer) && answers.indexOf(answer)===number-1)    //daca answers (=array-ul cu toate raspunsurile alese de user) contine answer(raspunsul randat in acel moment)===>rosu indiferent daca este corect sau nu
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
      <div className="final-message-score">Congratulations, your final score is {score}/{number-1}!
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

  if(picked!==undefined)    
  {for(let i=0;i<selectedQuiz.length;i++)     // cand testul e ales (correct!=undefined), putem face o noua lista cu raspunsurile corecte 
    {
    correctList.push(selectedQuiz[randomQuestion[i]].correct); // In ordinea in care au picat intrebarile, folosindu-ne de array-ul cu cele 10 numere random si iterand prin aceasta
                                                              //extragem .correct, raspunsul corect aferent intrebarii cu numarul picat la randomQuestion
    }
  }
  if(finish)
  {
    for(let i=0;i<selectedQuiz.length;i++)
    {
      if(correctList[i]===answers[i])       // comparam lista cu raspunsurile corecte cu cea cu raspunsurile alese
      score+=1;
    }
  }
  
   console.log('corecte',correctList)
   console.log('answers list:', answers);
   console.log('scor:',score)
   
  

  return (  
    <div className="test-section"> 
      <div className="header">
       {finish===false&&number!==0?<div className="question-number">Question <span className="number">{number}</span>/10</div>:'' }
       <button className={`button-quiz home ${number!==0?'in-quiz':''}`} onClick={handleRefresh}>Home</button></div>
       {number===0?<Start_selected_quiz/>:''}
       
       
       <div className="next-back">
          {finish===false&&number!==0?<Next/>:''}   
          {finish===false?<Back/>:''}
       </div>

       {finish===false&&correctAnswers===false?listQuestion:''} 
       {finish===true?<FinalMessage/>:''}  
         
       
       {finish===false&&correctAnswers===true?listCorrect:''}      
       
    </div>
  )
}

export default Test