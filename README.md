# Speech to Text

This module provides a Node.js code to convert voice to text using IBM Watson.
The code is based on the [tjbot example]( https://github.com/ibmtjbot/tjbot). 
The german tutorial is found at [SPech.de](http://www.spech.de/blog/article/spracherkennung-chatbot-watson-raspberry-pi)

**This will only run on the Raspberry Pi.**

##How It Works
- Listens for the voice commands
- Sends audio from the microphone to the [Watson Speech to Text Service - STT](https://www.ibm.com/watson/developercloud/speech-to-text.html) to convert to text
- Parses the text to identify the given voice command
- Output the text 

##Hardware

Raspberry Pi
USB Microphone

##Build

Install ALSA tools (required for recording audio on Raspberry Pi)

    sudo apt-get install alsa-base alsa-utils

Install Dependencies

    npm install

Add your Bluemix Speech to text service credentials

    edit config.js
    enter your watson stt username, password and version.

##Running

Start the application

    sudo node speech_to_text.js   

> Note the `sudo` command. Root user access is required to control the NeoPixel LEDs.

Now talk to your microphone.

##Dependencies

- [Watson Speech to Text](https://www.ibm.com/watson/developercloud/speech-to-text.html)
- mic npm package for reading audio input

