import { getQuestion } from '@/api/book';
import { useEffect, useState } from 'react';
import styles from './index.less';
import Form from "./form"

type Answer = { //for user's previous answer display - property structure
  numberID: number;
  theirAnswer: string;
};

export default function () {
  const [results, setResults] = useState<any[]>([]); //create array for questions from db
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<Answer[]>([]); //create array for user's answer

  const GetQuestion = async () => {
    const result = await getQuestion();
    if (!result.error) {
      console.log(result)
      setResults(result)
    }
  };

  useEffect(() => {
    GetQuestion()
  }, []);

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const nextQuestion = (numberID: number, theirAnswer: string) => {//take in 2 values
    console.log('Form submitted');
    setUserAnswer([...userAnswer, { numberID, theirAnswer }]); //changes the value of id and ans
    handleNext();
  };
  //results = questions
  //answerResult = user's answers

  return (
    <div>
      <h1 className={styles.title}>Home index</h1>

      {results.length > 0 && (
          <div>
            <ol>
              {userAnswer.map(answerResult => { //answerResult contains user answer
               const resultIndex = results.findIndex(result => result.id === answerResult.numberID); //finds the question index and if matches, resultIndex = question index
               const question = resultIndex !== -1 ? results[resultIndex].question : ""; //get question from the results list (contains all questions)
              return (
                <li key={answerResult.numberID}>
                    {question}: {answerResult.theirAnswer}
                </li>
                   );})}
            </ol>
          </div>

        )}

      <div className={styles.scroller}>
        {results.length > 0 && currentIndex < results.length ? (
          <div key={results[currentIndex].id}>
            <div>{results[currentIndex].id}. {results[currentIndex].question}</div>
            <Form IDToSave={results[currentIndex].id} onSubmit={(questionId: number, answer: string) => nextQuestion(questionId=results[currentIndex].id, answer)} />
          </div>
        ) : (
          <div>No more questions to show<br></br>Audio Link</div>
        )}
   </div>

    </div>
  );
}


