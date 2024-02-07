const create = document.querySelector('.option-new');
const reset = document.querySelector('.option-reset');
const change = document.querySelector('.option-change');
const pause = document.querySelector('.option-pause');
const resume = document.querySelector('.option-resume');
const save = document.querySelector('.option-save');
const container = document.querySelector('.container');
const days= document.querySelector('.days');
const hours= document.querySelector('.hours');
const minutes= document.querySelector('.minutes');
const seconds= document.querySelector('.seconds');
const inputdate= document.getElementById('date');


let prompt = document.querySelector('.modal-input');
let boolprompt = true;

let counterRunning=false;
let changeornot=false;


var countdownInterval;

var today= new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
inputdate.min=today;


function changeText(text){
    var paragraph = document.getElementById("name");
    paragraph.textContent = text;
}


function getText(){
    var date = document.getElementById("date").value;
    var text = document.getElementById("event").value;
    changeText(text);
};

function updatecountdown(){
    var currentDate = new Date();
    var eventDate = new Date(inputdate.value);
    var diff = eventDate.getTime() - currentDate.getTime();
    if(diff>0){
        var daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hoursLeft = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);
        console.log(daysLeft);
        console.log(hoursLeft);
        console.log(minutesLeft);
        console.log(secondsLeft);
        days.textContent = daysLeft;
        hours.textContent = hoursLeft;
        minutes.textContent = minutesLeft;
        seconds.textContent = secondsLeft;
        saveTimerData(inputdate.value, document.getElementById('event').value, daysLeft, hoursLeft, minutesLeft, secondsLeft,counterRunning);
    }else{
        changeText("No event to display.");
        days.textContent = 0;
        hours.textContent = 0;
        minutes.textContent = 0;
        seconds.textContent = 0;
        stopcountdown();
        if(!counterRunning){
            window.alert("Event is completed.");
            counterRunning=true;
        } 
    }
}

function startCountdown(){
    countdownInterval= setInterval(updatecountdown,1000);
}

function stopcountdown(countdownInterval){
    codeRunning=false;
    clearInterval(countdownInterval);
}



create.addEventListener('click',()=>{
    if(counterRunning){
        window.alert("Please reset the current event to add a new one.");
        return;
    }
    console.log("Clicked");
    if(boolprompt){
        prompt.style.display = 'flex';
    }else{
        prompt.style.display = 'none';
    }
    boolprompt = !boolprompt;
    changeornot=false;
});

save.addEventListener('click',()=>{
    console.log("Clicked");
    if(!boolprompt){
        prompt.style.display = 'none';
        boolprompt = !boolprompt;
        getText();
        startCountdown();
        counterRunning=true;
        if(changeornot){
            window.alert("Event has been changed.");
        }else{
            window.alert("Event countdown has started.");
        }
    }
});


reset.addEventListener('click',()=>{
    var paragraph = document.getElementById("name");
    paragraph.textContent = "Event has been reset. Add a new Event.";
    counterRunning=false;
    days.textContent = 0;
    hours.textContent = 0;
    minutes.textContent = 0;
    seconds.textContent = 0;
    stopcountdown(countdownInterval);
});

change.addEventListener('click',()=>{
    if(boolprompt){
        prompt.style.display = 'flex';
    }else{
        prompt.style.display = 'none';
    }
    boolprompt = !boolprompt;
    changeornot=true;
    stopcountdown(countdownInterval);
});

pause.addEventListener('click', ()=>{
    stopcountdown(countdownInterval);
});

resume.addEventListener('click', ()=>{
    startCountdown();
});

container.addEventListener('click',(e)=>{
    if(e.target.classList.contains('modal-input')){
    }else{
        prompt.style.display = 'none';
        boolprompt = true;
    }
});



function saveTimerData(eventDate, eventName, daysLeft, hoursLeft, minutesLeft, secondsLeft,counterRunning) {
    localStorage.setItem('eventDate', eventDate);
    localStorage.setItem('eventName', eventName);
    localStorage.setItem('daysLeft', daysLeft);
    localStorage.setItem('hoursLeft', hoursLeft);
    localStorage.setItem('minutesLeft', minutesLeft);
    localStorage.setItem('secondsLeft', secondsLeft);
    localStorage.setItem('counterRunning', counterRunning);
}

function loadTimerData() {

    var eventDate = new Date(localStorage.getItem('eventDate'));
    inputdate.value=eventDate.toISOString().split('T')[0];
    eventName = localStorage.getItem('eventName');
    document.getElementById('event').value = eventName ;
    var daysLeft = localStorage.getItem('daysLeft');
    var hoursLeft = localStorage.getItem('hoursLeft');
    var minutesLeft = localStorage.getItem('minutesLeft');
    var secondsLeft = localStorage.getItem('secondsLeft');
    var counterRunning = localStorage.getItem('counterRunning');
    
    console.log(eventDate);
    console.log(eventName + " " + daysLeft + " " + hoursLeft + " " + minutesLeft + " " +secondsLeft);
    var currentDate = new Date();
    var diff = eventDate.getTime() - currentDate.getTime();

    if(diff>0){
        if (eventName) {
            changeText(eventName);
        }
        if (daysLeft || hoursLeft || minutesLeft || secondsLeft) {
            days.textContent = daysLeft;
            hours.textContent = hoursLeft;
            minutes.textContent = minutesLeft;
            seconds.textContent = secondsLeft;
            
        }
        if (counterRunning) {
            startCountdown();
            counterRunning = true;
        } else {
            counterRunning = false;
            window.alert("Event is completed");
        }

    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadTimerData();
});






