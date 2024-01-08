import { useState } from 'react';
import moment from 'moment';
import './index.css';

const StopWatch = () => {
  const [running, setRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(moment.duration(0));
  const [intervalId, setIntervalId] = useState(null);
  const [laps, setLaps] = useState([]);
  const [lapStartTime, setLapStartTime] = useState(null);

  const startStopWatch = () => {
    if (!running) {
      const newIntervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) =>
          moment.duration(prevElapsedTime.asMilliseconds() + 1)
        );
      }, 1);
      setIntervalId(newIntervalId);
      setRunning(true);
      setLapStartTime(moment());
    }
  };

  const stopStopWatch = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setRunning(false);
  };

  const resetStopWatch = () => {
    clearInterval(intervalId);
    setRunning(false);
    setElapsedTime(moment.duration(0));
    setLaps([]);
    setLapStartTime(null);
  };

  const recordLapTime = () => {
    if (lapStartTime !== null) {
      const currentLapTime = moment().diff(lapStartTime);
      setLaps([...laps, moment.duration(currentLapTime)]);
      setLapStartTime(moment());
    }
  };

  const formatElapsedTime = (duration) => {
    const hours = duration.hours().toString().padStart(2, '0');
    const minutes = duration.minutes().toString().padStart(2, '0');
    const seconds = duration.seconds().toString().padStart(2, '0');
    const milliseconds = duration.milliseconds().toString().padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:"6%",gap:"20px"}}>
      <p style={{fontSize:"40px",fontWeight:"700"}}>STOP WATCH</p>
      <div style={{fontSize:"35px",fontWeight:"700"}}>
        Timer: {formatElapsedTime(elapsedTime)}
      </div>
      <div className='stopwtach-btn' style={{display:"flex",gap:"8px"}}>
        <button onClick={startStopWatch} style={{padding:"12px 24px",cursor:"pointer",fontSize:"20px",fontWeight:"600"}}>Start</button>
        <button onClick={stopStopWatch} style={{padding:"12px 24px",cursor:"pointer",fontSize:"20px",fontWeight:"600"}}>Stop</button>
        <button onClick={resetStopWatch} style={{padding:"12px 24px",cursor:"pointer",fontSize:"20px",fontWeight:"600"}}>Reset</button>
        <button onClick={recordLapTime} style={{padding:"12px 24px",cursor:"pointer",fontSize:"20px",fontWeight:"600"}}>Lap</button>
      </div>
      <div style={{marginRight:"15%"}}>
        <h2>Lap Times</h2>
        <ul>
          {laps.map((lapTime, index) => (
            <li key={index} style={{fontSize:"18px"}}>
              Lap {index + 1}: {formatElapsedTime(lapTime)}
            </li>
          ))}
        </ul>
      </div>
      </div>
  );
};

export default StopWatch;
