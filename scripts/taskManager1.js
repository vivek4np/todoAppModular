
/*I have developed a simple Todo App by which we can create n number of lists and inside each list 
  we can create n number of tasks. This app has following functionality:
  1. Create a list with a given name and if no name provided a list will be created with name 'No Name'
  2. Delete the created list.
  3. Create and delete a task inside the list */

/*I  have used IIFE(Immediately Invoked Function Expression) to observe closure in the code, this type of module 
is also known as Revealing Module. The following todoApp consists all my app code and returns 
two functions addList and handleListEnterKey as a public method. I have created this to avoid global namespace collision */ 

var todoApp = function () {

    //A main object which contains all the lists and the tasks of the lists.
    var todoList = {};
    
    //A variable used to keep track which list's task we are showing.
    var currentShowing;
  
    /*A private constructor function from which we can create multiple lists and each individual list will have
    their own id, name and a task list.*/
    var List = function (){
      
      //private static variable intialized once and used to generate list Id.
      var listIdGenerator = 0;
  
      //function to generate listId for every new list creation.
      function generateListId() {
          return listIdGenerator += 1;
      }
  
      //here we are returning the properties of the list which are Id, name and task list.
      //we are using object to store tasks as we need to delete the task
      return function (listName) {
        
        this.id = 0;
        this.name = '';
        this.taskList = {};
  
        this.setListId(generateListId());
        this.setListName(listName);
      }
    }();
  
    List.prototype = {
        
      //List Id setter
      setListId(listId) {
        this.id = listId;
      },
      
      //list Id getter
      getListId(){
        return this.id;
      },
  
      //List Name setter and if no name given to the list by user, then the name will be 'No Name'
      setListName(listName){
        this.name = listName || 'No Name';
      },
  
      //List Name getter
      getListName(){
        return this.name;
      },
      
      //Adds task to the list
      addTask(newTask){
        this.taskList[newTask.getTaskId()] = newTask;
      },
  
      //Removes task from the list
      removeTask(id){
        if(this.taskList[id]){
          return delete this.taskList[id];
        }
      },
  
      //Task object getter
      getTaskList(){
        return this.taskList;
      }
  
    }
  
  
    /*A private constructor function from which we can create multiple tasks and each individual task will have
    their own id and name.*/
    var Task = function (){
      
      //private static variable intialized once and used to generate task Id.
      var taskIdGenerator = 100;
  
      //function to generate task Id for every new task creation.
      function generateTaskId(){
        return taskIdGenerator += 1;
      }
  
      //here we are returning the properties of the task which are Id and name.
      return function(taskDetails) {
        this.id = 0;
        this.details = '';
  
        this.setTaskId(generateTaskId());
        this.setTaskDetails(taskDetails);
      }
    }();
  
    Task.prototype = {
        
      //task Id setter
      setTaskId(taskId){
        this.id = taskId;
      },
  
      //task Id getter
      getTaskId(){
        return this.id;
      },
  
      //task name setter
      setTaskDetails(taskDetails){
        this.details = taskDetails;
      },
  
      //task name getter
      getTaskDetails(){
        return this.details;
      }
  
    }
  
    //function to use enter key to create a new List
    function handleListEnterKey(event) {
        if (event.keyCode === 13 && !event.shiftKey) {
            addList();
        }
    }
  
    //function to use enter key to create a new task
    function handleTaskEnterKey(event) {
        if (event.keyCode === 13 && !event.shiftKey) {
          addTask(event);
        }
    }
  
    //function to use enter key to save the edited task
    function handleEditTaskEnterKey(event) {
      if (event.keyCode === 13 && !event.shiftKey) {
        saveEditTask(event);
      }
    }
  
    //function to add new list to the main todoList object and call createList function to create the list element.
    function addList(){
      var listInput = document.getElementById('listName');
      var listName = listInput.value;
      var newList;
  
      newList = new List(listName);
      todoList[newList.getListId()] = newList;
      
      createList(newList);
  
      listInput.value = '';
      listInput.focus();
  
    }
  
    /*function to create list element to display in the UI
      1. Select the left section where all list names are displayed
      2. List Title Container (which contains the name of the list and a delete button to delete the list)
      3. It also also calls the function which creates task container on the right section as the new list is created.
    */
    function createList(list){
  
      var listArea, listTitleContainer, listTitle, deleteListButton;
      var listId = list.getListId();
      
      //list area is the left section on the UI where all the list name are displayed
      listArea = document.getElementById('listArea');
  
      //This element contains the list name and the delete button
      listTitleContainer = document.createElement('div');
      listTitleContainer.setAttribute('class', 'list-title-container')
      listTitleContainer.setAttribute('id', listId);
      listTitleContainer.addEventListener('click', showTaskContainer);
      listTitleContainer.listId = listId;
  
      //This contains the list name
      listTitle = document.createElement('div')
      listTitle.setAttribute('class', 'list-title');
      listTitle.innerHTML = list.getListName();
      listTitleContainer.appendChild(listTitle);
  
      //Button to delete the list
      deleteListButton = document.createElement('button');
      deleteListButton.setAttribute('class', 'delete-list-button floatRight');
      deleteListButton.addEventListener('click', deleteList);
      deleteListButton.textContent = 'Delete';
      deleteListButton.listId = listId;
      listTitleContainer.appendChild(deleteListButton);
  
      listArea.appendChild(listTitleContainer);
  
      //creates the task container on the right section.
      createTaskContainer(listId);
  
    }
  
    /*function to create the task container on the UI for each list which is hidden when the list is created, which is
      displayed when user clicks on the list title conatainer, this contains
      1. task container for each list(task input area and tasks list conatiner)
      2. task input area (contains the add task button and input element where we enter the details of the task)
      3. tasks list container which contains all tasks of active list. 
    */
    function createTaskContainer(listId){
  
      var taskArea, listTaskContainer, taskInputArea, addTaskButton, taskDetailsInput, taskListContainer;
  
      //task area is the right section on the UI where we display all the tasks and task input area.
      taskArea = document.getElementById('taskArea');
  
      //task container for each list which is hidden as the list is created
      listTaskContainer = document.createElement('div');
      listTaskContainer.setAttribute('class', 'list-task-container hide');
      listTaskContainer.setAttribute('id', 'tasks_'+listId);
  
      //task input area
      taskInputArea = document.createElement('div');
      taskInputArea.setAttribute('class', 'task-input-area');
  
      //add task button which calls addTask function to add task to the specified list
      addTaskButton = document.createElement('button');
      addTaskButton.setAttribute('class', 'task-add-button floatLeft');
      addTaskButton.textContent = 'Add Task';
      addTaskButton.addEventListener('click', addTask);
      addTaskButton.listId = listId;
      taskInputArea.appendChild(addTaskButton);
  
      //task details input to input the task details
      taskDetailsInput = document.createElement('input');
      taskDetailsInput.setAttribute('class', 'task-details-input')
      taskDetailsInput.setAttribute('id', 'addTask_'+listId)
      taskDetailsInput.setAttribute('placeholder','Enter the task details...');
      taskDetailsInput.addEventListener('keypress', handleTaskEnterKey);
      taskDetailsInput.listId = listId;
  
      taskInputArea.appendChild(taskDetailsInput);
  
      listTaskContainer.appendChild(taskInputArea);
  
      //tasks list container which contians all the task of the active list
      taskListContainer = document.createElement('div');
      taskListContainer.setAttribute('class', 'task-list-container');
      taskListContainer.setAttribute('id', 'task_list_'+listId);
      listTaskContainer.appendChild(taskListContainer); 
  
      taskArea.appendChild(listTaskContainer);
    }
  
    //function to show the task container of the active list
    function showTaskContainer(event) {
      
      if (currentShowing) {
        hideElement(currentShowing);
      }
  
      var currentListId = event.target.parentElement.id;
      var divToShow = document.getElementById('tasks_'+currentListId);
   
      showElement(divToShow);
      currentShowing = divToShow;
    }
  
    //function to add task to the active list and also add it to the task list object. It also calls create task function which creates tasks in the UI.
    function addTask(event) {
      var currentListId = event.target.listId;
      var currentTask = document.getElementById('addTask_'+currentListId);
      var list = todoList[currentListId];
      var newTask;
  
      if(currentTask.value){
          newTask = new Task(currentTask.value);
          list.addTask(newTask);
  
          createTask(newTask, list);
  
          currentTask.value = '';
      }
    }
  
    /*function to create task element and display in the UI
      1. select the task list container below the task input area.
      2. create a div for each task which will contain checkbox, task details, and delete button.*/
    function createTask(task, list) {
      var taskContainer, taskDetails, deleteTaskButton;
      var listId = list.getListId();
      var taskId = task.getTaskId();
      var taskListContainer = document.getElementById('task_list_'+listId);
  
      //the element which contains all the elements of each task
      taskContainer = document.createElement('div');
      taskContainer.setAttribute('class', 'task-container');
      taskContainer.setAttribute('id', taskId);
  
      //the element to mark the task completed
      taskCheckBox = document.createElement('input');
      taskCheckBox.setAttribute('type', 'checkbox');
      taskCheckBox.setAttribute('class', 'task-checkbox floatLeft');
      taskCheckBox.setAttribute('id', 'taskCheckbox_'+taskId);
      taskCheckBox.task = task;
      taskCheckBox.addEventListener('click', taskChecked);
      taskContainer.appendChild(taskCheckBox);
  
      //the element which contains details of the task
      taskDetails = document.createElement('span');
      taskDetails.setAttribute('class', 'task-details floatLeft');
      taskDetails.setAttribute('id', 'details_'+taskId);
      taskDetails.innerHTML = task.getTaskDetails();
      taskDetails.task = task;
      taskDetails.addEventListener('click', editTask);
      //taskDetails.addEventListener('keypress', handleEditTaskEnterKey);
      taskContainer.appendChild(taskDetails);
  
      //button to delete the specific task
      deleteTaskButton = document.createElement('button');
      deleteTaskButton.setAttribute('class', ' delete-task-button floatRight');
      deleteTaskButton.textContent = 'Delete';
      deleteTaskButton.listId = listId;
      deleteTaskButton.taskId = taskId;
      deleteTaskButton.addEventListener('click', deleteTask);
      taskContainer.appendChild(deleteTaskButton);
  
      taskListContainer.appendChild(taskContainer);
  
    }
  
    //function to edit the specific task
    function editTask(event) {
        //var listId = event.target.listId;
        var task = event.target.task;
        var taskId = task.getTaskId();
        var taskContainer = document.getElementById(taskId);
        var editTaskContainer = document.getElementById('editTask_'+taskId);
    
        if(!editTaskContainer){
            editTaskContainer = createEditTaskContainer(task);
            taskContainer.appendChild(editTaskContainer);
        } else {
            document.getElementById('editTask_'+taskId).value = task.getTaskDetails();
        }
    
        document.getElementById('editTask_'+taskId).focus();
    
        hideElement(taskContainer.childNodes[1]);
        showElement(taskContainer.childNodes[3]);
    
    }

    //function to create a edit element for the edited task
    function createEditTaskContainer(task){
      var taskId = task.getTaskId();
      var editTaskElement, editTaskDetails
      //var doneButton;

      editTaskElement = document.createElement('div');
      editTaskElement.setAttribute('id', 'editTaskElement_'+taskId);
      editTaskElement.setAttribute('class', 'edit-task-element');

      editTaskDetails = document.createElement('textarea');
      editTaskDetails.setAttribute('id', 'editTask_'+taskId);
      editTaskDetails.setAttribute('class', 'edit-task-input floatLeft');
      editTaskDetails.value = task.getTaskDetails();
      editTaskDetails.task = task;
      editTaskDetails.addEventListener('keypress', handleEditTaskEnterKey);
      //editTaskDetails.addEventListener('keydown', autosize);
      editTaskElement.appendChild(editTaskDetails);

    //   doneButton = document.createElement('button');
    //   doneButton.setAttribute('class', 'task-done-button');
    //   doneButton.textContent = 'Done';
    //   doneButton.task = task;
    //   doneButton.addEventListener('click', saveEditTask);
    //   editTaskElement.appendChild(doneButton);

      return editTaskElement;
    }

  
    //function to save the new entered task details in the task object and in the UI
    function saveEditTask(event){
      var selectedTask = event.target.task;
      var taskId = selectedTask.getTaskId();
      var editTaskElement = document.getElementById('editTask_'+taskId);
      var newTaskDetails = editTaskElement.value;
      var taskContainer = document.getElementById(taskId);

      if(newTaskDetails) {
        selectedTask.setTaskDetails(newTaskDetails);
        document.getElementById('details_'+taskId).innerHTML = newTaskDetails;
    
        showElement(taskContainer.childNodes[1]);
        hideElement(taskContainer.childNodes[3]);
      }
    }
     
    //function to mark task as done by adding linethrough class to the details
    function taskChecked(event) {
      var currentTask = event.target.task;
      var taskId = currentTask.getTaskId();
      var checkboxStatus = event.target.checked;
      var taskDetails = document.getElementById('details_'+taskId);
  
      if(!checkboxStatus) {
        taskDetails.classList.remove('taskLineThrough');
      } else {
        taskDetails.classList.add('taskLineThrough');
      }
      
    }
  
    //function to delete the specific task
    function deleteTask(event) {
      var currentListId = event.target.listId;
      var currentTaskId = event.target.taskId;
      var list = todoList[currentListId];
  
      if (list) {
        list.removeTask(currentTaskId);
        removeElement(currentTaskId);
      }
    }
  
    //function to delete specific list
    function deleteList(event) {
      var selectedList = event.target;
      var listId = selectedList.listId;
      var list = todoList[listId];
      var listTaskContainerId = "tasks_"+listId; 
  
      if (list){
        delete todoList[listId];
        removeElement(listId);
        removeElement(listTaskContainerId);
      }
    }
  
    //remove the element from the UI
    function removeElement(id){
      var listDiv = document.getElementById(id);
      var parentDiv = listDiv.parentElement;
  
      parentDiv.removeChild(listDiv);
    }
  
    //function to show the hidden element
    function showElement(element) {
      element.classList.remove('hide');
      element.classList.add('show');
    } 
   
    //function to hide the displayed element
    function hideElement(element){
      element.classList.remove('show');
      element.classList.add('hide');
    }

    // function autosize(){
    //   var el = this;  
    //   setTimeout(function(){
    //     el.style.cssText = 'height:20px; padding:0';
    //     el.style.cssText = 'height:' + el.scrollHeight + 'px';
    //   },0);
        
    // }
  
    //revealing modular pattern, only exposing certain methods to the user.
    return {
      handleListEnterKey: handleListEnterKey,
      addList: addList
    }
  
  }();