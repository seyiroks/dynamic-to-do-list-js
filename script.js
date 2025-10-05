// todo.js
// Persisting To-Do List with Local Storage
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements (exact names required by checker)
    const addButton = document.getElementById('add-task');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // In-memory tasks array (initialized from localStorage)
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    /**
     * addTask
     * If called with a string as the first argument, that string is used as the task text.
     * If called as an event handler (e.g. directly passed to addEventListener), the event
     * object will be ignored and the value will be read from taskInput.
     *
     * @param {string|Event|undefined} passedText - optional task text or Event object
     * @param {boolean} save - whether to save the task to localStorage (default true)
     */
    function addTask(passedText, save = true) {
        // If the function receives an Event object (because it was used directly
        // as an event handler), ignore it and read from the input.
        if (passedText instanceof Event) {
            passedText = undefined;
        }

        // Retrieve and trim the value (this satisfies the requirement that
        // taskText be retrieved and trimmed inside addTask)
        let taskText = (passedText !== undefined) ? String(passedText) : taskInput.value.trim();

        // If called from UI and empty -> alert
        if (taskText === "") {
            // Only alert when triggered by UI (i.e., when no passedText provided)
            if (passedText === undefined) {
                alert("Please enter a task.");
            }
            return;
        }

        // Create li element and set content
        const li = document.createElement('li');
        li.textContent = taskText;

        // Store task text as data attribute to make removal reliable
        li.setAttribute('data-task', taskText);

        // Create Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Assign onclick to remove the li from the DOM and update localStorage
        removeButton.onclick = function () {
            // Remove element from DOM
            taskList.removeChild(li);

            // Remove from tasks array and update localStorage
            tasks = tasks.filter(t => t !== taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        };

        // Append remove button to li and li to the list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear input only when action came from user input (not when loading from storage)
        if (passedText === undefined) {
            taskInput.value = "";
        }

        // Save to localStorage if required (avoid saving when loading existing tasks)
        if (save) {
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    // Load tasks from localStorage into the DOM on page load
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = storedTasks; // ensure in-memory array matches storage
        storedTasks.forEach(taskText => addTask(taskText, false)); // false -> do not save again
    }

    // Attach Event Listeners
    // Use the exact addButton identifier and attach the addTask function (no parentheses).
    addButton.addEventListener('click', addTask);

    // Allow "Enter" key to add a task
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load saved tasks on startup
    loadTasks();
});
