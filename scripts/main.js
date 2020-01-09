/*I have developed a simple Todo App by which we can create n number of lists and inside each list 
  we can create n number of tasks. This app has following functionality:
  1. Create a list with a given name and if no name provided a list will be created with name 'No Name'
  2. Delete the created list.
  3. Create and delete a task inside the list */

define(['./TodoListModule', './ListModule', './ListUIController', './TaskModule', './TaskUIController'], 
function(todolistMethods, listMethods, listUIMethods, taskMethods, taskUIMethods){

  var addListButton = document.getElementById('addListButton');
  var listNameInput = document.getElementById('listNameInput');
  var listArea = document.querySelector('.list-area');

  var addTaskButton = document.getElementById('addTaskButton');
  var taskDetailsInput = document.getElementById('taskDetailsInput');
  var taskArea = document.querySelector('.task-area');
  var activeListId;

  // Setting up Event Listeners for the left panel
  addListButton.addEventListener('click', ctrlAddListItem);
  
  listNameInput.addEventListener('keypress', function(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      ctrlAddListItem();
    }
  });

  listArea.addEventListener('click', handleListAreaClick);

  function handleListAreaClick(event) {
    if (event.target.className === 'list-title'){
      ctrlShowTaskContainer(event);
    } else {
      ctrlDeleteListItem(event);
    }
  }

  // Controlling all the actions in left panel
  function ctrlAddListItem() {
    var listName = listNameInput.value;
  
    // Add list Item to the List Module
    var newList = listMethods.createListItem(listName);
    todolistMethods.addList(newList);

    // Add list to the UI
    listUIMethods.createList(newList);

    //Clear the List Input Element
    listUIMethods.clearListInput(listNameInput);
  }

  function ctrlShowTaskContainer(event){
    activeListId = event.target.parentNode.id;

    //Show the active list in the UI
    listUIMethods.showTaskContainer(activeListId);
  }

  function ctrlDeleteListItem(event) {
    var listId = event.target.parentNode.parentNode.id;

    // Delete List from the data structure
    todolistMethods.deleteList(listId);

    // Delete List from the UI
    listUIMethods.deleteListUI(listId);
  }

  // Setting up Event Listeners for the right panel
  addTaskButton.addEventListener('click', ctrlAddTaskItem);

  taskDetailsInput.addEventListener('keypress', function(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      ctrlAddTaskItem()
    }
  });
  
  taskArea.addEventListener('click', handleTaskAreaClick);

  function handleTaskAreaClick(event) {
    if (event.target.className === 'task-details'){
      ctrlEditTaskItem(event);
    } else if(event.target.className === 'task-checkbox') {
      ctrlCheckTaskItem(event);
    } else {
      ctrlDeleteTaskItem(event);
    }
  }

  function ctrlAddTaskItem() {
    var taskDetails = taskDetailsInput.value;
    var activeList = todolistMethods.getList(activeListId);

    // Add Task to the active list
    var newTask = taskMethods.createTaskItem(taskDetails, activeList);
    activeList.addTask(newTask);

    // Add task to the UI
    taskUIMethods.createTask(newTask, activeList);

    // Clear the task Input Element
    taskUIMethods.clearTaskInput(taskDetailsInput);
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
    task.setTaskCheck(checkStatus);

    // Update the UI with line through on the task
    taskUIMethods.taskChecked(taskId, checkStatus);
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