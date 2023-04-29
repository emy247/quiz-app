import {useState, useEffect} from 'react';
import Test from './test';

const QuizData = ({quiz}) => {

    const [selectedQuiz, setSelectedQuiz] = useState([]);
    const [randomQuestion, setRandomQuestion] = useState([]);

    
  useEffect(()=>{
    fetch(`http://localhost:5000/${quiz}`)
    .then(response=>response.json())
    .then(data=>setSelectedQuiz(data))
  }, [])
   
/////////////////////////////////////////////
  function getShuffledNumbers(count) {
    const result = Array.from(Array(count).keys()); // create an array of sequential numbers from 0 to count-1
    for (let i = result.length - 1; i > 0; i--) { // amesteca array-ul cu algoritmul fisher yates
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  useEffect(() => {                        // pentru a evita randarea a mai multor liste de numere random, se va opri dupa prima randare
   const random = getShuffledNumbers(selectedQuiz.length);  
   setRandomQuestion(random);
  }, [selectedQuiz.length]); //prima data avem selectedQuiz.length=0 pentru ca nu se incarca inca intrebarile, deci reapelam aici

// ===>Toata partea asta va genera un array de numere random care nu se repeta, de lungimea numarului de intrebari din baza de date,
//     acest array va fi trimis mai departe in test.js pentru a se incepe randarea pe rand a intrebarilor incepand de la randomQuestion[number] (number=0 initial, fiind prima intrebare)
/////////////////////////////////////////////
   

  return (

    randomQuestion?<Test selectedQuiz={selectedQuiz}  randomQuestion={randomQuestion}/> : ''
  )
}

export default QuizData
