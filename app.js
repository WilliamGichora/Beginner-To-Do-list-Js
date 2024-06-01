const todoInput = document.querySelector(".todo_input");
const todo_button = document.querySelector(".todo_button");
const todo_list = document.querySelector(".todo_list");
const filterOption = document.querySelector(".filter_todo");

todo_button.addEventListener("click", addTodo);

function addTodo(event) {
  event.preventDefault();

  if (todoInput.value) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo_item");
    todoDiv.appendChild(newTodo);

    saveTodos(todoInput.value);

    const compeletedButton = document.createElement("button");
    compeletedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    compeletedButton.classList.add("complete_btn");
    todoDiv.appendChild(compeletedButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete_btn");
    todoDiv.appendChild(deleteButton);

    todo_list.appendChild(todoDiv);

    todoInput.value = "";
  }
}
todo_list.addEventListener("click", (evt) => {
  const item = evt.target;
  if (item.classList[0] === "delete_btn") {
    item.parentNode.classList.add("fall");
    removeTodosFomLocal(item.parentNode);
    item.parentNode.addEventListener("transitionend", () => {
      item.parentNode.remove();
    });
  }
  if (item.classList[0] === "complete_btn") {
    item.parentNode.classList.toggle("completed");
  }
});

filterOption.addEventListener("change", (evt) => {
  const todos = todo_list.childNodes;
  todos.forEach((todo) => {
    const mStyle = todo.style;
    if (mStyle != undefined && mStyle != null) {
      switch (evt.target.value) {
        case "all":
          mStyle.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            mStyle.display = "flex";
          } else {
            mStyle.display = "none";
          }
          break;
        case "uncompleted":
          if (todo.classList.contains("completed")) {
            mStyle.display = "none";
          } else {
            mStyle.display = "flex";
          }
          break;
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", getTodos);

function validateLocalStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function saveTodos(todo) {
  let todos = validateLocalStorage();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos = validateLocalStorage();
  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo_item");
    todoDiv.appendChild(newTodo);

    const compeletedButton = document.createElement("button");
    compeletedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    compeletedButton.classList.add("complete_btn");
    todoDiv.appendChild(compeletedButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete_btn");
    todoDiv.appendChild(deleteButton);

    todo_list.appendChild(todoDiv);
  });
}

function removeTodosFomLocal(todo) {
  let todos = validateLocalStorage();
  const todoIndex = todo.childNodes[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
