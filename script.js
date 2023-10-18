$(document).ready(function() {
    // Load tasks from local storage on page load
    loadTasksFromLocalStorage();

    const inputElement = document.getElementById('input');
    const buttonElement = document.getElementById('enter');

    // Add event listener for "Enter" key press
    inputElement.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            // Trigger a click event on the button when "Enter" is pressed
            buttonElement.click();
        }
    });

    document.querySelector('#enter').onclick = function(){
        if(document.querySelector('#input').value.trim().length == 0){
            alert("Please Enter a Task")
            
        } else {
            const taskName = document.querySelector('#input').value;
            addTaskToList(taskName); // Add the task to the list

            // Save the updated tasks to localStorage
            saveTasksToLocalStorage();

            document.querySelector('#input').value = "";
            document.querySelector('#input').focus();
        }
    };

    $('#container').on('click', '.task', function() {
        if ($(this).css('background-color') === 'rgb(144, 238, 144)') {
            $(this).css('background-color', 'white');
            $(this).css('text-decoration', 'none');
        } else {
            $(this).css('background-color', 'lightgreen');
            $(this).css('text-decoration', 'line-through');
        }
    });

    function addTaskToList(taskName) {
        $('#new').append(`
            <div class="task">
                <span id="taskname">
                    ${taskName}
                </span>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        `);
    }

    function saveTasksToLocalStorage() {
        const tasks = [];
        $('.task #taskname').each(function() {
            tasks.push($(this).text().trim());
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            addTaskToList(task);
        });
    }

    $('#container').on('click', '.delete', function() {
        // Remove the task's parent element (the whole task div) from the displayed list
        $(this).parent().remove();
    
        // Update the tasks in the local storage after removing the task
        saveTasksToLocalStorage();
      });
});
