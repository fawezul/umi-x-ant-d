import React from 'react';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

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

        recognizer.recognizeOnceAsync((result: { reason: any; text: any; }) => {
            let displayText;
            if (result.reason === sdk.ResultReason.RecognizedSpeech) {
                displayText = `RECOGNIZED: Text=${result.text}`
            } else {
                displayText = 'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.';
            }

            this.setState({
                displayText: displayText
            });
        });
    }

    render() {
        return (
            <div>
                {this.state.displayText}
            </div>
        );
    }
}

export default SpeechMic;
