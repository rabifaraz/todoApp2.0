
var firebaseConfig = {
  apiKey: "AIzaSyB6G52ROGrPYMGBzPPKG5N_mubPUh7vF80",
  authDomain: "a3links-5a1b7.firebaseapp.com",
  databaseURL: "https://a3links-5a1b7-default-rtdb.firebaseio.com",
  projectId: "a3links-5a1b7",
  storageBucket: "a3links-5a1b7.appspot.com",
  messagingSenderId: "388466120552",
  appId: "1:388466120552:web:35bd4ae3fa4f8dac2e28dd"
};

firebase.initializeApp(firebaseConfig);

var todosRef = firebase.database().ref('todos');
// database Keys should be placed here 


var inputBox = document.getElementById('inputBox');
var addBtn = document.getElementById('addBtn');
var todoList = document.getElementById('todoList');

var editTodo = null;

// Function to add todo
function addTodo() {
    var inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("You must write something in your to do");
        return false;
    }

    if (addBtn.value === "Edit") {
        // Passing the original text to editLocalTodos function before edit it in the todoList
        editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBtn.value = "Add";
        addBtn.innerHTML = 'Add';
        inputBox.value = "";
    }
    else {
        //Creating p tag
        var li = document.createElement("li");
        var p = document.createElement("p");
        p.innerHTML = inputText;
        li.appendChild(p);

        // Creating Edit Btn
        var editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn", "btn-danger", "me-1");
        li.appendChild(editBtn);

        // Creating Delete Btn
        var deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        // document.createTextNode('<i class="fa-regular fa-trash-can"></i>');
        deleteBtn.classList.add("btn", "deleteBtn", "btn-danger", "me-1");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        inputBox.value = "";

        saveLocalTodos(inputText);
    }
}

// function to delete All
function deleteAll() {

    // localStorage.clear();
    todosRef.set({})
    todoList.innerHTML = "";
}


// Function to update : (Edit/Delete) todo
var updateTodo = (e) => {
    if (e.target.innerHTML === "Delete") {
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }

    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        addBtn.innerHTML = 'Update';
        editTodo = e;
    }
}

// Function to save local todo
function saveLocalTodos(todo) {
    var todos;

    // From localstorage

    // if (localStorage.getItem("todos") === null) {
    //     todos = [];
    // }
    // else {
    //     todos = JSON.parse(localStorage.getItem("todos"));
    // }
    // todos.push(todo);
    // localStorage.setItem("todos", JSON.stringify(todos));

    // From firebase
    todosRef.once('value').then((snapshot) => {
        if (snapshot.exists()) {
            todos = snapshot.val();
        } else {
            todos = []
        }

        todos.push(todo);
        todosRef.set(todos)
    }).catch((error) => {
        console.error(error);
    });
}

// Function to get local todo
var getLocalTodos = () => {
    var todos;

    // From localstorage

    // if (localStorage.getItem("todos") === null) {
    //     todos = [];
    // }
    // else {
    //     todos = JSON.parse(localStorage.getItem("todos"));
    //     todos.forEach(todo => {

    //         //Creating p tag
    //         var li = document.createElement("li");
    //         var p = document.createElement("p");
    //         p.innerHTML = todo;
    //         li.appendChild(p);


    //         // Creating Edit Btn
    //         var editBtn = document.createElement("button");
    //         editBtn.innerText = "Edit";
    //         editBtn.classList.add("btn", "editBtn", "btn-danger", "me-1");
    //         li.appendChild(editBtn);

    //         // Creating Delete Btn
    //         var deleteBtn = document.createElement("button");
    //         deleteBtn.innerText = "Delete";
    //         deleteBtn.classList.add("btn", "deleteBtn", "btn-danger", "me-1");
    //         li.appendChild(deleteBtn);

    //         todoList.appendChild(li);
    //     });
    // }

    // From firebase
    todosRef.once('value').then((snapshot) => {
        if (snapshot.exists()) {
            todos = snapshot.val();
        } else {
            todos = []
        }

        todos.forEach(todo => {

            //Creating p tag
            var li = document.createElement("li");
            var p = document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p);


            // Creating Edit Btn
            var editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.classList.add("btn", "editBtn", "btn-danger", "me-1");
            li.appendChild(editBtn);

            // Creating Delete Btn
            var deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete";
            deleteBtn.classList.add("btn", "deleteBtn", "btn-danger", "me-1");
            li.appendChild(deleteBtn);

            todoList.appendChild(li);
        });
    }).catch((error) => {
        console.error(error);
    });
}

// Function to delete local todo
var deleteLocalTodos = (todo) => {
    var todos;

    // From localstorage

    // if (localStorage.getItem("todos") === null) {
    //     todos = [];
    // }
    // else {
    //     todos = JSON.parse(localStorage.getItem("todos"));
    // }

    // var todoText = todo.children[0].innerHTML;
    // var todoIndex = todos.indexOf(todoText);
    // todos.splice(todoIndex, 1);
    // localStorage.setItem("todos", JSON.stringify(todos));
    // console.log(todoIndex);

    // From firebase
    todosRef.once('value').then((snapshot) => {
        if (snapshot.exists()) {
            todos = snapshot.val();
        } else {
            todos = []
        }

        var todoText = todo.children[0].innerHTML;
        var todoIndex = todos.indexOf(todoText);
        todos.splice(todoIndex, 1);
        todosRef.set(todos)
        console.log(todoIndex);
    }).catch((error) => {
        console.error(error);
    });

}

var editLocalTodos = (todo) => {
    // From localstorage
    // var todos = JSON.parse(localStorage.getItem("todos"));
    // var todoIndex = todos.indexOf(todo);
    // todos[todoIndex] = inputBox.value;
    // localStorage.setItem("todos", JSON.stringify(todos));

    // From firebase
    var todos;
    var inputBoxVal = inputBox.value;
    todosRef.once('value').then((snapshot) => {
        if (snapshot.exists()) {
            todos = snapshot.val();
        } else {
            todos = []
        }
        var todoIndex = todos.indexOf(todo);
        todos[todoIndex] = inputBoxVal;
        todosRef.set(todos)
    })
}

document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);