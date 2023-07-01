import React from 'react';
import dayjs from 'dayjs';

const diffTime = () => {
  // const date = new Date();
  const now = new Date().getTime();
  const midnight = new Date().setHours(0, 0, 0, 0);

  // 현재.getTime() - 자정.getTime()으로 자정부터 현재 시간까지의 ms
  const gap = now - midnight;

  // 5분 - ( 당일 시간 ms를 5분으로 나눈 나머지 ) = 다음 5분 까지의 ms
  return 60000 - (gap % 60000);
};

export const animationInterval = () => {
  const [time, setTime] = React.useState<dayjs.Dayjs>(dayjs());

  React.useEffect(() => {
    const requestID = setInterval(() => {
      setTime(dayjs());
      console.log(dayjs());
    }, diffTime());
    return () => clearInterval(requestID);
  }, [time]);

  return time;
};
