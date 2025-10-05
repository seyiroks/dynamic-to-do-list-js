// Ensure the script runs after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // ✅ Select DOM Elements
    const addButton = document.getElementById('add-task'); // "Add Task" button
    const taskInput = document.getElementById('task-input'); // Input field
    const taskList = document.getElementById('task-list'); // UL for tasks

    // ✅ Create the addTask function
    function addTask() {
        let taskText = taskInput.value.trim(); // Retrieve and trim input value

        if (taskText === "") {
            alert("Please enter a task."); // Alert if empty
            return;
        }

        // ✅ Task Creation
        const li = document.createElement('li');
        li.textContent = taskText;

        // ✅ Create Remove Button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // ✅ Remove button functionality
        removeButton.onclick = function () {
            taskList.removeChild(li);
        };

        // ✅ Append everything
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // ✅ Clear input field
        taskInput.value = "";
    }

    // ✅ Attach Event Listeners
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
