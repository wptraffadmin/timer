let timerInterval;
let totalSeconds = 0;
let isRunning = false;

const playPauseButton = document.getElementById('playPause'); // Одна кнопка для плей/пауза
const resetButton = document.getElementById('reset');
const hoursInput = document.getElementById('hoursInput');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');
const fullscreenToggleButton = document.getElementById('fullscreen-toggle');

const alertSound = new Audio('audio/dragon.mp3');

function updateTimerDisplay() {
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  hoursInput.value = hours;
  minutesInput.value = minutes;
  secondsInput.value = seconds;
}

function startTimer() {
  if (totalSeconds > 0) {
    isRunning = true;
    updatePlayPauseIcon('pause'); // Змінюємо іконку на паузу
    hoursInput.disabled = true;
    minutesInput.disabled = true;
    secondsInput.disabled = true;

    timerInterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
        isRunning = false;
        updatePlayPauseIcon('play'); // Змінюємо іконку на старт після завершення
        alertSound.play();
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  updatePlayPauseIcon('play'); // Змінюємо іконку на старт
}

function toggleTimer() {
  if (isRunning) {
    pauseTimer(); // Якщо таймер працює, ставимо паузу
  } else {
    setInitialTime();
    startTimer(); // Якщо таймер на паузі, запускаємо
  }
}

function resetTimer() {
  pauseTimer();
  totalSeconds = 0;
  updateTimerDisplay();
  hoursInput.disabled = false;
  minutesInput.disabled = false;
  secondsInput.disabled = false;
  hoursInput.value = '';
  minutesInput.value = '';
  secondsInput.value = '';
  updatePlayPauseIcon('play'); // Скидаємо іконку на старт
}

function setInitialTime() {
  if (!isRunning) {
    const hours = parseInt(hoursInput.value, 10) || 0;
    const minutes = parseInt(minutesInput.value, 10) || 0;
    const seconds = parseInt(secondsInput.value, 10) || 0;

    totalSeconds = hours * 3600 + minutes * 60 + seconds;
    updateTimerDisplay();
  }
}

function updatePlayPauseIcon(state) {
  const icon = playPauseButton.querySelector('img');
  if (state === 'play') {
    icon.src = 'https://img.icons8.com/ios/50/play--v1.png';
    icon.alt = 'play--v1';
  } else if (state === 'pause') {
    icon.src = 'https://img.icons8.com/ios/50/pause--v1.png';
    icon.alt = 'pause--v1';
  }
}

// Обробник для кнопки плей/пауза
playPauseButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);

// Функція для активації повного екрану
function enterFullScreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
    document.getElementById('fullscreenIcon').src = 'https://img.icons8.com/ios/50/full-screen--v1.png'; // Змінюємо іконку на вихід з екрану
  } else if (document.documentElement.mozRequestFullScreen) { // Firefox
    document.documentElement.mozRequestFullScreen();
    document.getElementById('fullscreenIcon').src = 'https://img.icons8.com/ios/50/full-screen--v1.png'; // Змінюємо іконку
  } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, Opera
    document.documentElement.webkitRequestFullscreen();
    document.getElementById('fullscreenIcon').src = 'https://img.icons8.com/ios/50/full-screen--v1.png'; // Змінюємо іконку
  } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
    document.documentElement.msRequestFullscreen();
    document.getElementById('fullscreenIcon').src = 'https://img.icons8.com/ios/50/full-screen--v1.png'; // Змінюємо іконку
  }
}

function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
    document.getElementById('fullscreenIcon').src = 'https://img.icons8.com/fluency-systems-regular/50/fullscreen.png'; // Змінюємо іконку на вхід в екран
  } else if (document.mozCancelFullScreen) { // Firefox
    document.mozCancelFullScreen();
    document.getElementById('fullscreenIcon').src = 'https://img.icons8.com/fluency-systems-regular/50/fullscreen.png'; // Змінюємо іконку
  } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
    document.webkitExitFullscreen();
    document.getElementById('fullscreenIcon').src = 'https://img.icons8.com/fluency-systems-regular/50/fullscreen.png'; // Змінюємо іконку
  } else if (document.msExitFullscreen) { // IE/Edge
    document.msExitFullscreen();
    document.getElementById('fullscreenIcon').src = 'https://img.icons8.com/fluency-systems-regular/50/fullscreen.png'; // Змінюємо іконку
  }
}


// Обробник для кнопки повного екрану
document.getElementById('fullscreenToggle').addEventListener('click', () => {
  if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
    exitFullScreen(); // Якщо вже в повному екрані, виходимо
  } else {
    enterFullScreen(); // Якщо не в повному екрані, переходимо в нього
  }
});
// Ініціалізація
updateTimerDisplay();
