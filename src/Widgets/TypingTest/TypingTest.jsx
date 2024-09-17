"use client";
import React, { useState } from 'react'
import styles from "./TypingTest.module.css"
import Timer from '../Timer/Timer';
import generateRandomSentence from './RandomScentance';
const TypeText = generateRandomSentence(50);
var wrongLetters = 0;

function calculateWPM(TypeText, textInp, min, wrongLetters, setWpm,setAccuracy) {
  alert(wrongLetters);
  const textArr = Array.from(TypeText);
  const inpArr = Array.from(textInp);
  var correctWords = 0;
  var correctLetters = 0-wrongLetters;

  var wrongWordFlag = false;
  inpArr.forEach((letter,index) => {
    if(letter === " " || index == textArr.length-1){

      if(letter === textArr[index]) {
        correctLetters++;
      }

      if(!wrongWordFlag) {
        correctWords++;
      }
      else {
        wrongWordFlag=false;
      }
    }
    else {
      if(letter === textArr[index]) {
        correctLetters++;
      }
      else {
        wrongWordFlag = true;
      }
    }
  });

  const accuracy = (correctLetters / textArr.length)*100;
  //alert("Accuracy : "+accuracy+"%");
  setAccuracy(accuracy)
  const wpm = correctWords/min;
  //alert('WPM : '+wpm)
  setWpm(wpm);
}

function TypingTest() {
  //const TypeText = "Hello How Are You";
  const [textInp, setTextInp] = useState("");
  //const [wrongLetters, setWrongLetters] = useState(0)
  const [wpm, setWpm] = useState(null);
  const [accuracy, setAccuracy] = useState(0);

  
  var textArr = Array.from(TypeText)
  return (
    <div className={styles.typingtest}>
      <Timer initialSeconds={60} onTimerEnd={()=> calculateWPM(TypeText,textInp, 1,Math.sqrt(wrongLetters),setWpm,setAccuracy)} />
      {
          wpm ? <div className={styles.statsdiv}>
          <span>Accuracy : {accuracy}%</span>
          <span>WPM : {wpm}</span>
        </div> : 
         
      <div>
        {
          textArr.map((letter, index) => {
            if(textInp.length > index) {
              if(!(letter == textInp.charAt(index))){
                wrongLetters++;
              }
            } 
            return(<span key={index} className={styles.textletter} style={textInp.length > index ? { color: letter === textInp.charAt(index) ? 'white' : 'red' } : null}>{letter}</span>)
          })
        }
      </div>
      }
      <br />
      <input type="text" className={styles.hiddeninput} onChange={(e) => setTextInp(e.target.value)} autoFocus />

        
    </div>
  )
}

export default TypingTest