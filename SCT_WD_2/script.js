let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapCount = 1;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function formatTime(time) {
    let ms = time % 1000;
    let totalSeconds = Math.floor(time / 1000);
    let seconds = totalSeconds % 60;
    let minutes = Math.floor(totalSeconds / 60) % 60;
    let hours = Math.floor(totalSeconds / 3600);

    return `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}.${String(ms).padStart(3,'0')}`;
}

function start() {
    if (!timerInterval) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            display.textContent = formatTime(elapsedTime);
        }, 10);
    }
}

function pause() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function reset() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    lapCount = 1;
    display.textContent = "00:00:00.000";
    laps.innerHTML = "";
}

function lap() {
    if (elapsedTime === 0) return;
    const li = document.createElement("li");
    li.textContent = `Lap ${lapCount++} → ${formatTime(elapsedTime)}`;
    laps.appendChild(li);
}

document.getElementById("startBtn").addEventListener("click", start);
document.getElementById("pauseBtn").addEventListener("click", pause);
document.getElementById("resetBtn").addEventListener("click", reset);
document.getElementById("lapBtn").addEventListener("click", lap);
