import React from 'react';

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNr: number;
  totalQuestions: number;
}

const QuestionsCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => {
  return (
    <div>
      <p className='Qnumber'>
         Question: {questionNr}/{totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {
          answers.map((ans) => (
            <div>
              <button disabled={userAnswer} onClick={callback}>
                <span dangerouslySetInnerHTML={{ __html: ans }} />
              </button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default QuestionsCard;