import { useEffect, useState } from 'react';

interface CountdownProps {
  targetDate: Date;
  initialTimeLeft?: TimeLeft; // Add optional initialTimeLeft prop
}

interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

const CountDown: React.FC<CountdownProps> = ({
  targetDate,
  initialTimeLeft,
}) => {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft as TimeLeft; // Cast timeLeft as TimeLeft
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    initialTimeLeft || calculateTimeLeft()
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const addLeadingZero = (value: number) => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <div className=" flex items-center text-sm space-x-1 bg-yellow py-2 px-3 rounded-sm">
      <span className="">{`${timeLeft?.days}d: `}</span>
      <span className="">{`${addLeadingZero(
        timeLeft?.hours as number
      )}h: `}</span>
      <span className="">{`${addLeadingZero(
        timeLeft?.minutes as number
      )}m: `}</span>
      <span className="">{`${addLeadingZero(
        timeLeft?.seconds as number
      )}s`}</span>
    </div>
  );
};

export default CountDown;
