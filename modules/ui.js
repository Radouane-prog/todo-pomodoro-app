import * as El from './elements.js';
import { timerState, objectDataSettings } from './store.js';

const radius = El.progressBar.r.baseVal.value;
const circumference = 2*Math.PI*radius;
El.progressBar.style.strokeDasharray = `${circumference} ${circumference}`;
El.progressBar.style.strokeDashoffset = 0;

let sizeOfTenthOfSec = circumference/((timerState.min*60 + timerState.sec)*10);
let offset = 0;

export function displayProgressBar(){
    if(timerState.min == 0 && timerState.sec == 0){
        resetProgressBar();
    }else{
        offset += sizeOfTenthOfSec;
        El.progressBar.style.strokeDashoffset = offset;
    }
}

export function resetProgressBar(){
    El.progressBar.style.transitionDuration = "0s";
    El.progressBar.style.strokeDasharray = `${circumference} ${circumference}`;
    El.progressBar.style.strokeDashoffset = 0;
    El.progressBar.getBoundingClientRect();
    sizeOfTenthOfSec = circumference/((timerState.min*60 + timerState.sec)*10);
    offset = 0;
    El.progressBar.style.transitionDuration = "0.35s";
}

export function displayTimer(){
    let delay = 0;
    if(timerState.count == 0){
        delay = 400;
    }
    setTimeout(() => {
        if(timerState.min < 10){
            El.textMin.innerText = `0${timerState.min}`;
        }else{
            El.textMin.innerText = `${timerState.min}`;
        }
        if(timerState.sec < 10){
            El.textSec.innerText = `0${timerState.sec}`;
        }else{
            El.textSec.innerText = `${timerState.sec}`;
        }
    }, delay);
}

export function displayCycles(){
    let totalCycles = objectDataSettings.cycles;
    let indexTrophy = totalCycles - timerState.count;
    if(indexTrophy == 0){
        El.arrayTrophies[indexTrophy].style.transform = "scale(1.1)";
    }else if(indexTrophy == totalCycles){
        El.arrayTrophies[indexTrophy-1].setAttribute("src", "icones/trophy.png");
        El.arrayTrophies[indexTrophy-1].style.transform = "scale(1)";
        setTimeout(() => {
            for(let i=0; i<El.arrayTrophies.length; i++){
                El.arrayTrophies[i].setAttribute("src", "icones/trophy_gris.png");
                El.arrayTrophies[i].style.transform = "scale(1)";

            }
        }, 400);
    }else{
        El.arrayTrophies[indexTrophy].style.transform = "scale(1.1)";
        El.arrayTrophies[indexTrophy - 1].setAttribute("src", "icones/trophy.png");
        El.arrayTrophies[indexTrophy - 1].style.transform = "scale(1)";
    }
}

export function motivationText(){
    let newText;
    if(timerState.active == 0 && timerState.count != 0){
        newText = "WORK";
    }else if((timerState.active == 1 || timerState.active == 2) && timerState.count != 0){
        newText = "BREAK";
    }else{
        newText ="FOCUS";
    }
    El.textMotivation.style.opacity = "0";
    setTimeout(() => {
        El.textMotivation.innerText = newText;
        El.textMotivation.style.opacity = "1";
    }, 500);
}