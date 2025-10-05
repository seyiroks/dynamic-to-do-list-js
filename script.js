// Run script only after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Step 1: Select DOM elements
    const addButton = document.getElementById('add-task');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Step 2: Define the addTask function
    function addTask() {
        // Retrieve and trim the input value
        const taskText = taskInput.value.trim();

        // Validate input
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item (li)
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Add click event to remove the task
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Append remove button to li, then li to task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";
    }

    // Step 3: Add event listener to "Add Task" button
    addButton.addEventListener('click', addTask);

    // Step 4: Allow pressing "Enter" to add task
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Step 5: Invoke addTask on DOMContentLoaded (per instructions, 
    // though normally we wouldn’t add a task without user input)
    // Here, it just ensures the function exists and is callable.
    addTask();
});
