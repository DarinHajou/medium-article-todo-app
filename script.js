document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    taskForm.addEventListener('submit', addTask);
    displayTasks();
});

function addTask(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    
    const task = {
        title,
        date,
        description,
        id: Date.now()  // Unique identifier for each task
    };
    
    addTaskToDOM(task);
    saveTaskToLocalStorage(task);
    
    document.getElementById('task-form').reset();
}

function addTaskToDOM(task) {
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    taskItem.setAttribute('data-id', task.id);
    
    taskItem.innerHTML = `
        <div class="task-details">
            <h3>${task.title}</h3>
            <p>${task.date}</p>
            <p>${task.description}</p>
        </div>
        <div class="task-actions">
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        </div>
    `;
    
    taskList.appendChild(taskItem);
}

function saveTaskToLocalStorage(task) {
    let tasks = localStorage.getItem('tasks');
    tasks = tasks ? JSON.parse(tasks) : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTasks() {
    let tasks = localStorage.getItem('tasks');
    tasks = tasks ? JSON.parse(tasks) : [];
    
    tasks.forEach(task => addTaskToDOM(task));
}

function editTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks.find(task => task.id === id);
    
    document.getElementById('title').value = task.title;
    document.getElementById('date').value = task.date;
    document.getElementById('description').value = task.description;
    
    deleteTask(id);
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    const taskItem = document.querySelector(`[data-id="${id}"]`);
    taskItem.remove();
}
