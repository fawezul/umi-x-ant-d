import React, { useState } from 'react';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import MyForm from "./newForm";
import styles from './index.less';


type Props = {
    // define your component's props here
};

type State = {
    displayText: string;
};

class SpeechMic extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            displayText: 'INITIALIZED: ready to test speech...'
        };
    }

    componentDidMount() {
        const speechConfig = sdk.SpeechConfig.fromSubscription("031ebfddd64e4f728863ee2c974fb24c", "westeurope");
        speechConfig.speechRecognitionLanguage = 'en-US';
        
        const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

        this.setState({
            displayText: 'speak into your microphone...'
        });

        

        recognizer.recognized = (s, e) => {
            if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
                this.setState({
                    displayText: `${e.result.text}`
                });
            } else {
                this.setState({
                    displayText: 'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.'
                });
            }
        };
    
        recognizer.startContinuousRecognitionAsync();
    }

  render() {
      function handleValueChange(value: string): void {
          throw new Error('Function not implemented.');
      }

    return (
      <div>
        <MyForm value={this.state.displayText} onValueChange={handleValueChange}/>
      </div>
    );
  }
}

export default SpeechMic;
