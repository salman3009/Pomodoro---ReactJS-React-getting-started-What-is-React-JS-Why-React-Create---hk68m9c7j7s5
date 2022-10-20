import React, { Component, useEffect, useState } from "react";
import '../styles/App.css';

const App = () => {

  const [getWorkDuration,setWorkDuration] = useState(25);
  const [getBreakDuration,setBreakDuration] = useState(5);
  const [getWorkInSeconds,setWorkInSeconds] = useState(25*60);
  const [getBreakInSeconds,setBreakInSeconds] = useState(25*60);

  const [getType,setType] = useState('');
  const [getFlag,setFlag] = useState(false);
  let workResult;
  let breakResult;

  useEffect(()=>{
 
    if(getType == "work"  && getFlag && getWorkInSeconds>=1){
      workResult = setTimeout(()=>{
          setWorkInSeconds(getWorkInSeconds-1);
        },1000)
    }

    if(getType == "work"  && getFlag && getWorkInSeconds<1){
      setType('break');
      clearTimeout(workResult);
    }

    if(getType == 'break' && getFlag && getBreakInSeconds>=1){
      breakResult = setTimeout(()=>{
        setBreakInSeconds(getBreakInSeconds-1);
      },1000)
    }

    if(getType == "break"  && getFlag && getBreakInSeconds<1){
      setType('');
      clearTimeout(breakResult);
      setFlag(false);
    }
    
  },[getType,getFlag,getWorkInSeconds])

  const onChangeDurationHandler=(event)=>{
    if(event.target.name == 'work'){
      setWorkDuration(parseInt(event.target.value)<0?'':parseInt(event.target.value));
    }
    else{
      setBreakDuration(parseInt(event.target.value)<0?'':parseInt(event.target.value));
    }
  }

  const onStartHandler=()=>{
    setType('work');
    setFlag(true);
    setWorkInSeconds(getWorkDuration*60);
    setBreakInSeconds(getBreakDuration*60);
  }

  const onStopHandler=()=>{
    if(workResult){
      clearTimeout(workResult);
    }
    if(breakResult){
      clearTimeout(breakResult);
    }
  }

  const onResetHandler=()=>{
    setType('');
    setFlag(false);
    if(workResult){
      clearTimeout(workResult);
    }
    if(breakResult){
      clearTimeout(breakResult);
    }
    setWorkDuration(25);
    setBreakDuration(5);
  }

  const setTimeFormat=(input)=>{
    let m = parseInt(input/60).toString();
    let s = parseInt(input%60).toString();
    let minutesInput = m.length<=1?"0"+m:m;
    let secondsInput = s.length<=1?"0"+s:s;
    console.log(secondsInput);
    return `${minutesInput}:${secondsInput}`;
  }

  return (
    <div id="main">
      <div className="timer">
      {getType == 'work' && getFlag && setTimeFormat(getWorkInSeconds)}
      {getType == 'break' && getFlag && setTimeFormat(getBreakInSeconds)}
      </div>
      <div className="timer">
        {getType == 'work'? 'Work-Time': 'Break-Time'}
      </div>
      <div className="timer">
        <button disabled={getFlag}  data-testid='start-btn' onClick={onStartHandler}>Start</button>
        <button disabled={!getFlag} data-testid='stop-btn' onClick={onStopHandler}>Stop</button>
        <button disabled={!getFlag}  data-testid='reset-btn' onClick={onResetHandler}>Reset</button>
      </div>
      <div className="timer">
        <input type="number" value={getWorkDuration} name="work" onChange={onChangeDurationHandler} data-testid='work-duration'/>
        <input type="number" value={getBreakDuration} name="break" onChange={onChangeDurationHandler}  data-testid='break-duration'/>
        <button disabled={getType!="" && getFlag}   data-testid='set-btn'>Set</button>
      </div>
    </div>
  )
}


export default App;
