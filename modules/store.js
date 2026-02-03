import { inputWorkMin, inputWorkSec, inputShortMin, inputShortSec, inputLongMin, inputLongSec, inputCycles } from './elements.js';

export let DataSettings = [inputWorkMin.getAttribute("value"), inputWorkSec.getAttribute("value"), inputShortMin.getAttribute("value"), 
                    inputShortSec.getAttribute("value"), inputLongMin.getAttribute("value"), inputLongSec.getAttribute("value"), 
                    inputCycles.getAttribute("value")];

export let objectDataSettings = {
    workMin: parseInt(DataSettings[0]),
    workSec: parseInt(DataSettings[1]),
    shortMin: parseInt(DataSettings[2]),
    shortSec: parseInt(DataSettings[3]),
    longMin: parseInt(DataSettings[4]),
    longSec: parseInt(DataSettings[5]),
    cycles: parseInt(DataSettings[6])
}

export let timerState = {
    startBoolean: false,
    finish: true,
    avertissementBoolean: true,
    active: 0,
    min: objectDataSettings.workMin,
    sec: objectDataSettings.workSec,
    count: objectDataSettings.cycles,
    intervalIDTimer: null,
    time: 0
};