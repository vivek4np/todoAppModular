/*I have developed a simple Todo App by which we can create n number of lists and inside each list 
  we can create n number of tasks. This app has following functionality:
  1. Create a list with a given name and if no name provided a list will be created with name 'No Name'
  2. Delete the created list.
  3. Create and delete a task inside the list */

define([
  "./views/taskInputView",
  "./models/TodoList",
  "./models/List",
  "./views/listView",
  "./models/Task",
  "./views/taskView",
  "./views/base"
], function(
  taskInputViewMethods,
  todolistMethods,
  listMethods,
  listUIMethods,
  taskMethods,
  taskUIMethods,
  base
) {
  var taskInput = base.DOMStrings.taskTextInput;
  var activeListId;

  // Setting up Event Listeners for the left panel
  base.DOMStrings.addListButton.addEventListener("click", ctrlAddListItem);

  base.DOMStrings.listNameInput.addEventListener("keypress", function(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      ctrlAddListItem();
    }
  });

  base.DOMStrings.listArea.addEventListener("click", handleListAreaClick);

  function handleListAreaClick(event) {
    if (event.target.className === "list-title") {
      ctrlShowTaskContainer(event);
    } else if (event.target.className === "deleteIcon") {
      ctrlDeleteListItem(event);
    }
  }

  // Controlling all the actions in left panel
  function ctrlAddListItem() {
    var listName = base.DOMStrings.listNameInput.value;

    // Add list Item to the List Module
    var newList = listMethods.createListItem(listName);
    todolistMethods.addList(newList);

    // Add list to the UI
    listUIMethods.createListUI(newList);

    //Clear the List Input Element
    listUIMethods.clearListInput(base.DOMStrings.listNameInput);

    if (base.DOMStrings.listArea.childElementCount === 1) {
      activeListId = base.DOMStrings.listArea.childNodes[0].id;
      listUIMethods.showTaskContainerUI(activeListId);
    }
  }

  function ctrlShowTaskContainer(event) {
    activeListId = event.target.parentNode.id;

    //Show the active list in the UI
    listUIMethods.showTaskContainerUI(activeListId);
  }

  function ctrlDeleteListItem(event) {
    var listId = event.target.parentNode.parentNode.id;
    var TodoListKeys = Object.keys(todolistMethods.getTodoList());
    var listIndex = TodoListKeys.indexOf(listId);

    // Delete List from the data structure
    todolistMethods.deleteList(listId);

    // Delete List from the UI
    listUIMethods.deleteListUI(listId);

    if (activeListId === listId) {
      if (listIndex > 0) {
        activeListId = TodoListKeys[listIndex - 1];
      } else if (listIndex == 0) {
        activeListId = TodoListKeys[listIndex + 1];
      }
      listUIMethods.showTaskContainerUI(activeListId);
    }
  }

  // Setting up Event Listeners for the right panel
  base.DOMStrings.addTaskButton.addEventListener("click", ctrlAddTaskItem);

  taskInput.addEventListener("keypress", handleEnterKeyTask);

  base.DOMStrings.taskTypeSelect.addEventListener(
    "change",
    handleTaskTypeChange
  );

  base.DOMStrings.taskArea.addEventListener("click", handleTaskAreaClick);

  function handleEnterKeyTask(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      ctrlAddTaskItem();
    }
  }

  function handleTaskTypeChange(event) {
    var type = event.target.value;
    if (type === "text") {
      taskInput.removeEventListener("keypress", handleEnterKeyTask);
      taskInputViewMethods.createTaskTextInput();
      taskInput = document.getElementById("taskTextInput");
    } else if (type === "image") {
      taskInput.removeEventListener("keypress", handleEnterKeyTask);
      taskInputViewMethods.createTaskImageInput();
      taskInput = document.getElementById("taskImageInput");
    }
    taskInput.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 && !event.shiftKey) {
        ctrlAddTaskItem();
      }
    });
  }

  function handleTaskAreaClick(event) {
    if (event.target.className === "task-text-details") {
      ctrlEditTaskItem(event);
    } else if (event.target.className === "task-checkbox") {
      ctrlCheckTaskItem(event);
    } else if (event.target.className === "deleteIcon") {
      ctrlDeleteTaskItem(event);
    }
  }

  function ctrlAddTaskItem() {
    var taskType = base.DOMStrings.taskTypeSelect.value;
    var activeList = todolistMethods.getList(activeListId);
    var taskDetails, newTask;

    if (taskType === "text") {
      taskInput = document.getElementById("taskTextInput");
      taskDetails = taskInput.value;
    } else if (taskType === "image") {
      taskInput = document.getElementById("taskImageInput");
      taskDetails = taskInput.files[0];
    }

    if (!base.DOMStrings.listArea.childElementCount) {
      alert("Please create a list");
    } else {
      if (!activeList) {
        alert("Please select a List");
      } else {
        if (!taskDetails) {
          alert("Please enter the todo details");
        } else {
          // Add Task to the active list
          newTask = taskMethods.createTaskItem(taskDetails, taskType);
          activeList.addTask(newTask);

          // Add task to the UI
          taskUIMethods.createTaskUI(newTask, activeList);

          // Clear the task Input Element
          taskUIMethods.clearTaskInput(taskInput);
        }
      }
    }
  }

  function ctrlEditTaskItem(event) {
    var taskId = event.target.parentNode.id;

    // Edit the task in UI
    taskUIMethods.editTask(taskId);
  }

  function ctrlCheckTaskItem(event) {
    var taskId = event.target.parentNode.id;
    var activeList = todolistMethods.getList(activeListId);
    var task = activeList.taskList[taskId];
    var checkStatus = event.target.checked;

    // Upate the checked status of Object
    task.setTaskCompleted(checkStatus);

    // Update the UI with line through on the task
    taskUIMethods.taskCompletedUI(taskId, checkStatus);
  }

  function ctrlDeleteTaskItem(event) {
    var taskId = event.target.parentNode.parentNode.id;

    //Delete Task from the object
    var activeList = todolistMethods.getList(activeListId);
    activeList.removeTask(taskId);

    // Delete Task from the UI
    taskUIMethods.deleteTaskUI(taskId);
  }
});
