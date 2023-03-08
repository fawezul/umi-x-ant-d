import { getQuestion } from '@/api/book';
import { useEffect, useState } from 'react';
import styles from './index.less';
import Form from "./form"


const result={}

export default function () {
  const [results, setResults] = useState<any[]>([]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

    const GetQuestion = async () => { //connect to api
        const result = await getQuestion();
        if (!result.error) {
         console.log(result)
         setResults(result)
        }
      };

      //useEffect fetches data. 
      useEffect(() => {
        GetQuestion()
      }, []);

      const handleNext = () => {
        setCurrentIndex(currentIndex + 1);
      };
    
      const nextQuestion = () => {
        // handle submit logic
        console.log('Form submitted');
        handleNext();
      };

      
      return (
        <div>
          <h1 className={styles.title}>Home index</h1>
    
          <div className={styles.scroller}>
            {results.length > 0 && (
              <div>
                <div>{results[currentIndex].id}. {results[currentIndex].question}</div>
                <Form valueToSave={results[currentIndex].id} onSubmit={nextQuestion} />
              </div>
            )}
          </div>
        </div>
      );
    }



