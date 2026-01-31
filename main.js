let buttonSettings = document.getElementById("button_settings");
let containerTimer = document.getElementById("timer");
let textMin = document.getElementById("min");
let textSec = document.getElementById("sec");
let containerTrophies = document.getElementById("container_trophies");
let arrayTrophies = Array.from(document.getElementsByClassName("trophy"));
let textMotivation = document.getElementById("text_motivation");
let buttonStart = document.getElementById("button_start");

//récupération des éléments du DOM Settings

let containerSettings = document.getElementById("container_settings");

let arrowUpWorkMin = document.getElementById("arrow_up_work_min");
let arrowDownWorkMin = document.getElementById("arrow_down_work_min");
let arrowUpWorkSec = document.getElementById("arrow_up_work_sec");
let arrowDownWorkSec = document.getElementById("arrow_down_work_sec");

let inputWorkMin = document.getElementById("work_min");
let inputWorkSec = document.getElementById("work_sec");

let arrowUpShortMin = document.getElementById("arrow_up_short_min");
let arrowDownShortMin = document.getElementById("arrow_down_short_min");
let arrowUpShortSec = document.getElementById("arrow_up_short_sec");
let arrowDownShortSec = document.getElementById("arrow_down_short_sec");

let inputShortMin = document.getElementById("short_min");
let inputShortSec = document.getElementById("short_sec");

let arrowUpLongMin = document.getElementById("arrow_up_long_min");
let arrowDownLongMin = document.getElementById("arrow_down_long_min");
let arrowUpLongSec = document.getElementById("arrow_up_long_sec");
let arrowDownLongSec = document.getElementById("arrow_down_long_sec");

let inputLongMin = document.getElementById("long_min");
let inputLongSec = document.getElementById("long_sec");

let arrowUpCycles = document.getElementById("arrow_up_cycles");
let arrowDownCycles = document.getElementById("arrow_down_cycles");

let inputCycles= document.getElementById("cycles");

let buttonSaveSettings = document.getElementById("button_save_settings");
let buttonCancelSettings = document.getElementById("button_cancel_settings");

//récupération des éléments du DOM de la pop-up

let containerAvertissement = document.getElementById("container_avertissement");
let buttonDeleteTimer = document.getElementById("button_delete_timer");
let buttonKeepTimer = document.getElementById("button_keep_timer");

//gestion des settings

let DataSettings = [inputWorkMin.getAttribute("value"), inputWorkSec.getAttribute("value"), inputShortMin.getAttribute("value"), 
                    inputShortSec.getAttribute("value"), inputLongMin.getAttribute("value"), inputLongSec.getAttribute("value"), 
                    inputCycles.getAttribute("value")];

let objectDataSettings = {
    workMin: parseInt(DataSettings[0]),
    workSec: parseInt(DataSettings[1]),
    shortMin: parseInt(DataSettings[2]),
    shortSec: parseInt(DataSettings[3]),
    longMin: parseInt(DataSettings[4]),
    longSec: parseInt(DataSettings[5]),
    cycles: parseInt(DataSettings[6])
}

let arrayInputSettings = [inputWorkMin, inputWorkSec, inputShortMin, inputShortSec, inputLongMin, inputLongSec, inputCycles];

class InputNbSettings {
    constructor(input, arrow){
        this.input = input;
        this.arrow = arrow;
    }
}

let WorkMinUp = new InputNbSettings(inputWorkMin,arrowUpWorkMin);
let WorkSecUp = new InputNbSettings(inputWorkSec, arrowUpWorkSec);
let WorkMinDown = new InputNbSettings(inputWorkMin,arrowDownWorkMin);
let WorkSecDown = new InputNbSettings(inputWorkSec, arrowDownWorkSec);

let ShortMinUp = new InputNbSettings(inputShortMin,arrowUpShortMin);
let ShortSecUp = new InputNbSettings(inputShortSec, arrowUpShortSec);
let ShortMinDown = new InputNbSettings(inputShortMin,arrowDownShortMin);
let ShortSecDown = new InputNbSettings(inputShortSec, arrowDownShortSec);

let LongMinUp = new InputNbSettings(inputLongMin,arrowUpLongMin);
let LongSecUp = new InputNbSettings(inputLongSec, arrowUpLongSec);
let LongMinDown = new InputNbSettings(inputLongMin,arrowDownLongMin);
let LongSecDown = new InputNbSettings(inputLongSec, arrowDownLongSec);

let CycleUp = new InputNbSettings(inputCycles,arrowUpCycles);
let CycleDown = new InputNbSettings(inputCycles, arrowDownCycles);

let arrayUp = [WorkMinUp, WorkSecUp, ShortMinUp, ShortSecUp, LongMinUp, LongSecUp, CycleUp];
let arrayDown = [WorkMinDown, WorkSecDown, ShortMinDown, ShortSecDown, LongMinDown, LongSecDown, CycleDown];

let intervalID;
let timeoutID;

function arrowUp(elt){
    let value = parseInt(elt.getAttribute("value"));
    if(elt === inputWorkMin){
        if(inputWorkSec.getAttribute("value") > 0 && value == 54){
            value++;
            elt.setAttribute("value",value);
            inputWorkSec.setAttribute("value", "00");
        }else if(value < 55){
            value++;
            elt.setAttribute("value",value);
        }
    }else if(elt === inputShortMin){
        if(inputShortSec.getAttribute("value") > 0 && value == 9){
            value++;
            elt.setAttribute("value",value);
            inputShortSec.setAttribute("value", "00");
        }else if(value < 10){
            value++;
            elt.setAttribute("value", value);
        }
    }else if(elt === inputLongMin){
        if(inputLongSec.getAttribute("value") > 0 && value == 29){
            value++;
            elt.setAttribute("value",value);
            inputLongSec.setAttribute("value", "00");
        }else if(value < 30){
            value++;
            elt.setAttribute("value", value);
        }
    }else if(elt === inputCycles){
        if(value < 8){
            value++;
            elt.setAttribute("value", value);
        }
    }else if((elt === inputWorkSec && parseInt(inputWorkMin.getAttribute("value")) < 55) || (elt === inputShortSec && parseInt(inputShortMin.getAttribute("value")) < 10) || (elt === inputLongSec && parseInt(inputLongMin.getAttribute("value")) < 30)){
        if(value < 59){
            value++;
            elt.setAttribute("value", value);
        }
    }
    if(elt.getAttribute("value") < 10 && elt != inputCycles){
        let StringWithZero = "0"+value;
        elt.setAttribute("value", StringWithZero);
    }
}

function arrowDown(elt){
    let value = parseInt(elt.getAttribute("value"));
    if(elt === inputWorkMin){
        if(value > 25){
            value--;
            elt.setAttribute("value", value);
        }
    }else if(elt === inputShortMin){
        if(value > 5){
            value--;
            elt.setAttribute("value", value);
        }
    }else if(elt === inputLongMin){
        if(value > 15){
            value--;
            elt.setAttribute("value", value);
        }
    }else if(elt === inputCycles){
        if(value > 4){
            value--;
            elt.setAttribute("value", value);
        }
    }else if(elt === inputWorkSec || elt === inputShortSec || elt === inputLongSec){
        if(value > 0){
            value--;
            elt.setAttribute("value", value);
        }
    }
    if(elt.getAttribute("value") < 10 && elt != inputCycles){
        let StringWithZero = "0"+value;
        elt.setAttribute("value", StringWithZero);
    }
}

arrayUp.forEach(element => {

    let intervalID;
    let timeoutID;

    element.arrow.addEventListener("mousedown", function(e){
        e.preventDefault();
        arrowUp(element.input);
        timeoutID = setTimeout( () => {
            intervalID = setInterval(arrowUp, 100, element.input);
        }, 300);
    });

    element.arrow.addEventListener("mouseup", function(){
        clearTimeout(timeoutID);
        clearInterval(intervalID);
        timeoutID = null;
        intervalID = null;
    });

    element.arrow.addEventListener("mouseout", function(){
        clearTimeout(timeoutID);
        clearInterval(intervalID);
        timeoutID = null;
        intervalID = null;
    });

});

arrayDown.forEach(element => {

    let intervalID;
    let timeoutID;

    element.arrow.addEventListener("mousedown", function(e){
        e.preventDefault();
        arrowDown(element.input);
        timeoutID = setTimeout( () => {
            intervalID = setInterval(arrowDown, 100, element.input);
        }, 400);
    });

    element.arrow.addEventListener("mouseup", function(){
        clearTimeout(timeoutID);
        clearInterval(intervalID);
        timeoutID = null;
        intervalID = null;
    });

    element.arrow.addEventListener("mouseout", function(){
        clearTimeout(timeoutID);
        clearInterval(intervalID);
        timeoutID = null;
        intervalID = null;
    });

});

//timer

let startBoolean = false;
let finish = true;
let avertissementBoolean = true;
let active = 0;
let min = objectDataSettings.workMin;
let sec = objectDataSettings.workSec;
let count = objectDataSettings.cycles;
let intervalIDTimer;

function displayTimer(){
    let delay = 0;
    if(count == 0){
        delay = 400;
    }
        setTimeout(() => {
            if(min < 10){
                textMin.innerText = `0${min}`;
            }else{
                textMin.innerText = `${min}`;
            }
            if(sec < 10){
                textSec.innerText = `0${sec}`;
            }else{
                textSec.innerText = `${sec}`;
            }
        }, delay);
}

function displayCycles(){
    let totalCycles = objectDataSettings.cycles;
    let indexTrophy = totalCycles - count;
    if(indexTrophy == 0){
        arrayTrophies[indexTrophy].style.transform = "scale(1.1)";
    }else if(indexTrophy == totalCycles){
        arrayTrophies[indexTrophy-1].setAttribute("src", "icones/trophy.png");
        arrayTrophies[indexTrophy-1].style.transform = "scale(1)";
        setTimeout(() => {
            for(let i=0; i<arrayTrophies.length; i++){
                arrayTrophies[i].setAttribute("src", "icones/trophy_gris.png");
                arrayTrophies[i].style.transform = "scale(1)";

            }
        }, 400);
    }else{
        arrayTrophies[indexTrophy].style.transform = "scale(1.1)";
        arrayTrophies[indexTrophy - 1].setAttribute("src", "icones/trophy.png");
        arrayTrophies[indexTrophy - 1].style.transform = "scale(1)";
    }
}

function motivationText(){
    let newText;
    if(active == 0 && count != 0){
        newText = "WORK";
    }else if((active == 1 || active == 2) && count != 0){
        newText = "BREAK";
    }else{
        newText ="FOCUS";
    }
    textMotivation.style.opacity = "0";
    setTimeout(() => {
        textMotivation.innerText = newText;
        textMotivation.style.opacity = "1";
    }, 500);
}

function timer(){
        if(min == 0 && sec == 0){
            if(active == 0){
                count--;
                if(count == 0){
                    displayCycles();
                    displayTimer();
                    buttonStart.setAttribute("src", "icones/play.png");
                    finish = true;
                    startBoolean = false;
                    clearInterval(intervalIDTimer);
                    active = 0;
                    motivationText();
                    min = objectDataSettings.workMin;
                    sec = objectDataSettings.workSec;
                    count = objectDataSettings.cycles;
                }else{
                    if(count == (objectDataSettings.cycles-4)){
                        active = 2;
                        motivationText();
                        min = objectDataSettings.longMin;
                        sec = objectDataSettings.longSec;
                        displayTimer();
                        displayCycles();
                    }else{
                        active = 1;
                        motivationText();
                        min = objectDataSettings.shortMin;
                        sec = objectDataSettings.shortSec;
                        displayTimer();
                        displayCycles();
                    }
                }
            }else if(active == 1){
                active = 0;
                motivationText();
                sec = objectDataSettings.workSec;
                min = objectDataSettings.workMin;
                displayTimer();
            }else{
                active = 0;
                motivationText();
                min = objectDataSettings.workMin;
                sec = objectDataSettings.workSec;
                displayTimer();
            }
        }else{
            if(sec > 0){
                sec--;
                displayTimer();
            }else{
                min--;
                sec = 59;
                displayTimer();
            }
        }
}

function startTimer(){
    startBoolean = !startBoolean;
    if(finish){
            motivationText();
            finish = false;
    }
    if(startBoolean && avertissementBoolean){
        if(buttonStart.getAttribute("src") != "icones/pause.png"){
            buttonStart.setAttribute("src", "icones/pause.png");
        }
        if(objectDataSettings.cycles == count){
            displayCycles();
        }
        intervalIDTimer = setInterval( () => {
            timer();
        },1000);
    }else{
        if(buttonStart.getAttribute("src") != "icones/play.png"){
            buttonStart.setAttribute("src", "icones/play.png");
        }
        clearInterval(intervalIDTimer);
    }
}


buttonStart.addEventListener("click", function(){
    startTimer();
});

buttonSettings.addEventListener("click", function(){
    if(finish){
        containerSettings.style.display = "flex";
    }else{
        avertissementBoolean = false;
        startTimer();
        containerAvertissement.style.display = "flex";
    }
});

buttonKeepTimer.addEventListener("click", function(){
    startBoolean = false;
    avertissementBoolean = true;
    containerAvertissement.style.display = "none";
});

buttonDeleteTimer.addEventListener("click", function(){
    startBoolean = false;
    avertissementBoolean = true;
    finish = true;
    active = 0;
    min = objectDataSettings.workMin;
    sec = objectDataSettings.workSec;
    count = objectDataSettings.cycles;
    displayTimer();
    for(let i=0; i<arrayTrophies.length; i++){
        arrayTrophies[i].setAttribute("src", "icones/trophy_gris.png");
        arrayTrophies[i].style.transform = "scale(1)";
    }
    containerSettings.style.display = "flex";
    containerAvertissement.style.display = "none";
});


buttonCancelSettings.addEventListener("click", function(){
    for(let i=0; i<DataSettings.length; i++){
        arrayInputSettings[i].setAttribute("value", DataSettings[i]);
        if(arrayInputSettings[i].getAttribute("value") < 10){
            let StringWithZero = DataSettings[i];
            arrayInputSettings[i].setAttribute("value", StringWithZero);
        }
    }
    containerSettings.style.display = "none";
});

buttonSaveSettings.addEventListener("click", function(){
    for(let i=0; i<DataSettings.length; i++){
        DataSettings[i] = arrayInputSettings[i].getAttribute("value");
    }
    objectDataSettings.workMin = parseInt(DataSettings[0]);
    objectDataSettings.workSec = parseInt(DataSettings[1]);
    objectDataSettings.shortMin = parseInt(DataSettings[2]);
    objectDataSettings.shortSec = parseInt(DataSettings[3]);
    objectDataSettings.longMin = parseInt(DataSettings[4]);
    objectDataSettings.longSec = parseInt(DataSettings[5]);
    objectDataSettings.cycles = parseInt(DataSettings[6]);
    startBoolean = false;
    finish = true;
    avertissementBoolean = true;
    active = 0;
    min = objectDataSettings.workMin;
    sec = objectDataSettings.workSec;
    count = objectDataSettings.cycles;
    containerSettings.style.display = "none";
    displayTimer();
    let length = arrayTrophies.length;
    const targetGoal = parseInt(DataSettings[6]);
    const fragment = document.createDocumentFragment();
    if(targetGoal <= 4){
        for(let i=length; i>targetGoal; i--){
            arrayTrophies[i-1].remove();
            arrayTrophies.pop();
        }
    }else{
        for(let i=length; i<targetGoal; i++){
            let newTrophy = document.createElement("img");
            newTrophy.setAttribute("src", "icones/trophy_gris.png");
            newTrophy.setAttribute("width", "4%");
            newTrophy.setAttribute("class", "trophy");
            fragment.appendChild(newTrophy);
            arrayTrophies.push(newTrophy);
        }
        containerTrophies.appendChild(fragment);
    }
});