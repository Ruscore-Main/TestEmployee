import React from 'react';
import { useTimer } from 'react-timer-hook';
const toTimeString = (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8);

function Timer({ expiryTimestamp, onEnd }) {
  const { totalSeconds, start, pause } = useTimer({
    expiryTimestamp,
    onExpire: () => onEnd(),
  });

  React.useEffect(() => {
    start();
  }, []);
  return (
    <div>
      <div style={{ fontSize: '1em', color: "#B12650" }}>{toTimeString(totalSeconds)}</div>
    </div>
  );
}

export default Timer;
