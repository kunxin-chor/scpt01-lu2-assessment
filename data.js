// data.js is the DATA LAYER
// all the functions to do for updating/modifying/getting data
// is here

const BASE_JSON_BIN_URL = "https://api.jsonbin.io/v3";
const BIN_ID = "65334df70574da7622bbaa00";

// negative example of bad cybersecurity practices
const MASTER_KEY="$2a$10$EZfkhAp55cb1nD3GBqXbaeHPg.9VYRj2u4mWKFwEIbVtER1wGdiNy";

// load all the tasks from the bin
async function loadTasks() {
    // according to JSONBIN documentation, reading from a bin uses the GET request type,
    // so we use `axios.get`
    const response = await axios.get(`${BASE_JSON_BIN_URL}/b/${BIN_ID}/latest`);
    console.log(response.data);
    return response.data.record;
}

async function saveTasks(todos) {
    // axios.put got at least 3 arguments
    // 1st argument: the URL of the endpoint
    // 2nd argument: what to send to the endpoint
    // 3rd argument (optional): headers or meta-data and we have to include our master key
    const response = await axios.put(`${BASE_JSON_BIN_URL}/b/${BIN_ID}`, todos,{
        "content-type":"application/json",
        "X-Master-Key": MASTER_KEY
    });
    console.log(response.data);
}

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