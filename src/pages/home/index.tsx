import { getQuestion } from '@/api/book';
import { useEffect, useState } from 'react';
import styles from './index.less';
import SpeechMic from "./STT";
import synthesizeSpeech from "../TTS";
import SubmitButton from "./formSubmit";


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
      <p className={styles.title}>Talking Chatbot</p>
    <div className={styles.container}>
      

      <div className={styles.scroller}>
        {results.length > 0 && currentIndex < results.length ? (
          <div key={results[currentIndex]}><p className={styles.bot}>Bot</p> 
          <p className={styles.colon}>:</p>
          <div className={styles.question}> {results[currentIndex].question}</div>
            <audio className={styles.audio}src= {audioUrl} controls />
            <SpeechMic />
            <SubmitButton onSubmit={(questionId: number, answer: string) => nextQuestion(questionId=results[currentIndex].id, answer)}/>

          </div>
        ) : (
          <div>No more questions to show <br></br>
          <a href="https://forms.gle/XtLiSAEarXUKBxvg9">Survey Form</a>
            
          </div>
        )}
   </div>

    </div>
    </div>
  );
};





