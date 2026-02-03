import * as El from './modules/elements.js';
import { timerState, objectDataSettings, DataSettings } from './modules/store.js';
import * as UI from './modules/ui.js';
import { initSettingsListeners } from './modules/settings.js';

initSettingsListeners();

function timer(){
    if(timerState.min == 0 && timerState.sec == 0){
        if(timerState.active == 0){
            timerState.count--;
            if(timerState.count == 0){
                UI.displayCycles();
                UI.displayTimer();
                El.buttonStart.setAttribute("src", "icones/play.png");
                timerState.finish = true;
                timerState.startBoolean = false;
                clearInterval(timerState.intervalIDTimer);
                timerState.time = 0;
                timerState.active = 0;
                UI.motivationText();
                timerState.min = objectDataSettings.workMin;
                timerState.sec = objectDataSettings.workSec;
                timerState.count = objectDataSettings.cycles;
                UI.resetProgressBar();
            }else{
                if(timerState.count == (objectDataSettings.cycles-4)){
                    timerState.active = 2;
                    UI.motivationText();
                    timerState.min = objectDataSettings.longMin;
                    timerState.sec = objectDataSettings.longSec;
                    UI.resetProgressBar();
                    UI.displayTimer();
                    UI.displayCycles();
                }else{
                    timerState.active = 1;
                    UI.motivationText();
                    timerState.min = objectDataSettings.shortMin;
                    timerState.sec = objectDataSettings.shortSec;
                    UI.resetProgressBar();
                    UI.displayTimer();
                    UI.displayCycles();
                }
            }
        }else if(timerState.active == 1){
            timerState.active = 0;
            UI.motivationText();
            timerState.sec = objectDataSettings.workSec;
            timerState.min = objectDataSettings.workMin;
            UI.resetProgressBar();
            UI.displayTimer();
        }else{
            timerState.active = 0;
            UI.motivationText();
            timerState.min = objectDataSettings.workMin;
            timerState.sec = objectDataSettings.workSec;
            UI.resetProgressBar();
            UI.displayTimer();
        }
    }else{
        if(timerState.sec > 0){
            timerState.sec--;
            UI.displayTimer();
        }else{
            timerState.min--;
            timerState.sec = 59;
            UI.displayTimer();
        }
    }
}

function startTimer(){
    timerState.startBoolean = !timerState.startBoolean;
    if(timerState.finish){
            UI.motivationText();
            timerState.finish = false;
    }
    if(timerState.startBoolean && timerState.avertissementBoolean){
        if(El.buttonStart.getAttribute("src") != "icones/pause.png"){
            El.buttonStart.setAttribute("src", "icones/pause.png");
        }
        if(objectDataSettings.cycles == timerState.count){
            UI.displayCycles();
        }
        timerState.intervalIDTimer = setInterval( () => {
            if(timerState.time == 1000){
                timerState.time = 100;
                timer();
            }else{
                timerState.time += 100;
            }
            if((timerState.min != 0 || timerState.sec != 0) && !timerState.finish){
                UI.displayProgressBar();
            }
        },100);
    }else{
        if(El.buttonStart.getAttribute("src") != "icones/play.png"){
            El.buttonStart.setAttribute("src", "icones/play.png");
        }
        clearInterval(timerState.intervalIDTimer);
    }
}

El.buttonStart.addEventListener("click", function(){
    startTimer();
});

El.buttonSettings.addEventListener("click", function(){
    if(timerState.finish){
        El.containerSettings.style.display = "flex";
    }else{
        timerState.avertissementBoolean = false;
        startTimer();
        El.containerAvertissement.style.display = "flex";
    }
});

El.buttonKeepTimer.addEventListener("click", function(){
    timerState.startBoolean = false;
    timerState.avertissementBoolean = true;
    El.containerAvertissement.style.display = "none";
});

El.buttonDeleteTimer.addEventListener("click", function(){
    timerState.startBoolean = false;
    timerState.avertissementBoolean = true;
    timerState.finish = true;
    timerState.active = 0;
    timerState.min = objectDataSettings.workMin;
    timerState.sec = objectDataSettings.workSec;
    timerState.count = objectDataSettings.cycles;
    UI.resetProgressBar();
    UI.displayTimer();
    for(let i=0; i<El.arrayTrophies.length; i++){
        El.arrayTrophies[i].setAttribute("src", "icones/trophy_gris.png");
        El.arrayTrophies[i].style.transform = "scale(1)";
    }
    El.containerSettings.style.display = "flex";
    El.containerAvertissement.style.display = "none";
});

El.buttonCancelSettings.addEventListener("click", function(){
    for(let i=0; i<DataSettings.length; i++){
        El.arrayInputSettings[i].setAttribute("value", DataSettings[i]);
        if(El.arrayInputSettings[i].getAttribute("value") < 10){
            let StringWithZero = DataSettings[i];
            El.arrayInputSettings[i].setAttribute("value", StringWithZero);
        }
    }
    El.containerSettings.style.display = "none";
});

El.buttonSaveSettings.addEventListener("click", function(){
    for(let i=0; i<DataSettings.length; i++){
        DataSettings[i] = El.arrayInputSettings[i].getAttribute("value");
    }
    objectDataSettings.workMin = parseInt(DataSettings[0]);
    objectDataSettings.workSec = parseInt(DataSettings[1]);
    objectDataSettings.shortMin = parseInt(DataSettings[2]);
    objectDataSettings.shortSec = parseInt(DataSettings[3]);
    objectDataSettings.longMin = parseInt(DataSettings[4]);
    objectDataSettings.longSec = parseInt(DataSettings[5]);
    objectDataSettings.cycles = parseInt(DataSettings[6]);
    
    timerState.startBoolean = false;
    timerState.finish = true;
    timerState.avertissementBoolean = true;
    timerState.active = 0;
    timerState.min = objectDataSettings.workMin;
    timerState.sec = objectDataSettings.workSec;
    timerState.count = objectDataSettings.cycles;
    
    UI.resetProgressBar();
    El.containerSettings.style.display = "none";
    UI.displayTimer();
    
    let length = El.arrayTrophies.length;
    const targetGoal = parseInt(DataSettings[6]);
    const fragment = document.createDocumentFragment();
    if(targetGoal <= 4){
        for(let i=length; i>targetGoal; i--){
            El.arrayTrophies[i-1].remove();
            El.arrayTrophies.pop();
        }
    }else{
        for(let i=length; i<targetGoal; i++){
            let newTrophy = document.createElement("img");
            newTrophy.setAttribute("src", "icones/trophy_gris.png");
            newTrophy.setAttribute("width", "4%");
            newTrophy.setAttribute("class", "trophy");
            fragment.appendChild(newTrophy);
            El.arrayTrophies.push(newTrophy);
        }
        El.containerTrophies.appendChild(fragment);
    }
});