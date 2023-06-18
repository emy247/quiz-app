import {useState, useEffect} from 'react';
import Test from './test';
import './loader.css';
const BeginQuiz = ({quiz}) => {

    const [selectedQuiz, setSelectedQuiz] = useState([]);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    
    useEffect(()=>{
    async function fetchData() {
      const response = await fetch(`https://nova-coral-wavelength.glitch.me/${quiz}`);
      const data = await response.json(); 
      setSelectedQuiz(data);
    };
    fetchData(); },[quiz])
    
    useEffect(() => {

        if (selectedQuiz.length > 0) {
            const shuffled = [...selectedQuiz];
            let currentIndex = shuffled.length - 1;
            while (currentIndex > 0) {
                const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
                [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
                currentIndex--;
            }
            
            function shuffleArray(array) {
              for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
              }
              return array;
            }
            
            const shuffledQuestion = shuffled.map(q => ({
              ...q,
              answers: shuffleArray(q.answers)
            }));

            setShuffledQuestions(shuffledQuestion);
        }
        
    }, [selectedQuiz]);

    console.log('intrebarile amestecate',shuffledQuestions);
    
    return (   
       shuffledQuestions.length>0 ? <Test selectedQuiz={selectedQuiz} shuffledQuestions={shuffledQuestions} quiz={quiz}/> 
       : 
       <span className="loader"></span>
    )
}

export default BeginQuiz