let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const timeDisplay = document.getElementById('time');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapTimesList = document.getElementById('lapTimes');

function updateTime() {
  elapsedTime = Date.now() - startTime;
  const time = new Date(elapsedTime);
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');
  const milliseconds = String(time.getMilliseconds()).padStart(3, '0').slice(0, 2);
  timeDisplay.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function startPauseStopwatch() {
  if (isRunning) {
    clearInterval(timerInterval);
    startPauseBtn.textContent = 'Start';
  } else {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    startPauseBtn.textContent = 'Pause';
  }
  isRunning = !isRunning;
}

function resetStopwatch() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  timeDisplay.textContent = '00:00:00';
  startPauseBtn.textContent = 'Start';
  isRunning = false;
  lapTimesList.innerHTML = '';
}

function recordLap() {
  if (isRunning) {
    const lapTime = document.createElement('li');
    lapTime.textContent = timeDisplay.textContent;
    lapTimesList.appendChild(lapTime);
  }
}

startPauseBtn.addEventListener('click', startPauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
