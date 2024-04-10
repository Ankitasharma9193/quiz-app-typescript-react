import React, {useState} from 'react';
import QuestionsCard from './components/QuestionsCard';
import { fetchQuizzQuestions, Difficulty, QuestionState } from './API';
// Styles
import { GlobalStyle, Wrapper } from './App.styles';

function App() {
  type AnswerObject = {
    questionNumber: number
    isCorrect: boolean;
    answerProvided: string;
    correctAnswer: string;
  }

  const TOTAL_QUESTIONS = 10;

  const [loading, setLoading]  = useState(false); 
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuizz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizzQuestions(TOTAL_QUESTIONS, Difficulty.MEDIUM );
    console.log(newQuestions);
    
    setScore(0);
    setNumber(0);
    setQuestions(newQuestions);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
 //   const ans = e.currentTarget.querySelector('span')?.textContent as string;
    // const ans = e.currentTarget.querySelector('span')?.textContent ?? "";
    const ans = e.currentTarget.value; // in the <button> if we put <button value={ans}> then can use this otherwise above
    const correctAnswer =  questions[number].correct_answer;

    // console.log(`ans is`, e.currentTarget.querySelector('span')?.textContent);
   let isCorrectorNot = ():boolean => ans===correctAnswer
    if(ans  === correctAnswer) {
      setScore(prevScore => prevScore +1)
      // console.log(`scrore is : ${score}`);
    }
    const answerObject: AnswerObject = {
      questionNumber: number+1,
      isCorrect: isCorrectorNot(),
      answerProvided: ans,
      correctAnswer:  correctAnswer,
    }

    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      answerObject
    ]);
  }

  const nextQuestion = () => {
    if(number+1 === TOTAL_QUESTIONS){
        setGameOver(true)
    } else {
        setNumber(prevNumber => prevNumber +1 ) 
    }
  }

  return (
    <>
     <GlobalStyle />
     <Wrapper>
      <h1 > REACT QUIZZ</h1>
      { (gameOver && !loading) 
        ? (<button className='buttonClass' onClick={startQuizz}>
            Start Quiz
          </button>) : null
      }

      <p className='score'>Score: {score}</p>
     {loading &&
      <p className='questions'>Loading Questions.....</p>
     }
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
      { (!gameOver && !loading &&  0 <= number  && number <= TOTAL_QUESTIONS - 1) 
        ? (<button className='nextQuestionButton' onClick={nextQuestion}>
              Next Question!
            </button>) 
        : (<h3> Test Finish! </h3>)
      }
      </Wrapper>
    </>
  );
}

export default App;
