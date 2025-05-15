import React, { useState, useEffect } from 'react';
import NumerologyCycleStarter from './components/NumerologyCycleStarter';
import { getCurrentPhaseComponent } from './phaseSelector';

function App() {
  const [timeline, setTimeline] = useState({ yesterday: {}, today: {}, tomorrow: {} });
  const [currentPhase, setCurrentPhase] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const todayDate = new Date('2025-04-28'); // example static date
    const yesterdayDate = new Date(todayDate);
    yesterdayDate.setDate(todayDate.getDate() - 1);
    const tomorrowDate = new Date(todayDate);
    tomorrowDate.setDate(todayDate.getDate() + 1);

    const todayStr = getFormattedDate(todayDate);
    const yesterdayStr = getFormattedDate(yesterdayDate);
    const tomorrowStr = getFormattedDate(tomorrowDate);

    const yesterdayNum = calculateNumerology(yesterdayStr);
    const todayNum = calculateNumerology(todayStr);
    const tomorrowNum = calculateNumerology(tomorrowStr);

    setTimeline({
      yesterday: { date: yesterdayStr, num: yesterdayNum, label: phaseLabels[yesterdayNum] },
      today: { date: todayStr, num: todayNum, label: phaseLabels[todayNum] },
      tomorrow: { date: tomorrowStr, num: tomorrowNum, label: phaseLabels[tomorrowNum] }
    });

    const currentHour = todayDate.getHours();
    setCurrentPhase(`Phase for hour ${currentHour}`);

    // Optional: provide mock task list
    const mockTasks = [
      { task: "Reflect on today's cycle", complete: false },
      { task: "Write one insight", complete: true }
    ];
    setTasks(mockTasks);
  }, []);

  const PhaseComponent = getCurrentPhaseComponent(
    phaseLabels[2] // You can swap this with timeline.today.num when you're ready
  );

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f0f8ff' }}>
      <h1>Numerology Cycle Tracker 🚀</h1>
      <NumerologyCycleStarter />
      <p>
        🕒 Yesterday ({timeline.yesterday.num}): {timeline.yesterday.label} <br />
        🚀 Today ({timeline.today.num}): {timeline.today.label} <br />
        ⭐ Tomorrow ({timeline.tomorrow.num}): {timeline.tomorrow.label}
      </p>
      <h3>Current Phase: {currentPhase}</h3>
      <PhaseComponent />
      <h3>Tasks for Today:</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {index + 1}. {task.task} [{task.complete ? 'Complete' : 'Pending'}]
          </li>
        ))}
      </ul>
    </div>
  );
}

const calculateNumerology = (dateStr) => {
  const digits = dateStr.replace(/\D/g, '').split('').map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  while (sum > 9) sum = sum.toString().split('').reduce((a, b) => a + b, 0);
  return sum;
};

const getFormattedDate = (date) => {
  return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
};

const phaseLabels = {
  1: 'Presence - Initialize focus and awareness',
  2: 'Planning - Organize tasks and mental space',
  3: 'Action - Initiate movement and expression',
  4: 'Reflection - Midpoint awareness and recalibration',
  5: 'Correction - Adjustments to alignment and path',
  6: 'Connection - Collaboration and synchronicity',
  7: 'Rest - Restoration and pause',
  8: 'Recalibration - Data-driven analysis and regroup',
  9: 'Release + Restart - Completion and gateway to next cycle'
};

export default App;
