import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

const Timer = ({ initialSeconds, onTimerEnd, startTimer }) => {
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + initialSeconds)

    const {
        seconds,
        minutes,
        isRunning,
        restart,
        start,
    } = useTimer({ expiryTimestamp, onExpire: onTimerEnd, autoStart: false});


    useEffect(() => {
        if (startTimer) {
            start();
        }
    }, [startTimer]);


    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Timer</h1>
            <div style={{ fontSize: '100px' }}>
                <span>{minutes}</span>:<span>{seconds}</span>
            </div>
            <p>{isRunning ? 'Running' : 'Not running'}</p>
            {/* Optional: Add controls for start, pause, resume, and restart */}
            {/* <button onClick={start}>Start</button> */}
            {/* <button onClick={pause}>Pause</button> */}
            {/* <button onClick={resume}>Resume</button> */}
            {/* <button onClick={() => restart(expiryTimestamp)}>Restart</button> */}
        </div>
    );
};

export default Timer;
