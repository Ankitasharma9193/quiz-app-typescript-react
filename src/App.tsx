import React, {useState} from 'react';
import QuestionsCard from './components/QuestionsCard';
import { fetchQuizzQuestions, Difficulty, QuestionState } from './API'

function App() {
  const [loading, setLoading]  = useState(false); 
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const TOTAL_QUESTIONS = 10;

  const startQuizz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizzQuestions(TOTAL_QUESTIONS, Difficulty.EASY );
    console.log(newQuestions);
    
    setScore(0);
    setNumber(0);
    setQuestions(newQuestions);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const ans = e.currentTarget.value
    const correctAnswer =  questions[number].correct_answer;

    if(ans  === correctAnswer) {
      setScore(prevScore => prevScore +1)
    }
  }

  const nextQuestion = () => {
    if(number+1 === TOTAL_QUESTIONS){
        setGameOver(true)
    } else {
        setNumber(prevNumber => prevNumber +1 ) 
    }
  }

  return (
    <div className="App">
      <h1 > REACT QUIZZ</h1>
      <button className='buttonClass' onClick={startQuizz}>
        Start Quiz
      </button>

      <p className='score'>Score: {score}</p>

      <p className='questions'>Loading Questions.....</p>
      { !loading && !gameOver && (
        <QuestionsCard 
          key = {number}
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers} 
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer} 
        /> )
      } 

      <button className='nextQuestionButton' onClick={nextQuestion}>
        Next Question!
      </button>
    </div>
  );
}

export default App;
