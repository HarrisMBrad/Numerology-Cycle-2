import React, { useState, useEffect } from 'react';
  import { numerology5_directives } from '../logs/Numerology5_Tasks_042825.js';
  import { phaseClock, taskChecklist } from '../logs/test_numerology4.js';

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

  function App() {
      const [timeline, setTimeline] = useState({ yesterday: {}, today: {}, tomorrow: {} });
      const [currentPhase, setCurrentPhase] = useState('');
      const [tasks, setTasks] = useState([]);

      useEffect(() => {
          // Calculate dates
          const todayDate = new Date('2025-04-28'); // Hardcoded for April 28, 2025
          const yesterdayDate = new Date(todayDate);
          yesterdayDate.setDate(todayDate.getDate() - 1);
          const tomorrowDate = new Date(todayDate);
          tomorrowDate.setDate(todayDate.getDate() + 1);

          // Format dates
          const todayStr = getFormattedDate(todayDate);
          const yesterdayStr = getFormattedDate(yesterdayDate);
          const tomorrowStr = getFormattedDate(tomorrowDate);

          // Calculate numerology
          const yesterdayNum = calculateNumerology(yesterdayStr); // 7
          const todayNum = calculateNumerology(todayStr); // 5
          const tomorrowNum = calculateNumerology(tomorrowStr); // 7

          // Set timeline
          setTimeline({
              yesterday: { date: yesterdayStr, num: yesterdayNum, label: phaseLabels[yesterdayNum] },
              today: { date: todayStr, num: todayNum, label: phaseLabels[todayNum] },
              tomorrow: { date: tomorrowStr, num: tomorrowNum, label: phaseLabels[tomorrowNum] }
          });

          // Set current phase using phaseClock
          const currentHour = todayDate.getHours();
          setCurrentPhase(phaseClock(currentHour));

          // Initialize task checklist
          const taskList = numerology5_directives.map(d => d.task);
          const checklist = taskChecklist(todayStr, todayNum, taskList);
          setTasks(checklist.status);
      }, []);

      return (
          <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f0f8ff' }}>
              <h1>Numerology Cycle 2 Tracker 🚀</h1>
              <p>
                  Welcome to the Correction Phase ({timeline.today.num}). Today’s focus is adjusting alignment and path through change, freedom, and adaptability. Track your cycle daily to synchronize with the Builder’s Codex.
              </p>
              <p>
                  🕒 Yesterday ({timeline.yesterday.num}): {timeline.yesterday.label} <br />
                  🚀 Today ({timeline.today.num}): {timeline.today.label} <br />
                  ⭐ Tomorrow ({timeline.tomorrow.num}): {timeline.tomorrow.label}
              </p>
              <h3>Current Phase: {currentPhase}</h3>
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

  export default App;