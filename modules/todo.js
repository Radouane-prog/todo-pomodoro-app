import * as El from './elements.js';

class Task {
    constructor(id, name, description, priority, element, btnDelete, btnModify, checkbox){
        this.id = id,
        this.name = name,
        this.description = description,
        this.priority = priority,
        this.element = element,
        this.btnDelete = btnDelete,
        this.btnModify = btnModify,
        this.checkbox = checkbox
    }
}

class TaskSimplify {
    constructor(id,name,description,priority,completed){
        this.id = id,
        this.name = name,
        this.description = description,
        this.priority = priority,
        this.completed = completed
    }
}

let tasks = [];
let creatingBoolean = false;
let currentId;

function simplifyTasks(tasks){
    let tasksSimplify = [];
    for(let i=0; i<tasks.length; i++){
        tasksSimplify[i] = new TaskSimplify();
        tasksSimplify[i].id = tasks[i].id;
        tasksSimplify[i].name = tasks[i].name.textContent;
        tasksSimplify[i].description = tasks[i].description.textContent;
        tasksSimplify[i].priority = tasks[i].priority;
        if(tasks[i].checkbox.checked){
            tasksSimplify[i].completed = true;
        }else{
            tasksSimplify[i].completed = false;
        }
    }
    return tasksSimplify;
}

function resetContainerCreateTask(){
    El.inputTitle.value = "";
    El.inputDescription.value = "";
    El.buttonSaveTask.textContent = "Add";
    for(let i=0; i<El.arrayPriority.length; i++){
        El.arrayPriority[i].style.transform = "";
    }
}

function IsTasksEmpty(){
    if(tasks.length == 0){
        El.containerTasks.style.display = "";
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
    localStorage.setItem("tasks", JSON.stringify(simplifyTasks(tasks)));
    
}

function findById(id){
    for(let i=0; i<tasks.length; i++){
        if(tasks[i].id == id){
            return tasks[i];
        }
    }
}

function DeleteTask(){
    let task = findById(currentId);
    task.element.remove();
    tasks.splice(tasks.indexOf(task), 1);
    localStorage.setItem("tasks", JSON.stringify(simplifyTasks(tasks)));
}

function initEventsTask(task){

    task.btnDelete.addEventListener("click", () => {
        currentId = task.id;
        if(El.containerCreateTask.style.display == ""){
            DeleteTask();
            IsTasksEmpty();
        }
    });

    task.btnModify.addEventListener("click", () => {
        currentId = task.id;
        El.containerCreateTask.style.display = "flex";
        El.inputTitle.value = task.name.textContent;
        El.inputDescription.value = task.description.textContent;
        if(task.priority == 0){
            El.arrayPriority[0].style.transform = "scale(1.1)";
        }else if(task.priority == 1){
            El.arrayPriority[1].style.transform = "scale(1.1)";
        }else if(task.priority == 2){
            El.arrayPriority[2].style.transform = "scale(1.1)";
        }else{
            El.arrayPriority[3].style.transform = "scale(1.1)";
        }
        El.buttonSaveTask.textContent = "Modify";
    });

    task.checkbox.addEventListener("change", (e) => {
        localStorage.setItem("tasks", JSON.stringify(simplifyTasks(tasks)));
    });
}

function modifyTask(){
    let task = findById(currentId);
    if(El.inputTitle.value.trim() != ""){
        task.name.textContent = El.inputTitle.value;
        task.description.textContent = El.inputDescription.value;
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
            task.element.style.borderColor = "gray";
        }
        localStorage.setItem("tasks", JSON.stringify(simplifyTasks(tasks)));
    }else{
        DeleteTask();
    }
}

function initData(){

    let tasksSimplify = [];

    if(localStorage.getItem("tasks") != null && JSON.parse(localStorage.getItem("tasks")).length > 0){

        tasksSimplify = JSON.parse(localStorage.getItem("tasks"));
        let fragment = document.createDocumentFragment();

        for(let i=0; i<tasksSimplify.length; i++){
    
            tasks[i] = new Task();
            tasks[i].id = tasksSimplify[i].id; 

            let containerColumnUn, containerColumnDeux;

            tasks[i].element = document.createElement("div");
            tasks[i].element.setAttribute("class", "task");

            if(tasksSimplify[i].priority == 0){
                tasks[i].priority = 0;
                tasks[i].element.style.borderColor = "red";
            }else if(tasksSimplify[i].priority == 1){
                tasks[i].priority = 2;
                tasks[i].element.style.borderColor = "rgb(235, 137, 0)";
            }else if(tasksSimplify[i].priority == 2){
                tasks[i].priority = 2;
                tasks[i].element.style.borderColor = "rgb(39, 113, 224)";
            }else{
                tasks[i].priority = 3;
                tasks[i].element.style.borderColor = "gray";
            }
        
            tasks[i].checkbox = document.createElement("input");
            tasks[i].checkbox.setAttribute("type", "checkbox");
            if(tasksSimplify[i].completed){
                tasks[i].checkbox.checked = true;
            }
        
            containerColumnUn = document.createElement("div");
            containerColumnUn.setAttribute("class", "container_column_text");
        
            containerColumnDeux = document.createElement("div");
            containerColumnDeux.setAttribute("class", "container_column");
        
            tasks[i].name = document.createElement("h3");
            tasks[i].name.setAttribute("class", "title_task");
            tasks[i].name.textContent = tasksSimplify[i].name;
            
            tasks[i].description = document.createElement("p");
            tasks[i].description.setAttribute("class", "description_task");
            tasks[i].description.textContent = tasksSimplify[i].description;
            
            tasks[i].btnDelete = document.createElement("img");
            tasks[i].btnDelete.setAttribute("src", "../icones/bin.png");
            tasks[i].btnDelete.setAttribute("alt", "icone delete the task");
            tasks[i].btnDelete.setAttribute("width", "25px");
            tasks[i].btnDelete.setAttribute("class", "margin_btn");

            tasks[i].btnModify = document.createElement("img");
            tasks[i].btnModify.setAttribute("src", "../icones/pen.png");
            tasks[i].btnModify.setAttribute("alt", "icone modify the task");
            tasks[i].btnModify.setAttribute("width", "25px");
            tasks[i].btnModify.setAttribute("class", "margin_btn");
        
            containerColumnUn.appendChild(tasks[i].name);
            containerColumnUn.appendChild(tasks[i].description);
            containerColumnDeux.appendChild(tasks[i].btnDelete);
            containerColumnDeux.appendChild(tasks[i].btnModify);
            tasks[i].element.appendChild(tasks[i].checkbox);
            tasks[i].element.appendChild(containerColumnUn);
            tasks[i].element.appendChild(containerColumnDeux);
            initEventsTask(tasks[i]);

            fragment.appendChild(tasks[i].element);

        }
        El.containerTasks.appendChild(fragment);
        El.containerTasks.style.display = "flex";
        El.buttonDeleteAllTasks.style.display = "flex";
        El.arrayDefaultTodoPage.forEach(element => {
            element.style.display = "none";
        });
    }
}

export function initTodo(){

    resetContainerCreateTask();
    initData();

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
        El.containerCreateTask.style.display = "";
    });

    El.buttonSaveTask.addEventListener("click", () => {
        if(creatingBoolean){
            if(El.inputTitle.value.trim() != ""){
                let fragment = document.createDocumentFragment();
                createTask();
                initEventsTask(tasks[tasks.length-1]);
                fragment.appendChild(tasks[tasks.length-1].element);
                El.containerTasks.appendChild(fragment);
            }
        }else{
            modifyTask();
        }
        creatingBoolean = false;
        El.containerCreateTask.style.display = "";
        IsTasksEmpty();
        resetContainerCreateTask();
    });

    El.buttonDeleteAllTasks.addEventListener("click", () => {
        if(El.containerCreateTask.style.display == ""){
            console.log("tab", tasks);
             for(let i=tasks.length-1; i>=0; i--){
                if(tasks[i].checkbox.checked){
                    tasks[i].element.remove();
                    tasks.splice(i, 1);
                }
            }
            localStorage.setItem("tasks", JSON.stringify(simplifyTasks(tasks)));
            IsTasksEmpty();
        }
        console.log(El.containerCreateTask.style.display);
    });
}

