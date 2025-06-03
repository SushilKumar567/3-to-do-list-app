const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const errorMsg = document.getElementById("error-msg");

let editTodo = null;

const addTodo = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    errorMsg.innerText = "You must write something!";
    inputBox.value = "";
    return false;
  }

  if (addBtn.innerText === "Edit") {
    editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
    editTodo.target.previousElementSibling.innerHTML = inputText;
    addBtn.innerText = "Add";
    inputBox.value = "";
  } else {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);
    inputBox.focus();

    // Creating Edit Btn
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn", "editBtn");
    li.appendChild(editBtn);

    // Creating Delete Btn
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.classList.add("btn", "deleteBtn");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value = "";
    errorMsg.innerText = "";
    saveLocalTodos(inputText);
  }
};

// Function to update : (Edit/Delete) todo
const updateTodo = (e) => {
  if (e.target.innerHTML === "Remove") {
    todoList.removeChild(e.target.parentElement);
    errorMsg.innerText = "";
    deleteLocalTodos(e.target.parentElement);
  }

  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.innerText = "Edit";
    errorMsg.innerText = "";
    editTodo = e;
  }
};

// Function to save local todo
const saveLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Function to get local todo
const getLocalTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerHTML = todo;
      li.appendChild(p);

      // Creating Edit Btn
      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.classList.add("btn", "editBtn");
      li.appendChild(editBtn);

      // Creating Delete Btn
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Remove";
      deleteBtn.classList.add("btn", "deleteBtn");
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
    });
  }
};

// Function to delete local todo
const deleteLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  let todoText = todo.children[0].innerHTML;
  let todoIndex = todos.indexOf(todoText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const editLocalTodos = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos"));
  let todoIndex = todos.indexOf(todo);
  todos[todoIndex] = inputBox.value;
  localStorage.setItem("todos", JSON.stringify(todos));
};

document.addEventListener("DOMContentLoaded", getLocalTodos);
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);
