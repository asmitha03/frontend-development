let tasks = [];
let deletedTasks = [];
let editingIndex = null;
let currentSort = null;
 
function GetDate() {
    return new Date().toLocaleString();
}

function saveLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
    localStorage.setItem("currentSort", currentSort);

}

function loadFromLocalStorage() {
    const storedTasks = localStorage.getItem("tasks");
    const storedDeleted = localStorage.getItem("deletedTasks");
    const sortMode = localStorage.getItem("currentSort");

    if (storedTasks) tasks = JSON.parse(storedTasks);
    if (storedDeleted) deletedTasks = JSON.parse(storedDeleted);
    if (sortMode) currentSort = sortMode;

    searchTasks();
    renderDeleted();
}


function renderTasks(taskList = tasks) {
    const table = document.getElementById("taskTable");
    table.innerHTML = "";
    taskList.forEach((task) => {
        const index = tasks.indexOf(task);
        const row = document.createElement("tr");

        const starCell = document.createElement("td");
        const star = document.createElement("span");
        star.innerHTML = "★";
        star.className = "star" + (task.favorite ? "fav" : "");
        star.onclick = () => toggleFavorite(tasks.indexOf(task));
        starCell.appendChild(star);
        row.appendChild(starCell);

        const nameCell = document.createElement("td");
        nameCell.innerText = task.name;
        row.appendChild(nameCell);

        const dateCell = document.createElement("td");
        dateCell.innerText = task.date;
        row.appendChild(dateCell);

        const statusCell = document.createElement("td");
        statusCell.innerText = task.status;
        row.appendChild(statusCell);

        const actionCell = document.createElement("td");
        actionCell.innerHTML = `
        <button onclick="markStatus(${tasks.indexOf(task)}, 'Done')">✅</button>
        <button onclick="markStatus(${tasks.indexOf(task)}, 'Not Done')">❌</button>
        <button onclick="editTask(${tasks.indexOf(task)})">✏️</button>
        <button onclick="deleteTask(${tasks.indexOf(task)})">🗑️</button>
        `;
        row.appendChild(actionCell);

        table.appendChild(row);
});
}

function renderDeleted() {
    const table = document.getElementById("deletedTable");
    table.innerHTML = "";
    deletedTasks.forEach((task, index) =>{
        const row = document.createElement("tr");
        row.innerHTML = `
           <td>${task.name}</td>
           <td>${task.deletedAt}</td>
           <td><button onclick="restoreTask(${index})">🔄</button></td>
           `;
           table.appendChild(row);
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    const error = document.getElementById("error");
    const name = input.value.trim();

    if (!name) {
        error.innerText = "Please enter a task.";
        return;
    }

    if (tasks.some(task => task.name.toLowerCase() === name.toLowerCase())) {
        error.innerText = "Task already exists.";
        return;
    }
    
    tasks.push({
        name,
        date: GetDate(),
        status: "Pending",
        favorite: false
    });

    input.value = "";
    error.innerText = "";
   saveLocalStorage();
   searchTasks();
}

function editTask(index){
    document.getElementById("taskInput").value = tasks[index].name;
    editingIndex = index;
    document.getElementById("addBtn").classList.add("hidden");
    document.getElementById("updateBtn").classList.remove("hidden");
}

function updateTask(){
    const input = document.getElementById("taskInput");
    const newName = input.value.trim();
    const error =  document.getElementById("error");
    
    if (!newName){
        error.innerText = "Task name cannot be empty.";
        return;
    }

    if (tasks.some((task, i) => task.name.toLowerCase() === newName.toLowerCase() && i !== editingIndex)) {
        error.innerText = "Another task has already this name.";
        return;
    }

    tasks[editingIndex].name = newName;
    tasks[editingIndex].date = GetDate();

    input.value = "";
    editingIndex = null;
    error.innerText = "";

    document.getElementById("addBtn").classList.remove("hidden");
    document.getElementById("updateBtn").classList.add("hidden");

   saveLocalStorage();
   searchTasks();
}

function deleteTask(index)  {
    const removed = tasks.splice(index, 1)[0];
    removed.deletedAt = GetDate();
    deletedTasks.push(removed);
    saveLocalStorage();
    searchTasks();
    renderDeleted();
}

function restoreTask(index) {
    const restored = deletedTasks.splice(index, 1)[0];
    delete restored.deletedAt;
    tasks.push(restored);
    saveLocalStorage();
    searchTasks();
    renderDeleted();
}

function markStatus(index, status) {
    tasks[index].status = status;
    saveLocalStorage();
    searchTasks();
}

function toggleFavorite(index) {
    tasks[index].favorite = !tasks[index].favorite;
    saveLocalStorage();
    searchTasks();
}

function searchTasks() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    let filteredTasks = tasks.filter(task => 
        task.name.toLowerCase().includes(query)
    );

    if (currentSort === 'asc') {
        filteredTasks.sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    } else if (currentSort === "desc") {
        filteredTasks.sort((a,b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
    }

    renderTasks(filteredTasks);
}

function sortTasks(order) {
       currentSort = order;
       saveLocalStorage();
       searchTasks();
}

window.onload = loadFromLocalStorage;