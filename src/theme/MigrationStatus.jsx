// src/components/MigrationStatus.jsx
import React, { useState, useEffect } from 'react';

const getRemainingTime = () => {
  const targetDate = new Date('2023-04-18T16:00:00');
  const now = new Date();
  const difference = targetDate - now;

  if (difference <= 0) {
    return '00:00:00:00';
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  // const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  // const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  // return `${days.toString().padStart(2, '0')} days, ${hours.toString().padStart(2, '0')} hours, ${minutes.toString().padStart(2, '0')} minutes, ${seconds.toString().padStart(2, '0')} seconds`;
  return `${days.toString()}\xa0days,\xa0${hours.toString()}\xa0hours`;
  // return `${days.toString().padStart(2, '0')} days`;
};

const MigrationStatus = () => {
  const [status, setStatus] = useState({
    text: 'Fetching status...',
    className: 'migration-status-fetching',
    countdown: '',
  });

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setStatus((prevState) => ({
        ...prevState,
        countdown: getRemainingTime(),
      }));
    }, 1000);

    fetch('https://solana-status.helium.com')
      .then((response) => response.json())
      .then((data) => {
        const migrationStatus = data.migrationStatus;
        let formattedStatus = { text: '', className: '' };

        switch (migrationStatus) {
          case 'not_started':
            formattedStatus = {
              text: 'Not\xa0Started',
              className: 'migration-status-not-started',
            };
            break;
          case 'in_progress':
            formattedStatus = {
              text: 'In\xa0Progress',
              className: 'migration-status-in-progress',
            };
            break;
          case 'complete':
            formattedStatus = {
              text: 'Complete',
              className: 'migration-status-complete',
            };
            break;
          default:
            formattedStatus = {
              text: 'Unknown\xa0Status',
              className: 'migration-status-unknown',
            };
        }

        setStatus({
          text: formattedStatus.text,
          className: formattedStatus.className,
          countdown: getRemainingTime(),
        });
      })
      .catch((error) => {
        setStatus({
          text: 'Error fetching status',
          className: 'migration-status-error',
          countdown: '',
        });
      });

    return () => clearInterval(countdownInterval);
  }, []);

  return (
    <div className={`migration-status ${status.className}`}>
      Migration&nbsp;Status: {status.text}
      {status.className === 'migration-status-not-started' && (
        <div className="countdown">Countdown: {status.countdown}</div>
      )}
    </div>
  );
};

export default MigrationStatus;
