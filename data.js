// function to add a new task
// 1st parameter: array of all the existing todos
// 2nd and 3rd parameter: details of the task
function addTodo(todos, name, urgency) {
    const newTodo = {
        // the `id` is to unique identify each task
        'id': Math.floor(Math.random() * 1000000 + 1),
        'name': name,
        'urgency': urgency
    }
    todos.push(newTodo);
}

function modifyTask(todos, id,  newName, newUrgency) {
    // create the new task
    let modifiedTask = {
        "id": id,
        "name": newName,
        "urgency": newUrgency
    }

    // get the index of the task we want to replace
    const indexToReplace = todos.findIndex(function(t){
        return t.id == id;
    });

    // need to check if the index really exists
    // if the id doesn't exist, then findIndex will return -1
    if (indexToReplace > -1) {
        todos[indexToReplace] = modifiedTask;
    }
  
}

function deleteTask(todos, id) {
    let indexToDelete = null;
    for (let i =0; i < todos.length; i++) {
        if (todos[i].id == id) {
            indexToDelete = i;
        }
    }
    // if we found the index that we want to delete
    if (indexToDelete != null) {
        todos.splice(indexToDelete, 1);
    }
}


// let todos = [];
// addTodo(todos, "Wash the car", 5);
// addTodo(todos, "Clean the toilet", 3);
// addTodo(todos, "Wash the floor", 1);
// console.log(todos);

// modifyTask(todos, todos[0].id, "Wash the bicycle", 4);
// console.log(todos);

// deleteTask(todos, todos[2].id);
// console.log(todos);