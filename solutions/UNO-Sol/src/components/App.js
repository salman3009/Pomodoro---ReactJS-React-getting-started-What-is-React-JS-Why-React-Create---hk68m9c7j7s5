import React, {Component, useEffect, useState} from "react";
import '../styles/App.css';

const App = () => {

  const [getWorkDuration,setWorkDuration] = useState(25);
  const [getBreakDuration,setBreakDuration] = useState(5);
  const [getSecondsRecordsWork,setSecondsRecordsWork] = useState(0);
  const [getSecondsRecordsBreak,setSecondsRecordsBreak] = useState(0);
  const [getFlag,setFlag] = useState(false);
  const [getType,settype] = useState("");

  useEffect(()=>{

    if(getType == "work"){
      const result = setTimeout(()=>{
        console.log(getSecondsRecordsWork);
        setSecondsRecordsWork(getSecondsRecordsWork-1);
      },1000)
  
      return ()=> clearTimeout(result);
    }
  

  },[getType,getSecondsRecordsWork])

  const onDurationCheck=(event)=>{
    console.log(typeof event.target.value);
        if(event.target.name === 'work-duration'){
          if(parseInt(event.target.value<0)){
            setWorkDuration('');
          }
          else{
            setWorkDuration(parseInt(event.target.value));
          }
        }
        else{
          if(parseInt(event.target.value<0)){
            setBreakDuration('');
          }
          else{
            setBreakDuration(parseInt(event.target.value));
          }
        }    
  }

  const onSetHandler=()=>{
    alert("coming");
    setFlag(true);
    settype("work");
    console.log(getWorkDuration);
    console.log(getWorkDuration * 60);
    setSecondsRecordsWork(getWorkDuration*60);
  }

  const onStopHandler=()=>{
     setFlag(false);
  }

  const onResetHandler=()=>{
       setFlag(false);
  }

  const getHandlers=(value)=>{
     let m = parseInt(value/60).toString();
     let s = parseInt(value%60).toString();
     let input = (m.length>1)?m: "0"+m;
     let inputTwo = (s.length>1)?s:"0"+s;
     return `${input}:${inputTwo}`;
  }


  return (
    <div id="main">

      <div className="container">
          {getType === "work"? getHandlers(getSecondsRecordsWork):""}
          <br/>
               {getType}
      </div>
      <div className="container">
      <button disabled={getFlag} onClick={onSetHandler} data-testid='start-btn'>start</button>
      <button disabled={!getFlag} onClick={onStopHandler} data-testid='stop-btn'>stop</button>
      <button disabled={!getFlag} onClick={onResetHandler} data-testid='reset-btn'>reset</button>
      </div>

      <div className="container">
        <input type="number" value={getWorkDuration} name="work-duration" onChange={onDurationCheck} data-testid='work-duration'/>
        <input type="number" value={getBreakDuration} name="break-duration" onChange={onDurationCheck} data-testid='break-duration'/>
        <button  disabled={getFlag} onClick={onSetHandler} data-testid='set-btn' >Set</button>
      </div>
    </div>
  )
}


export default App;
