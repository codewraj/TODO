document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();
    if (taskName === '') return;

    // Create new task element
    const taskItem = document.createElement('li');
    
    taskItem.innerHTML = `
        <span class="task-name">${taskName}</span>
        <div class="edit-delete">
            <button onclick="editTask(this)">✏️</button>
            <button onclick="deleteTask(this)">🗑️</button>
        </div>
    `;

    // Add click event to toggle completion status
    taskItem.addEventListener('click', function () {
        this.querySelector('.task-name').classList.toggle('completed');
        updateTaskSummary();
    });

    // Append task item to the list
    document.getElementById('taskList').appendChild(taskItem);

    // Clear input field after adding task
    taskInput.value = '';

    // Update task summary
    updateTaskSummary();
}

function deleteTask(button) {
    // Remove the task item
    button.parentElement.parentElement.remove();
    updateTaskSummary();
}

function editTask(button) {
    // Get the current task and prompt for a new task name
    const taskItem = button.parentElement.previousElementSibling;
    const newTask = prompt("Edit task:", taskItem.innerText);
    if (newTask) {
        taskItem.innerText = newTask;
    }
}

function updateTaskSummary() {
    const totalTasks = document.querySelectorAll('#taskList li').length;
    const completedTasks = document.querySelectorAll('#taskList li .task-name.completed').length;
    const taskSummary = `${completedTasks}/${totalTasks}`;

    // Update the task summary circle
    document.querySelector('.summary-circle h2').innerText = taskSummary;
}
