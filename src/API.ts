import { shuffleArray } from "./utils";

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
};

export type Question= {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
};

export type QuestionState = Question & {answers: any[]}

export const fetchQuizzQuestions = async( amount: number, difficulty: Difficulty) => {
  const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;

  try {
    const response = await fetch(endPoint)
    const data = await response.json();

    console.log('fetched ~~~~~~~~~',data)
    return data.results.map((question: QuestionState) => (
        {
            ...question, 
            answers: shuffleArray(
                [...question.incorrect_answers , question.correct_answer]
            )
        }
    ))

  } catch (error){
    console.log(`Error while fetching ${error}`)
  };

}