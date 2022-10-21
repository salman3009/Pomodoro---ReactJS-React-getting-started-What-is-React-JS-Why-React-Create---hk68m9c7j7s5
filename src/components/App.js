import React, { Component, useEffect, useState } from "react";
import '../styles/App.css';

const App = () => {

  const [getWorkDuration,setWorkDuration] = useState(25);
  const [getBreakDuration,setBreakDuration] = useState(5);
  const [getWorkInSeconds,setWorkInSeconds] = useState(25*60);
  const [getBreakInSeconds,setBreakInSeconds] = useState(25*60);
  const [getType,setType] = useState('');
  const [getFlag,setFlag] = useState(false);
  const[getWatch,setWatch]=useState(false);

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
      alert("work time is completed");
      clearTimeout(workResult);
    }

    if(getType == 'break' && getFlag && getBreakInSeconds>=1){
      breakResult = setTimeout(()=>{
        setBreakInSeconds(getBreakInSeconds-1);
      },1000)
    }

    if(getType == "break"  && getFlag && getBreakInSeconds<1){
      setType('');
      alert("break time is completed");
      clearTimeout(breakResult);
      setFlag(false);
    }
    
  },[getType,getFlag,getWorkInSeconds,getBreakInSeconds])

  const onChangeDurationHandler=(event)=>{
    if(event.target.name == 'work'){
      setWorkDuration(parseInt(event.target.value)<0?'':parseInt(event.target.value));
    }
    else{
      setBreakDuration(parseInt(event.target.value)<0?'':parseInt(event.target.value));
    }
  }

  const onStartHandler=()=>{
    if(getWatch){
      setFlag(true);
      return;
    }
    setWatch(true);
    setType('work');
    setFlag(true);
    setWorkInSeconds(getWorkDuration*60);
    setBreakInSeconds(getBreakDuration*60);
  }

  const onStopHandler=()=>{
    setFlag(false);
    if(workResult){
      clearTimeout(workResult);
    }
    if(breakResult){
      clearTimeout(breakResult);
    }
  }

  const onResetHandler=()=>{
    setType('');
    setWatch(false);
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
      {getType == 'work' && setTimeFormat(getWorkInSeconds)}
      {getType == 'break' && setTimeFormat(getBreakInSeconds)}
      </div>
      <div className="timer">
        {getType == 'work'? 'Work-Time': 'Break-Time'}
      </div>
      <div className="timer">
        <button disabled={getFlag}  data-testid='start-btn' onClick={onStartHandler}>Start</button>
        <button disabled={!getFlag} data-testid='stop-btn' onClick={onStopHandler}>Stop</button>
        <button disabled={!getFlag && getType==''}  data-testid='reset-btn' onClick={onResetHandler}>Reset</button>
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
