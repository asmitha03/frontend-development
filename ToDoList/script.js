let tasks = [];
let deletedTasks = [];
let editingIndex = null;
 
function GetDate() {
    return new Date().toLocaleString();
}

function renderTasks() {
    const table = document.getElementById("taskTable");
    table.innerHTML = "";
    tasks.forEach((task, index) => {
        const row = document.createElement("tr");

        const starCell = document.createElement("td");
        const star = document.createElement("span");
        star.innerHTML = "★";
        star.className = "star" + (task.favorite ? "fav" : "");
        star.onclick = () => toggleFavorite(index);
        starCell.appendChild(star);
        row.appendChild(starCell);

        row.innerHTML += `
        <td>${task.name}</td>
        <td>${task.date}</td>
        <td>${task.status}</td>
        `;

        const actionCell = document.createElement("td");
        actionCell.innerHTML = `
        <button onclick="markStatus(${index}, 'Done')">✅</button>
        <button onclick="markStatus(${index}, 'Not Done')">❌</button>
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">🗑️</button>
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
    renderTasks();
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

    renderTasks();
}

function deleteTask(index)  {
    const removed = tasks.splice(index, 1)[0];
    removed.deletedAt = GetDate();
    deletedTasks.push(removed);
    renderTasks();
    renderDeleted();
}

function restoreTask(index) {
    const restored = deletedTasks.splice(index, 1)[0];
    delete restored.deletedAt;
    tasks.push(restored);
    renderTasks();
    renderDeleted();
}

function markStatus(index, status) {
    tasks[index].status = status;
    renderTasks();
}

function toggleFavorite(index) {
    tasks[index].favorite = !tasks[index].favorite;
    renderTasks();
}

function searchTasks() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#taskTable tr");

    rows.forEach(row => {
        const taskName = row.children[1]?.innerText.toLowerCase() || "";
        row.style.display = taskName.includes(query) ? "" : "none";

    });
}




