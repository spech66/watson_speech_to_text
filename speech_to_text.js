/************************************************************************
* Based on the https://github.com/ibmtjbot/tjbot/tree/master/recipes/speech_to_text code
* Author: Sebastian Pech
*
* Original file:
* Copyright 2016 IBM Corp. All Rights Reserved.
* Watson Maker Kits
* This project is licensed under the Apache License 2.0, see LICENSE.*
************************************************************************
*
* Must run with root-level protection
* sudo node stt.js

 Follow the instructions in http://www.spech.de/blog/article/spracherkennung-chatbot-watson-raspberry-pi to
 get the system ready to run this code.
*/

/************************************************************************
 * Step #1: Configuring your Bluemix Credentials
 ************************************************************************
 In this step, the audio sample (pipe) is sent to "Watson Speech to Text" to transcribe.
 The service converts the audio to text and saves the returned text in "textStream"
*/
var watson = require('watson-developer-cloud');
var config = require('./config');  // gets our username and passwords from the config.js files
var speech_to_text = watson.speech_to_text({
    username: config.username,
    password: config.password,
    version: config.version
});

/************************************************************************
 * Step #2: Configuring the Microphone
 ************************************************************************
 In this step, we configure your microphone to collect the audio samples as you talk.
 See https://www.npmjs.com/package/mic for more information on
 microphone input events e.g on error, startcomplete, pause, stopcomplete etc.
*/

// Initiate Microphone Instance to Get audio samples
var mic = require('mic');
var micInstance = mic({ 'rate': '44100', 'channels': '2', 'debug': false, 'exitOnSilence': 6 });
var micInputStream = micInstance.getAudioStream();

micInputStream.on('data', function(data) {
    //console.log("Recieved Input Stream: " + data.length);
});

micInputStream.on('error', function(err) {
    console.log("Error in Input Stream: " + err);
});

micInputStream.on('silence', function() {
    // detect silence.
});
micInstance.start();
console.log("Listening, you may speak now.");

/************************************************************************
 * Step #3: Converting your Speech Commands to Text
 ************************************************************************
 In this step, the audio sample is sent (piped) to "Watson Speech to Text" to transcribe.
 The service converts the audio to text and saves the returned text in "textStream".
 You can also set the language model for your speech input.
 The following language models are available
     ar-AR_BroadbandModel
     en-UK_BroadbandModel
     en-UK_NarrowbandModel
     en-US_BroadbandModel (the default)
     en-US_NarrowbandModel
     es-ES_BroadbandModel
     es-ES_NarrowbandModel
     fr-FR_BroadbandModel
     ja-JP_BroadbandModel
     ja-JP_NarrowbandModel
     pt-BR_BroadbandModel
     pt-BR_NarrowbandModel
     zh-CN_BroadbandModel
     zh-CN_NarrowbandModel
*/
var recognizeparams = {
  content_type: 'audio/l16; rate=44100; channels=2',
  model: 'en-US_BroadbandModel'  // Specify your language model here
};
var textStream = micInputStream.pipe(
    speech_to_text.createRecognizeStream(recognizeparams)
);


/*********************************************************************
 * Step #4: Parsing the Text
 *********************************************************************
 In this step, we parse the text to look for commands such as "ON" or "OFF".
 You can say any variations of "lights on", "turn the lights on", "turn on the lights", etc.
 You would be able to create your own customized command, such as "good night" to turn the lights off.
 What you need to do is to go to parseText function and modify the text.
*/

textStream.setEncoding('utf8');
textStream.on('data', function(str) {
    console.log(' ===== Speech to Text ===== : ' + str); // print each text we receive
    parseText(str);
});

textStream.on('error', function(err) {
  console.log(' === Watson Speech to Text : An Error has occurred =====') ; // handle errors
  console.log(err) ;
  console.log("Press <ctrl>+C to exit.") ;
});

function parseText(str){
  /* You can check str here */
}

