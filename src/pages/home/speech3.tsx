import * as sdk from "microsoft-cognitiveservices-speech-sdk";


export default function synthesizeSpeech(text: string): Promise<ArrayBuffer> {
    const speechConfig = sdk.SpeechConfig.fromSubscription("031ebfddd64e4f728863ee2c974fb24c", "westeurope");
    const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig);
  
    return new Promise((resolve, reject) => {
      speechSynthesizer.speakTextAsync(
        text,
        result => {
          const { audioData } = result;
  
          speechSynthesizer.close();
  
          resolve(audioData);
        },
        error => {
          console.log(error);
          speechSynthesizer.close();
          reject(error);
        });
    });
  }

  
  