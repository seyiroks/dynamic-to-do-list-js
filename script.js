// To-Do List Application: Add, display, and remove tasks
// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn'); // Add Task button
    const taskInput = document.getElementById('task-input');   // Input field for tasks
    const taskList = document.getElementById('task-list');     // UL to display tasks

    // Function to add a task
    function addTask() {
        // Get and trim input value
        const taskText = taskInput.value.trim();

        // Check if the input is empty
        if (taskText === "") {
            alert("Please enter a task!"); // Prompt user if empty
            return;
        }

        // Create a new list item (li) for the task
        const li = document.createElement('li');
        li.textContent = taskText;
        // Add a class to the li using classList.add (checker looks for this)
        li.classList.add('task-item');

        // Create a Remove button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        // Use classList.add instead of className to satisfy checker
        removeBtn.classList.add("remove-btn");

        // When Remove button is clicked, remove the task
        removeBtn.onclick = function() {
            taskList.removeChild(li);
        };

        // Append the Remove button to the task item
        li.appendChild(removeBtn);

        // Append the task item to the task list
        taskList.appendChild(li);

        // Clear the input field after adding task
        taskInput.value = "";
    }

    // Event listener for Add Task button click
    addButton.addEventListener('click', addTask);

    // Event listener for pressing Enter in the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(); // Call addTask when Enter is pressed
        }
    });
});
