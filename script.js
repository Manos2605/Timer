// Récupérer le temps
let daysInput = document.getElementById("days");
let hoursInput = document.getElementById("hours");
let minutesInput = document.getElementById("minutes");
let secondsInput = document.getElementById("seconds");
let display = document.getElementById("timer");
let start = document.getElementById("start");
let pause = document.getElementById("pause");
let reset = document.getElementById("reset");

let timer;
let isRunning = false;
let totalSeconde = 0;

// Afficharge
function Display() {
    let days = Math.floor(totalSeconde / (24 * 3600));
    let hours = Math.floor((totalSeconde % (24 * 3600)) / 3600);
    let minutes = Math.floor((totalSeconde % 3600) / 60);
    let seconds = totalSeconde % 60;

    let daysAffiche = (days < 10) ? "0" + days : days;
    let hoursAffiche = (hours < 10) ? "0" + hours : hours;
    let minutesAffiche = (minutes < 10) ? "0" + minutes : minutes;
    let secondsAffiche = (seconds < 10) ? "0" + seconds : seconds;
    
    // Mise jour dz l'afficharge
    display.innerHTML = daysAffiche + ":" + hoursAffiche + ":" + minutesAffiche + ":" + secondsAffiche;
}

function startTimer() {
    if (!isRunning) {
        if (totalSeconde === 0) {
            let days = parseInt(daysInput.value) || 0;
            let hours = parseInt(hoursInput.value) || 0;
            let minutes = parseInt(minutesInput.value) || 0;
            let seconds = parseInt(secondsInput.value) || 0;
            
            totalSeconde = (days * 24 * 3600) + (hours * 3600) + (minutes * 60 + seconds);
        }
        
        if (totalSeconde > 0) {
            isRunning = true;
            timer = setInterval(function() {
                totalSeconde = totalSeconde - 1;
                Display();
                
                // Minuteur 0
                if (totalSeconde === 0) {
                    clearInterval(timer);
                    isRunning = false;
                    alert("Le temps est écoulé!");
                }
            }, 1000);
        }
    }
}

// Pause
function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

// Réinitialiser
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    
    let days = parseInt(daysInput.value) || 0;
    let hours = parseInt(hoursInput.value) || 0;
    let minutes = parseInt(minutesInput.value) || 0;
    let seconds = parseInt(secondsInput.value) || 0;
    
    totalSeconde = (days * 24 * 3600) + (hours * 3600) + (minutes * 60 + seconds);
    
    Display();
}

/* Empecher l'entrer des nombre supérieur ou negatif au temps de la vrai vie */
daysInput.addEventListener("input", function() {
    if (this.value < 0) this.value = 0;
});
hoursInput.addEventListener("input", function() {
    if (this.value < 0 || this.value > 23) this.value = 0;
});
minutesInput.addEventListener("input", function() {
    if (this.value < 0 || this.value > 59) this.value = 0;
});
secondsInput.addEventListener("input", function() {
    if (this.value < 0 || this.value > 59) this.value = 0;
});

// Reset
daysInput.oninput = resetTimer;

start.onclick = startTimer;
pause.onclick = pauseTimer;
reset.onclick = resetTimer;

resetTimer();