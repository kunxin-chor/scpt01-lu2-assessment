// the `DOMContentLoaded` event fires when all the
// HTML elements in the web page has been created
// we use it to define the entry point of our application
document.addEventListener("DOMContentLoaded", function(){
    function main(){
        let todos = [];
        // addTodo(todos, "Walk the dog", 5);
        // addTodo(todos, "Clean the house", 3);
        // addTodo(todos, "Buy grocery", 3);
        renderTodos(todos);
       

        // attach all the event listeners
        document.querySelector("#addTodo")
            .addEventListener('click', function(){
                const taskNameElement = document.querySelector("#taskName");
                const taskName = taskNameElement.value;

                const taskUrgencyElement = document.querySelector("#taskUrgency");
                const taskUrgency = taskUrgencyElement.value;

                addTodo(todos, taskName, taskUrgency );
                renderTodos(todos); // redraw the list of tasks
            })
        
    }
  
    function renderTodos(todos) {
        const todoListElement = document.querySelector("#todoList");
        todoListElement.innerHTML = ""; // reset the content 
        for (let t of todos) {
            // create an empty <li>
            const listItem = document.createElement('li');

            // set the class of the newly created element
            listItem.className = "list-group-item"

            // set its inner HTML (the content that we display within the
            // li)
            listItem.innerHTML = `${t.name}  (urgency: ${t.urgency})
             <button class="btn btn-primary btn-sm edit-btn">Edit</button>
             <button class="btn btn-danger btn-sm delete-btn">Delete</button>
            `
            // in this specific <li> element, look for a button with the class `edit-btn`
            listItem.querySelector(".edit-btn").addEventListener("click", function(){
                // the annoymous function that is being created remember what `t` was referring
                // at the point that is being created
                
                // ask the user for the new task name and the new urgency
                const newTaskName = prompt("Please enter the new task name: ", t.name);
                const newTaskUgrency = prompt("Please enter the new task urgency", t.urgency);

                modifyTask(todos, t.id, newTaskName, newTaskUgrency  );
                renderTodos(todos);
            });

            // select the delete button that is in the li element
            listItem.querySelector(".delete-btn").addEventListener("click", function(){
                deleteTask(todos, t.id);
                renderTodos(todos);
            });

           todoListElement.appendChild(listItem);
        }
    }


    main();
})