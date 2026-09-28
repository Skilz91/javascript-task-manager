// Wait for DOM to finish loading
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Retrieve initial tasks array from local storage or set empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render out existing stored tasks immediately on page load
    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            if (task.completed) li.classList.add('completed');

            li.innerHTML = `
                <span onclick="toggleTask(${index})">${task.text}</span>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            `;
            taskList.appendChild(li);
        });
    };

    // Form logic to add a new task item
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (!taskText) return;

        tasks.push({ text: taskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        taskInput.value = '';
        renderTasks();
    });

    // Toggle completion status
    window.toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    // Remove task from array and update DOM
    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    // Run initial rendering pass
    renderTasks();
});
