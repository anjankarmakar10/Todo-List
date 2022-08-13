//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todos");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions
function addTodo(event) {
  //Prevent form from fubmiting
  event.preventDefault();

  //Create Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //Add todo to local storage
  saveTodos(todoInput.value);

  //Create Checkmark Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<img class="complete-icon" src="bullet.svg"/>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //Create Checkmark Button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<img class="delete-icon" src="delete.png"/>';
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);

  //Append Div into Todo list
  todoList.appendChild(todoDiv);

  //Clear Todo Input Value
  todoInput.value = "";
}

function deleteCheck(event) {
  const item = event.target;

  //Delete Todo
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");

    removeSeveTodo(todo);

    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList[0] == "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveTodos(todo) {
  //Check that todo already in there
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  //Check that todo already in there
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    //Create Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Create Checkmark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<img class="complete-icon" src="bullet.svg"/>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Create Checkmark Button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<img class="delete-icon" src="delete.png"/>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //Append Div into Todo list
    todoList.appendChild(todoDiv);
  });
}

function removeSeveTodo(todo) {
  //Check that todo already in there
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  let currentTodo = todo.textContent;
  todos.splice(todos.indexOf(currentTodo), 1);

  localStorage.setItem("todos", JSON.stringify(todos));
}
