import { getQuestion } from '@/api/book';
import { useEffect, useState } from 'react';
import styles from './index.less';
import Form from "./form"

type Answer = {
  questionId: number;
  answer: string;
};

export default function () {
  const [results, setResults] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<Answer[]>([]);

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

  const handleSubmit = (questionId: number, answer: string) => {
    console.log('Form submitted');
    setUserAnswer([...userAnswer, { questionId, answer }]);
    handleNext();
  };

  return (
    <div>
      <h1 className={styles.title}>Home index</h1>
      <div className={styles.scroller}>
        {results.length > 0 && currentIndex < results.length ? (
          <div key={results[currentIndex].id}>
            <div>{results[currentIndex].id}. {results[currentIndex].question}</div>
            <Form valueToSave={results[currentIndex].id} onSubmit={(questionId: number, answer: string) => handleSubmit(results[currentIndex].id, answer)} />
          </div>
        ) : (
          <div>No more questions to show<br></br>Audio Link</div>
        )}

      {results.length > 0 && (
          <div>
            <h2>Previous Answers</h2>
            <ul>
              {userAnswer.map(result => (
                <li key={result.questionId}>
                  Question {result.questionId}: {result.answer}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}



