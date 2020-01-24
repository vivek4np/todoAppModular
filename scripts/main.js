/*I have developed a simple Todo App by which we can create n number of lists and inside each list 
  we can create n number of tasks. This app has following functionality:
  1. Create a list with a given name and if no name provided a list will be created with name 'No Name'
  2. Delete the created list.
  3. Create and delete a task inside the list */

define([
  "./controller/listController",
  "./controller/taskController",
  "./views/baseElements"
], function(listController, taskController, baseElements) {
  var activeListId;

  // Setting up Event Listeners for the left panel
  baseElements.DOMStrings.addListButton.addEventListener(
    "click",
    handleListAddButton
  );

  baseElements.DOMStrings.listNameInput.addEventListener("keypress", function(
    event
  ) {
    if (event.keyCode === 13 && !event.shiftKey) {
      handleListAddButton();
    }
  });

  baseElements.DOMStrings.listArea.addEventListener(
    "click",
    handleListAreaClick
  );

  function handleListAddButton() {
    listController.ctrlAddListItem();
    if (baseElements.DOMStrings.listArea.childElementCount === 1) {
      activeListId = 1;
    }
  }

  function handleListAreaClick(event) {
    if (event.target.className === "list-title") {
      var listId = event.target.parentNode.id;
      activeListId = listId;
      listController.ctrlShowTaskContainer(listId);
    } else if (event.target.className === "deleteIcon") {
      listController.ctrlDeleteListItem(event);
    }
  }

  // Setting up Event Listeners for the right panel
  baseElements.DOMStrings.addTaskButton.addEventListener(
    "click",
    handleTaskAddButton
  );

  baseElements.DOMStrings.taskTextInput.addEventListener(
    "keypress",
    handleEnterKeyTask
  );

  baseElements.DOMStrings.taskTypeSelect.addEventListener(
    "change",
    handleTaskTypeChange
  );

  baseElements.DOMStrings.taskArea.addEventListener(
    "click",
    handleTaskAreaClick
  );

  function handleTaskAddButton() {
    taskController.ctrlAddTaskItem(activeListId);
  }

  function handleEnterKeyTask(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      taskController.ctrlAddTaskItem(activeListId);
    }
  }

  function handleTaskTypeChange(event) {
    var type = event.target.value;
    var taskInputElement = taskController.ctrlTaskSelect(type);

    taskInputElement.removeEventListener("keypress", handleEnterKeyTask);
    taskInputElement.addEventListener("keypress", handleEnterKeyTask);
  }

  function handleTaskAreaClick(event) {
    if (event.target.className === "task-text-details") {
      taskController.ctrlEditTaskItem(event);
    } else if (event.target.className === "task-checkbox") {
      taskController.ctrlCheckTaskItem(event, activeListId);
    } else if (event.target.className === "deleteIcon") {
      taskController.ctrlDeleteTaskItem(event, activeListId);
    }
  }
});
