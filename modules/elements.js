export let buttonSettings = document.getElementById("button_settings");
export let containerTimer = document.getElementById("timer");
export let textMin = document.getElementById("min");
export let textSec = document.getElementById("sec");
export let containerTrophies = document.getElementById("container_trophies");
export let arrayTrophies = Array.from(document.getElementsByClassName("trophy"));
export let textMotivation = document.getElementById("text_motivation");
export let buttonStart = document.getElementById("button_start");

// Settings DOM
export let containerSettings = document.getElementById("container_settings");

export let arrowUpWorkMin = document.getElementById("arrow_up_work_min");
export let arrowDownWorkMin = document.getElementById("arrow_down_work_min");
export let arrowUpWorkSec = document.getElementById("arrow_up_work_sec");
export let arrowDownWorkSec = document.getElementById("arrow_down_work_sec");

export let inputWorkMin = document.getElementById("work_min");
export let inputWorkSec = document.getElementById("work_sec");

export let arrowUpShortMin = document.getElementById("arrow_up_short_min");
export let arrowDownShortMin = document.getElementById("arrow_down_short_min");
export let arrowUpShortSec = document.getElementById("arrow_up_short_sec");
export let arrowDownShortSec = document.getElementById("arrow_down_short_sec");

export let inputShortMin = document.getElementById("short_min");
export let inputShortSec = document.getElementById("short_sec");

export let arrowUpLongMin = document.getElementById("arrow_up_long_min");
export let arrowDownLongMin = document.getElementById("arrow_down_long_min");
export let arrowUpLongSec = document.getElementById("arrow_up_long_sec");
export let arrowDownLongSec = document.getElementById("arrow_down_long_sec");

export let inputLongMin = document.getElementById("long_min");
export let inputLongSec = document.getElementById("long_sec");

export let arrowUpCycles = document.getElementById("arrow_up_cycles");
export let arrowDownCycles = document.getElementById("arrow_down_cycles");

export let inputCycles= document.getElementById("cycles");

export let buttonSaveSettings = document.getElementById("button_save_settings");
export let buttonCancelSettings = document.getElementById("button_cancel_settings");

export let arrayInputSettings = [inputWorkMin, inputWorkSec, inputShortMin, inputShortSec, inputLongMin, inputLongSec, inputCycles];

// Pop-up DOM
export let containerAvertissement = document.getElementById("container_avertissement");
export let buttonDeleteTimer = document.getElementById("button_delete_timer");
export let buttonKeepTimer = document.getElementById("button_keep_timer");

// Progress Bar DOM
export let progressBar = document.getElementById("progress_bar");

//to-do-list
export let buttonAddTask = document.getElementById("button_add_task");
export let arrayDefaultTodoPage = Array.from(document.getElementsByClassName("default_to_do_page"));
export let containerCreateTask = document.getElementById("container_create_task");
export let inputTitle = document.getElementById("input_title");
export let inputDescription = document.getElementById("input_description");
export let arrayPriority = Array.from(document.getElementsByClassName("priority"));
export let buttonSaveTask = document.getElementById("button_save_task");
export let buttonCancelTask = document.getElementById("button_cancel_task");
export let buttonDeleteAllTasks = document.getElementById("btn_delete_all_tasks");
export let containerTasks = document.getElementById("container_tasks");
