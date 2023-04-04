import React from 'react';
import {useState ,useEffect} from 'react';
import html from './html';
import css from './css';
import javascript from './javascript';
import './test.css';
import final_message from '../media/final_message.png';
import begin_model from '../media/begin_model.png';


const Test = ({selectedQuiz}) => {

  const [number, setNumber]=useState(0);
  const [finish,setFinish]=useState(false);
  const [question,setQuestion]=useState([]);
  const [randomQuestion, setRandomQuestion] = useState([]);
  const [stack, setStack]=useState([]);
  const [userAnswer,setUserAnswer]=useState([]);
  const [answers,setAnswers]=useState(Array(4).fill(null));
  const [picked, setPicked]=useState();
  const [correctAnswers,setCorrectAnswers]=useState(false);

  let checkList=0;
  let score=0;

  function getShuffledNumbers(count) {
    const result = Array.from(Array(count).keys()); // create an array of sequential numbers from 0 to count-1
    for (let i = result.length - 1; i > 0; i--) { // shuffle the array using Fisher-Yates algorithm
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  
  useEffect(() => {                        // pentru a evita randarea a mai multor liste de numere random, se va opri dupa prima randare
    const random = getShuffledNumbers(4);  
    setRandomQuestion(random);
  }, []);

  function handleRefresh() {
    window.location.reload(); // Refresh the page when the button is clicked
  }

  const handleNewAnswers=(answer)=>{
    setUserAnswer(answer);
    const newAnswers = [...answers];
    newAnswers[number-1] = answer;
    setAnswers(newAnswers);}
    
  console.log(randomQuestion) //  

  const Test_pick=(questions,question_number)=>{        //questions = testul ales; questions_number = care intrebare e aleasa din test
  
        const shuffledQuestions = questions.map(q => {     
        const shuffledAnswers = [...q.answers].sort(() => Math.random() - 0.5); // amesteca raspunsurile
        return {...q, answers:shuffledAnswers};                                 // pune impreuna intrebarea respectiva cu raspunsurile amestecate 
                                                                                //valabil pentru oricare intrebare din test
      });   
                                                                              
      setFinish(false);
      setQuestion([shuffledQuestions[question_number]]);            //alege o intrebare random din cele amestecate 
      setStack([...stack,question]);  
                                 //question_number il luam mai tarziu din lista cu numere random generate mai sus      
  }
    
  

  const Start_selected_quiz=()=>{
    return(<>
      <div className="message">Testing knowledge: A quiz can help test a person's knowledge of HTML, 
      including its syntax, tags, and attributes.
       It can help determine areas where one needs improvement and areas where one is proficient.</div>
      <div className="quiz-description">For the upcoming test, you will be presented with ten general questions, each with only one correct answer. Good luck!</div>
      <button className="button-quiz begin" onClick={()=>( Test_pick(selectedQuiz,randomQuestion[number]),
      setNumber(number+1),
      setPicked(selectedQuiz))}>Begin quiz</button>
      <img className="begin-model" src={begin_model}></img>
      
      </>)
   
  }


  console.log('picked',picked)
  console.log('selectedQuiz',selectedQuiz)

  const handleNext=()=>{
    
    setNumber(number+1) ;      
    if(number<4)
    {Test_pick(selectedQuiz,randomQuestion[number]);  //alegem practic din nou testul si numarul random generat, dar acum de pe indexul urmator al listei cu numere random              
    console.log(number);                          //(tinem evidenta indexului cu ajutorul state-ului numberului initial la inceput)    
    setStack([...stack,question]);}
    

    if(number>=4)
    {
      setStack([...stack,question]);
      setFinish(true);
    }
                        
  }
  
  const handleBack=()=>{   
     // acelasi lucru ca la next, doar ca revenim la indexul anterior al listei cu numere random
     
     setQuestion(stack[number-1]);  
     setNumber(number-1); 
     
  };
  
  
  
  const Next=()=>{
    if(number<4)
    return(<button className="next" onClick={handleNext}>Next question</button>);
    if(number===4)
    return(<button className="next" onClick={handleNext}>Finish quiz</button>);
  }
  
  const Back=()=>{
    if(number>1)
    return(<button className="back" onClick={handleBack}>Prev question</button>)
  }
  

  
  const listQuestion=question.map((item)=>(  //afisare intrebari+raspunsuri, verificare daca in lista shuffled raspunsul pe care se da click e egal cu itemul corect
    <div className="question-section" key={item.id}>

        <div className="question">{item.question}</div>
        <div className="answers">
          {item.answers.map((answer,index)=>(
          <div className={`answer ${userAnswer===answer || answers.includes(answer)? 'active' : ''}`} key={index} onClick={()=>handleNewAnswers(answer)}>
          {answer}
          </div>
           ))       
       }
       </div>
    </div>)) 
  
  const HandleCorrect=()=>{
     setCorrectAnswers(true);
     setQuestion(stack[number-1]);  
     setNumber(number-1); 
     setFinish(false);
  }

  const HandleCheckList=(userAnswer,answer,answers,itemCorrect)=>{

    
    if((userAnswer===answer || answers.includes(answer))&&userAnswer!==itemCorrect)
      return 'active-red';
    if((userAnswer===answer || answers.includes(answer))&&userAnswer===itemCorrect)
      return 'active';
    if(answer===itemCorrect)
      return 'active';
    }
  

  const listCorrect=question.map((item)=>(  
      <div className="question-section" key={item.id}>

          <div className="question">{item.question}</div>
          <div className="answers">
            {item.answers.map((answer,index)=>(
            <div className={`answer ${HandleCheckList(userAnswer,answer,answers,item.correct)}`} key={index} onClick={()=>handleNewAnswers(answer)}>
            {answer}
            </div>
            ))       
        }
        </div>
      </div>)) 




  if(picked!==undefined)
  {checkList=picked.map((item)=>{   // verifica cate din lista cu raspunsurile corecte alese sunt si in lista cu intrebarile 
    
    console.log('correct:',item.correct);
    for(let i=0;i<=answers.length-1;i++)
      {
        if(item.correct===answers[i])
        score+=1;
      }    
      
  })}
 
  
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
        <i className="fa fa-share-alt"></i>
        Share your results
            <a href="#" className="fa fa-facebook"></a>
            <a href="#" className="fa fa-instagram"></a>
            <a href="#" className="fa fa-twitter"></a>
            
        </span> 
      </div>
      <img className="final-image" src={final_message}></img>
    </div>)

  }
  
  
  const CorrectAnswers=()=>{
    return(<button className="see-correct" onClick={HandleCorrect}>See correct answers</button>)
  }
  console.log(correctAnswers);
  console.log('answers',answers);
 
  

  return (  
    <div className="test-section"> 
      <div className="header">
       {finish===false&&number!==0?<div className="question-number">Question <span className="number">{number}</span>/10</div>:'' }
       <button className={`button-quiz home ${number!==0?'in-quiz':''}`} onClick={handleRefresh}>Home</button></div>
       {number===0?<Start_selected_quiz/>:''}
       {finish===false&&correctAnswers===false?listQuestion:''} 

       <div className="next-back">
          {finish===false&&number!==0?<Next/>:''}   
          {finish===false?<Back/>:''}
       </div>

       {finish===true?<FinalMessage/>:''}    
       
       {finish===false&&correctAnswers===true?listCorrect:''}      
       
       
    </div>
  )
}

export default Test