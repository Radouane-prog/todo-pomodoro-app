import * as El from './elements.js';

class Task {
    constructor(id, name, description, priority, completed, element, btnDelete, btnModify, checkbox){
        this.id = id,
        this.name = name,
        this.description = description,
        this.priority = priority,
        this.completed = completed,
        this.element = element,
        this.btnDelete = btnDelete,
        this.btnModify = btnModify,
        this.checkbox = checkbox
    }
}

let tasks = [];
let creatingBoolean = false;

function resetContainerCreateTask(){
    El.inputTitle.value = "";
    El.inputDescription.value = "";
    for(let i=0; i<El.arrayPriority.length; i++){
        El.arrayPriority[i].style.transform = "";
    }
}

function IsTasksEmpty(){
    if(tasks.length == 0){
        El.containerTasks.style.display = "none";
        El.buttonDeleteAllTasks.style.display = "none";
        El.arrayDefaultTodoPage.forEach(element => {
            element.style.display = "flex";
        });
    }else{
        if(El.containerTasks.style.display != "flex" || El.buttonDeleteAllTasks.style.display != "flex"){
            El.containerTasks.style.display = "flex";
            El.buttonDeleteAllTasks.style.display = "flex";
            El.arrayDefaultTodoPage.forEach(element => {
                element.style.display = "none";
            });
        }
    }
}

function createTask(){

    let task = new Task();
    task.id = Date.now();
    let name = El.inputTitle.value;
    let description = El.inputDescription.value;
    task.completed = false;
    let containerColumnUn, containerColumnDeux;

    task.element = document.createElement("div");
    task.element.setAttribute("class", "task");

    if(El.arrayPriority[0].style.transform == "scale(1.1)"){
        task.priority = 0;
        task.element.style.borderColor = "red";
    }else if(El.arrayPriority[1].style.transform == "scale(1.1)"){
        task.priority = 1;
        task.element.style.borderColor = "rgb(235, 137, 0)";
    }else if(El.arrayPriority[2].style.transform == "scale(1.1)"){
        task.priority = 2;
        task.element.style.borderColor = "rgb(39, 113, 224)";
    }else{
        task.priority = 3;
    }

    task.checkbox = document.createElement("input");
    task.checkbox.setAttribute("type", "checkbox");

    containerColumnUn = document.createElement("div");
    containerColumnUn.setAttribute("class", "container_column_text");

    containerColumnDeux = document.createElement("div");
    containerColumnDeux.setAttribute("class", "container_column");

    task.name = document.createElement("h3");
    task.name.setAttribute("class", "title_task");
    task.name.textContent = name;

    task.description = document.createElement("p");
    task.description.setAttribute("class", "description_task");
    task.description.textContent = description;

    task.btnDelete = document.createElement("img");
    task.btnDelete.setAttribute("src", "../icones/bin.png");
    task.btnDelete.setAttribute("alt", "icone delete the task");
    task.btnDelete.setAttribute("width", "25px");
    task.btnDelete.setAttribute("class", "margin_btn");

    task.btnModify = document.createElement("img");
    task.btnModify.setAttribute("src", "../icones/pen.png");
    task.btnModify.setAttribute("alt", "icone modify the task");
    task.btnModify.setAttribute("width", "25px");
    task.btnModify.setAttribute("class", "margin_btn");

    containerColumnUn.appendChild(task.name);
    containerColumnUn.appendChild(task.description);
    containerColumnDeux.appendChild(task.btnDelete);
    containerColumnDeux.appendChild(task.btnModify);
    task.element.appendChild(task.checkbox);
    task.element.appendChild(containerColumnUn);
    task.element.appendChild(containerColumnDeux);

    tasks.push(task);
    
}

export function initTodo(){

    El.buttonAddTask.addEventListener("click", () => {
        creatingBoolean = true;
        El.containerCreateTask.style.display = "flex";
    });

    El.arrayPriority.forEach(element => {
        element.addEventListener("click", () => {
            for(let i=0; i<El.arrayPriority.length; i++){
            El.arrayPriority[i].style.transform = "";
            }
            element.style.transform = "scale(1.1)";
        });
    });

    El.buttonCancelTask.addEventListener("click", () => {
        resetContainerCreateTask();
        creatingBoolean = false;
        El.containerCreateTask.style.display = "none";
    });

    El.buttonSaveTask.addEventListener("click", () => {
        if(creatingBoolean){
            if(El.inputTitle.value.trim() != ""){
                let fragment = document.createDocumentFragment();
                createTask();
                console.log(tasks[tasks.length-1]);
                fragment.appendChild(tasks[tasks.length-1].element);
                El.containerTasks.appendChild(fragment);
            }
        }else{
            //fonction modifyTask();
        }
        creatingBoolean = false;
        El.containerCreateTask.style.display = "none";
        IsTasksEmpty();
        resetContainerCreateTask();
    });
}

