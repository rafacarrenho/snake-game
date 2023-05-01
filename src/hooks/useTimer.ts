import { useEffect, useState } from "react";

export const useTimer = ({ defaultTime = 0, defaultInterval = 1000 }) => {
  const [time, setTime] = useState(defaultTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((value) => value - 1);
    }, defaultInterval);

    return () => clearInterval(interval);
  }, [defaultTime, defaultInterval]);

  return { time };
};
