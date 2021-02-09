// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions

function addTodo(e) {
  e.preventDefault();

  //Creating Div
  const todoDiv = document.createElement("div");                     // Creating new div
  todoDiv.classList.add("todo");                                     // Adding class to new div

  //Creatin li
  const newTodo = document.createElement('li');                      // Creating li element
  newTodo.innerText = todoInput.value;                               // Adding text to li
  newTodo.classList.add('todo-item');                                // Adding class to li
  todoDiv.appendChild(newTodo);                                      // Appending li to div 

  //Add Todo to local storage
  saveLocalTodos(todoInput.value);

  //Check Mark Button
  const completedButton = document.createElement('button');          // Creating button
  completedButton.innerHTML = '<i class="fas fa-check"></i>';        // Adding i tag with class
  completedButton.classList.add('complete-btn');                     // Adding class to button
  todoDiv.appendChild(completedButton);                              // Appending button to div

  //Check Trash Button
  const trashButton = document.createElement('button');              // Creating button
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';            // Adding i tag with class
  trashButton.classList.add('trash-btn');                            // Adding class to button
  todoDiv.appendChild(trashButton);                                  // Appending button to div

  // Append to UL
  todoList.appendChild(todoDiv);

  // Clearn Input Value
  todoInput.value = "";
}

// Delete Todo

function deleteCheck(e) {
  // console.log(e.target);
  const item = e.target;
  // console.log(item)
  // Delete ToDo
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    // Animation
    todo.classList.add('fall');
    removeLocalTodos(todo);
    // Removes after animation is completed
    todo.addEventListener("transitioned", function () {
      todo.remove();
    })
  }


  // Check Mark
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = 'flex';
        break;
      case "completed":
        if (todo.classList.contains('completed')) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains('completed')) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  })
}

function saveLocalTodos(todo) {
  // Check if its already in local storage
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos.push(todo);
    todos = JSON.parse(localStorage.getItem('todos'));
  }
}

function getTodos() {
  // Check if its already in local storage
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function (todo) {
    //Creating Div
    const todoDiv = document.createElement("div");                     // Creating new div
    todoDiv.classList.add("todo");                                     // Adding class to new div

    //Creatin li
    const newTodo = document.createElement('li');                      // Creating li element
    newTodo.innerText = todo;                                          // Adding text to li
    newTodo.classList.add('todo-item');                                // Adding class to li
    todoDiv.appendChild(newTodo);                                      // Appending li to div 

    //Check Mark Button
    const completedButton = document.createElement('button');          // Creating button
    completedButton.innerHTML = '<i class="fas fa-check"></i>';        // Adding i tag with class
    completedButton.classList.add('complete-btn');                     // Adding class to button
    todoDiv.appendChild(completedButton);                              // Appending button to div

    //Check Trash Button
    const trashButton = document.createElement('button');              // Creating button
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';            // Adding i tag with class
    trashButton.classList.add('trash-btn');                            // Adding class to button
    todoDiv.appendChild(trashButton);                                  // Appending button to div

    // Append to UL
    todoList.appendChild(todoDiv);
  })

}

function removeLocalTodos(todo) {

}