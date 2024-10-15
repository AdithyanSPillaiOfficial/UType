"use client";
import React, { useEffect, useRef, useState } from 'react'
import styles from "./TypingTest.module.css"
import Timer from '../Timer/Timer';
import generateRandomSentence from './RandomScentance';
import Cookies from 'js-cookie';
var TypeText = generateRandomSentence(50);
var wrongLetters = 0;

async function calculateWPM(TypeText, textInp, min, wrongLetters, setWpm, setAccuracy, setPerformance) {
  const textArr = Array.from(TypeText);
  const inpArr = Array.from(textInp);
  var correctWords = 0;
  var correctLetters = 0 - wrongLetters;

  var wrongWordFlag = false;
  inpArr.forEach((letter, index) => {
    if (letter === " " || index == textArr.length - 1) {

      if (letter === textArr[index]) {
        correctLetters++;
      }

      if (!wrongWordFlag) {
        correctWords++;
      }
      else {
        wrongWordFlag = false;
      }
    }
    else {
      if (letter === textArr[index]) {
        correctLetters++;
      }
      else {
        wrongWordFlag = true;
      }
    }
  });

  const performance = (correctLetters / textArr.length) * 100;
  //alert("Accuracy : "+accuracy+"%");
  setPerformance(performance)
  const accuracy = (correctLetters / inpArr.length)* 100;
  setAccuracy(accuracy);
  const wpm = correctWords / min;
  //alert('WPM : '+wpm)
  setWpm(wpm);

  if (Cookies.get('uname') != undefined && Cookies.get('uname') != "") {
    console.log(Cookies.get('uname'));
    try {
      const res = await fetch('/api/database/addscore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: Cookies.get('uname'), wpm }), // Send data in JSON format
      });

      const result = await res.json();
      if (res.ok) {
        console.log('Success:', result);
      } else {
        console.error('Error:', result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

function TypingTest() {
  //const TypeText = "Hello How Are You";
  const [textInp, setTextInp] = useState("");
  //const [wrongLetters, setWrongLetters] = useState(0)
  const [wpm, setWpm] = useState(null);
  const [accuracy, setAccuracy] = useState(0);
  const [performance, setPerformance] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  

  const inputRef = useRef(null);

  useEffect(() => {
    if(!timerRunning && textInp.length>0){
      setTimerRunning(true);
    }
    if(textInp == TypeText) {
      setTimerRunning(false);
      calculateWPM(TypeText, textInp, 1, Math.sqrt(wrongLetters), setWpm, setAccuracy, setPerformance)
    }
  }, [textInp]);

  useEffect(() => {
    if(Cookies.get('customtext')) {
      TypeText = Cookies.get('customtext');
      setTextArr(Array.from(TypeText));
      Cookies.remove('customtext');
    }
  }, []);


  function handleTextClick() {
    inputRef.current.focus();
  }
  


  const [textArr, setTextArr] = useState(Array.from(TypeText));
  const cursorIndex = textInp.length;
  return (
    <div className={styles.typingtest}>
      <Timer initialSeconds={60} onTimerEnd={() => calculateWPM(TypeText, textInp, 1, Math.sqrt(wrongLetters), setWpm, setAccuracy, setPerformance)} startTimer={timerRunning} />
      {
        wpm ? <div className={styles.statsdiv}>
          <span>Accuracy : {accuracy}%</span>
          <span>WPM : {wpm}</span>
          <span>Performance : {performance}</span>
        </div> :

          <div onClick={handleTextClick}>
            {
              textArr.map((letter, index) => {
                if (textInp.length > index) {
                  if (!(letter == textInp.charAt(index))) {
                    wrongLetters++;
                  }
                }
                return (<span key={index} className={`${styles.textletter} ${index === cursorIndex ? styles.cursor : ''}`} style={textInp.length > index ? { color: letter === textInp.charAt(index) ? 'white' : 'red' } : null}>{letter}</span>)
              })
            }
          </div>
      }
      <br />
      <input type="text" ref={inputRef} className={styles.hiddeninput} onChange={(e) => setTextInp(e.target.value)} autoFocus />
      <div className={styles.retake} onClick={()=> window.location.reload()}>Reload Test</div>
    </div>
  )
}

export default TypingTest