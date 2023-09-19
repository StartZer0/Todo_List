document.addEventListener("DOMContentLoaded", loadTasks);
document.getElementById("add-task").addEventListener("click", addTask);
document.getElementById("task-list").addEventListener("click", taskAction);
document.getElementById("task-filter").addEventListener("change", filterTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => displayTask(task));
}

function addTask(e) {
    e.preventDefault();
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();
    if (taskText === "") return;
    displayTask(taskText);
    saveTask(taskText);
    taskInput.value = "";
}

function displayTask(taskText) {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.textContent = taskText;
    taskDiv.appendChild(taskItem);
    const doneBtn = document.createElement("button");
    doneBtn.className = "done-btn";
    doneBtn.innerHTML = "Done";
    taskDiv.appendChild(doneBtn);
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "Delete";
    taskDiv.appendChild(deleteBtn);
    document.getElementById("task-list").appendChild(taskDiv);
}

function taskAction(e) {
    const target = e.target;
    if (target.className === "delete-btn") {
        removeTask(target.parentElement);
    } else if (target.className === "done-btn") {
        target.parentElement.classList.toggle("completed");
    }
}

function filterTasks(e) {
    const tasks = document.querySelectorAll(".task");
    tasks.forEach(task => {
        switch(e.target.value) {
            case "all":
                task.style.display = "block";
                break;
            case "done":
                task.classList.contains("completed") ? task.style.display = "block" : task.style.display = "none";
                break;
            case "not-done":
                task.classList.contains("completed") ? task.style.display = "none" : task.style.display = "block";
                break;
        }
    });
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(taskDiv) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const taskIndex = tasks.indexOf(taskDiv.querySelector(".task-item").textContent);
    tasks.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskDiv.remove();
}
