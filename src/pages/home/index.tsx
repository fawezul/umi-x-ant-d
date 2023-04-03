import { getQuestion } from '@/api/book';
import { useEffect, useState } from 'react';
import styles from './index.less';
import Form from "./form"
import synthesizeSpeech from "../TTS"
import SpeechMic from "./STT"


type Answer = { //for user's previous answer display - property structure
  numberID: number;
  theirAnswer: string;
};

export default function () {
  const [results, setResults] = useState<any[]>([]); //create array for questions from db
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<Answer[]>([]); //create array for user's answer
  const [audioUrl, setAudioUrl] = useState("");
  const [tex, setTex]= useState("");

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

  useEffect(() => {
    const currentQuestion = results.find((result) => result.id === currentIndex);
    if (!currentQuestion) {
      console.error("Question with id ${currentIndex} not found");
    }
    else {
      setTex(currentQuestion.question);
    }
  }, [currentIndex, results]); //when any of these dependencies change, it will re-run the code in the useEffect.

  console.log(tex);
  //////////////////////////////////

  //put synthesizeSpeech function with tex (contains the question)
  const generateAudioUrl = async () => {
        try {
          const audioData = await synthesizeSpeech(tex);
          const blob = new Blob([audioData], { type: "audio/wav" });
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
        } catch (error) {
          console.error(error);
        }

      return () => {
        URL.revokeObjectURL(audioUrl);

  }};
  
  useEffect(() => {
    generateAudioUrl()
    }, [tex]); //anytime tex state changes, then it will re-run the useEffect hook to generate another audio.

  //By adding currentIndex as a dependency, React will re-run the useEffect hook every time currentIndex changes, and call generateAudioUrl with the new current index, which will update the tex state with the current question's text, generate the audio URL, and update the audioUrl state accordingly.
//Also, make sure that results is updated correctly when the current question changes, so that results[currentIndex] always points to the correct question object.

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
      <br></br>

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
            <audio className={styles.audio}src= {audioUrl} controls />

          <Form IDToSave={results[currentIndex].id} onSubmit={(questionId: number, answer: string) => nextQuestion(questionId=results[currentIndex].id, answer)} />
          <SpeechMic />
          </div>
        ) : (
          <div>No more questions to show</div>
        )}
   </div>

    </div>
  );
};





