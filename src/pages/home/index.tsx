import { getQuestion } from '@/api/book';
import { useEffect, useState } from 'react';
import styles from './index.less';
import Form from "./form"


const result={}

export default function () {
  const [results, setResults] = useState<any[]>([]);

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

      
  return (
    <div>
    <h1 className={styles.title}>Home index</h1>

    <div className={styles.scroller}>
    {results.map((item, index) => 
    <div key= {index}>{item.id}. {item.question} <br></br> 
    <Form valueToSave= {item.id}/><br></br>
    </div>
    )} 

   
  </div></div>
  );
} 



