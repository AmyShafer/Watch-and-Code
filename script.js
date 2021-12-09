var toDoList = {
    todos: [],
    addToDos: function (toDoText) {
      this.todos.push({
        toDoText: toDoText,
        completed: false,
      });
    },
    editToDos: function (position, toDoText) {
      this.todos[position].toDoText = toDoText;
    },
    deleteToDos: function (position) {
      this.todos.splice(position, 1);
    },
    toggleComplete: function (position) {
      var todo = this.todos[position];
      todo.completed = !todo.completed;
    },
    toggleAll: function () {
      var totalTodos = this.todos.length;
      var completedTodos = 0;
        this.todos.forEach(function(todo) {
          if (todo.completed === true) {
            completedTodos++;
          }
        });
        this.todos.forEach(function(todo) {
          if (completedTodos === totalTodos) {
            todo.completed = false;
          } else {
            todo.completed = true;
          }
        });
      }  
    };
    
  var handlers = {
    addToDos: function () {
      var addToDosTextInput = document.getElementById("addToDosTextInput");
      toDoList.addToDos(addToDosTextInput.value);
      addToDosTextInput.value = "";
      view.viewToDos();
    },
    editToDos: function () {
      var editToDosPositionInput = document.getElementById("editToDosPositionInput");
      var editToDosTextInput = document.getElementById("editToDosTextInput");
      toDoList.editToDos(editToDosPositionInput.valueAsNumber, editToDosTextInput.value);
      editToDosPositionInput.value = "";
      editToDosTextInput.value = "";
      view.viewToDos();
    },
    deleteToDos: function (position) {
      toDoList.deleteToDos(position);
      view.viewToDos();
    },
    toggleComplete: function () {
      var toggleCompletePositionInput = document.getElementById("toggleCompletePositionInput"); 
      toDoList.toggleComplete(toggleCompletePositionInput.valueAsNumber);
      toggleCompletePositionInput.value = "";
      view.viewToDos();
    },
    toggleAll: function () {
      toDoList.toggleAll();
      view.viewToDos();
    }
  };
  
  var view = {
    viewToDos: function () {
    var todosUl = document.querySelector("ul");
    todosUl.innerHTML = "";
    toDoList.todos.forEach(function (todo, position) {
      var todoLi = document.createElement("li");
      var toDoTextWithCompletion = "";
      
      if (todo.completed === true) {
        toDoTextWithCompletion = "(x) " + todo.toDoText;
      } else {
        toDoTextWithCompletion = "( ) " + todo.toDoText;
      }
      
      todoLi.id = position;
      todoLi.textContent = toDoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
      }, this);
    },
    createDeleteButton: function () {
      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "deleteButton";
      return deleteButton;
    },
    setUpEventListeners: function () {
      var todosUl = document.querySelector("ul"); 
      todosUl.addEventListener("click", function (event) {
      var elementClicked = event.target;
      if (elementClicked.className === "deleteButton") {
        handlers.deleteToDos(parseInt(elementClicked.parentNode.id));
        }
      });
    }
  };
  
  view.setUpEventListeners();
  
    