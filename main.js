// create variable for current time, alarm time, and a flag to indicate if the alarm is active
const currentTime = new Date();
let alarmTime = new Date();
let isAlarmActive = false;

//create a function to check if the alarm should go off
    //IF isAlarmActive is true
        //get the currentTime
        //check if alarmTime == currentTime
        //if they match, trigger the alarm
        //if not, continue checking
function checkAlarm() {
    if (isAlarmActive) {
        const currentTime = new Date();
        const currentHours = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();
        const alarmHours = alarmTime.getHours();
        const alarmMinutes = alarmTime.getMinutes();
    if (currentHours === alarmHours && currentMinutes === alarmMinutes) {
        triggerAlarm();
        }
    }
}

// create a function to update the current time and display it
    //get the current time and store it in currentTime variable
    //Display current time on the webpage
    //call function that checks alarm 
function updateClockTime () {
    const currentTimeElement = document.getElementById("current-time");
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentTime.getSeconds().toString().padStart(2, "0");
    const currentTimeString = `${hours}:${minutes}:${seconds}`;
    currentTimeElement.textContent = currentTimeString;
    checkAlarm();
}

//periodically update the current time based on an interval
    //use setInterval to call the function to update the currentTime at regular intervals
setInterval(updateClockTime, 1000);
updateClockTime();

//create a function to set the alarm
    //gather the desired alarm time from the user input element and store it in alarmTime variable
    //convert the alarm time to a comparable format(seconds since midnight)
    //set isAlarmActive variable to true to indicate the alarm is set
function setAlarm() {
    const alarmInputElement = document.getElementById("alarm-time");
    const alarmTimeInput = alarmInputElement.value;
    const parsedTime = parse12HourTime(alarmTimeInput);

    alarmTime.setHours(parsedTime.hours);
    alarmTime.setMinutes(parsedTime.minutes);
    alarmTime.setSeconds(0);
    isAlarmActive = true;
}

function parse12HourTime(currentTimeString){
    const [time, period] = currentTimeString.split(' ');

    const [hours, minutes] = time.split(':');
    let parsedHours = parseInt(hours, 10);

    if (period === 'pm' && parsedHours !== 12){
        parsedHours += 12;
    }

    if (period === 'am' && parsedHours === 12){
        parsedHours = 0;
    }

    return {
        hours: parsedHours,
        minutes: parseInt(minutes, 10),
    };
}

function triggerAlarm() {
    const alarmSound = document.getElementById("alarm-sound");
    alarmSound.play();
}

//create function to turn off alarm
    //if isAlarmActive is true, set isAlarmActive to false
    //stop any alarm that is ringing
function stopAlarm() {
    if(isAlarmActive) {
        isAlarmActive = false;
    }
    const alarmSound = document.getElementById("alarm-sound");
    alarmSound.pause();
}

//create eventlisteners for our buttons
    //set alarm button
    //stop alarm button
const setAlarmButton = document.getElementById("set-alarm");
setAlarmButton.addEventListener("click", setAlarm);

const stopAlarmButton = document.getElementById("stop-alarm");
stopAlarmButton.addEventListener("click", stopAlarm);

