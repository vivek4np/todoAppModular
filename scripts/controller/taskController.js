define([
  "../models/TodoList",
  "../models/Task",
  "../views/taskView",
  "../views/taskInputView",
  "../views/baseElements"
], function(
  todolistMethods,
  taskMethods,
  taskUIMethods,
  taskInputViewMethods,
  baseElements
) {
  function ctrlTaskSelect(type) {
    var inputElement;
    if (type === "text") {
      inputElement = taskInputViewMethods.createTaskTextInput();
    } else {
      inputElement = taskInputViewMethods.createTaskImageInput();
    }

    return inputElement;
  }

  function ctrlAddTaskItem(activeListId) {
    var taskType = baseElements.DOMStrings.taskTypeSelect.value;
    var todoListKeys = Object.keys(todolistMethods.getTodoList());
    var activeList = todolistMethods.getList(activeListId);
    var taskInput, taskDetails, newTask;

    if (taskType === "text") {
      taskInput = document.getElementById("taskTextInput");
      taskDetails = taskInput.value;
    } else if (taskType === "image") {
      taskInput = document.getElementById("taskImageInput");
      taskDetails = taskInput.files[0];
    }

    if (!todoListKeys.length) {
      alert("Please create a list");
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

  function ctrlEditTaskItem(event) {
    var taskId = event.target.parentNode.id;

    // Edit the task in UI
    taskUIMethods.editTask(taskId);
  }

  function ctrlCheckTaskItem(event, activeListId) {
    var taskId = event.target.parentNode.id;
    var activeList = todolistMethods.getList(activeListId);
    var task = activeList.taskList[taskId];
    var checkStatus = event.target.checked;

    // Upate the checked status of Object
    task.setTaskCompleted(checkStatus);

    // Update the UI with line through on the task
    taskUIMethods.taskCompletedUI(taskId, checkStatus);
  }

  function ctrlDeleteTaskItem(event, activeListId) {
    var taskId = event.target.parentNode.parentNode.id;

    //Delete Task from the object
    var activeList = todolistMethods.getList(activeListId);
    activeList.removeTask(taskId);

    // Delete Task from the UI
    taskUIMethods.deleteTaskUI(taskId);
  }
  return {
    ctrlTaskSelect,
    ctrlAddTaskItem,
    ctrlEditTaskItem,
    ctrlCheckTaskItem,
    ctrlDeleteTaskItem
  };
});
