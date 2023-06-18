import React from 'react';
import { useState } from 'react';
import BeginQuiz from './components/beginQuiz';
import HomePage from './components/HomePage';
import './App.css';

const App = () => {

  const [quiz, setQuiz] = useState(null);
  const [start, setStart] = useState(false);

  return (
    <>
    {!start && <HomePage setStart={setStart} setQuiz={setQuiz} />}
    {start && <BeginQuiz quiz={quiz}/>}
    </>
  );
};

export default App;
