import { getQuestion } from '@/api/book';
import { useEffect, useState } from 'react';
import styles from './index.less';
import Form from "./form"



type Answer = { //for user's previous answer display - property structure
  numberID: number;
  theirAnswer: string;
};

export default function Text() {

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
    <div className={styles.container}>
      <div className={styles.scroller}>

      {results.length > 0 && (
          <div>
            <ol>
              {userAnswer.map(answerResult => { //answerResult contains user answer
               const resultIndex = results.findIndex(result => result.id === answerResult.numberID); //finds the question index and if matches, resultIndex = question index
               const question = resultIndex !== -1 ? results[resultIndex].question : ""; //get question from the results list (contains all questions)
              return (
                <li key={answerResult.numberID}>
                  <p className={styles.bot}>Bot</p> 
                  <p className={styles.colon}>:</p>
                    <li className={styles.questionBot}>{question}</li> <br></br>
                    <p className={styles.user}>User</p> 
                    <p className={styles.colon}>:</p>
                    <li className={styles.answer}>{answerResult.theirAnswer}</li>
                </li>
                   );})}
            </ol>
          </div>

        )}

     
        {results.length > 0 && currentIndex < results.length ? (
          <div key={results[currentIndex]}><p className={styles.bot}>Bot</p> 
          <p className={styles.colon}>:</p>
            <div className={styles.question}> {results[currentIndex].question}</div>
            <Form IDToSave={results[currentIndex].id} onSubmit={(questionId: number, answer: string) => nextQuestion(questionId=results[currentIndex].id, answer)} />
          </div>
        ) : (
          <div className={styles.noQuestion}>No more questions to show</div>
        )}
   </div>

    </div>
  );
}


