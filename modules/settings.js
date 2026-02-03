import * as El from './elements.js';

class InputNbSettings {
    constructor(input, arrow){
        this.input = input;
        this.arrow = arrow;
    }
}

let WorkMinUp = new InputNbSettings(El.inputWorkMin, El.arrowUpWorkMin);
let WorkSecUp = new InputNbSettings(El.inputWorkSec, El.arrowUpWorkSec);
let WorkMinDown = new InputNbSettings(El.inputWorkMin, El.arrowDownWorkMin);
let WorkSecDown = new InputNbSettings(El.inputWorkSec, El.arrowDownWorkSec);

let ShortMinUp = new InputNbSettings(El.inputShortMin, El.arrowUpShortMin);
let ShortSecUp = new InputNbSettings(El.inputShortSec, El.arrowUpShortSec);
let ShortMinDown = new InputNbSettings(El.inputShortMin, El.arrowDownShortMin);
let ShortSecDown = new InputNbSettings(El.inputShortSec, El.arrowDownShortSec);

let LongMinUp = new InputNbSettings(El.inputLongMin, El.arrowUpLongMin);
let LongSecUp = new InputNbSettings(El.inputLongSec, El.arrowUpLongSec);
let LongMinDown = new InputNbSettings(El.inputLongMin, El.arrowDownLongMin);
let LongSecDown = new InputNbSettings(El.inputLongSec, El.arrowDownLongSec);

let CycleUp = new InputNbSettings(El.inputCycles, El.arrowUpCycles);
let CycleDown = new InputNbSettings(El.inputCycles, El.arrowDownCycles);

let arrayUp = [WorkMinUp, WorkSecUp, ShortMinUp, ShortSecUp, LongMinUp, LongSecUp, CycleUp];
let arrayDown = [WorkMinDown, WorkSecDown, ShortMinDown, ShortSecDown, LongMinDown, LongSecDown, CycleDown];

function arrowUp(elt){
    let value = parseInt(elt.getAttribute("value"));
    if(elt === El.inputWorkMin){
        if(El.inputWorkSec.getAttribute("value") > 0 && value == 54){
            value++;
            elt.setAttribute("value",value);
            El.inputWorkSec.setAttribute("value", "00");
        }else if(value < 55){
            value++;
            elt.setAttribute("value",value);
        }
    }else if(elt === El.inputShortMin){
        if(El.inputShortSec.getAttribute("value") > 0 && value == 9){
            value++;
            elt.setAttribute("value",value);
            El.inputShortSec.setAttribute("value", "00");
        }else if(value < 10){
            value++;
            elt.setAttribute("value", value);
        }
    }else if(elt === El.inputLongMin){
        if(El.inputLongSec.getAttribute("value") > 0 && value == 29){
            value++;
            elt.setAttribute("value",value);
            El.inputLongSec.setAttribute("value", "00");
        }else if(value < 30){
            value++;
            elt.setAttribute("value", value);
        }
    }else if(elt === El.inputCycles){
        if(value < 8){
            value++;
            elt.setAttribute("value", value);
        }
    }else if((elt === El.inputWorkSec && parseInt(El.inputWorkMin.getAttribute("value")) < 55) || (elt === El.inputShortSec && parseInt(El.inputShortMin.getAttribute("value")) < 10) || (elt === El.inputLongSec && parseInt(El.inputLongMin.getAttribute("value")) < 30)){
        if(value < 59){
            value++;
            elt.setAttribute("value", value);
        }
    }
    if(elt.getAttribute("value") < 10 && elt != El.inputCycles){
        let StringWithZero = "0"+value;
        elt.setAttribute("value", StringWithZero);
    }
}

function arrowDown(elt){
    let value = parseInt(elt.getAttribute("value"));
    if(elt === El.inputWorkMin){
        if(value > 25){
            value--;
            elt.setAttribute("value", value);
        }
    }else if(elt === El.inputShortMin){
        if(value > 5){
            value--;
            elt.setAttribute("value", value);
        }
    }else if(elt === El.inputLongMin){
        if(value > 15){
            value--;
            elt.setAttribute("value", value);
        }
    }else if(elt === El.inputCycles){
        if(value > 4){
            value--;
            elt.setAttribute("value", value);
        }
    }else if(elt === El.inputWorkSec || elt === El.inputShortSec || elt === El.inputLongSec){
        if(value > 0){
            value--;
            elt.setAttribute("value", value);
        }
    }
    if(elt.getAttribute("value") < 10 && elt != El.inputCycles){
        let StringWithZero = "0"+value;
        elt.setAttribute("value", StringWithZero);
    }
}

export function initSettingsListeners() {
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
}