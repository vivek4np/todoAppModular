define([], function(){

  /*function to create task element and display in the UI
  1. select the task list container below the task input area.
  2. create a div for each task which will contain checkbox, task details, and delete button.*/
  function createTaskUI(task, list) {
    var taskDetailsContainer, taskDetails, taskButtonDiv, deleteTaskButton;
    var listId = list.getListId();
    var taskId = task.getTaskId();
    var tasksContainer = document.getElementById('tasks_'+listId);

    //the element which contains all the elements of each task
    taskDetailsContainer = document.createElement('div');
    taskDetailsContainer.setAttribute('class', 'task-details-container');
    taskDetailsContainer.setAttribute('id', taskId);

    //the element to mark the task completed
    taskCheckBox = document.createElement('input');
    taskCheckBox.setAttribute('type', 'checkbox');
    taskCheckBox.setAttribute('class', 'task-checkbox');
    taskCheckBox.setAttribute('id', 'taskCheckbox_'+taskId);
    taskDetailsContainer.appendChild(taskCheckBox);

    //the element which contains details of the task
    taskDetails = document.createElement('span');
    taskDetails.setAttribute('class', 'task-details');
    taskDetails.setAttribute('id', 'details_'+taskId);
    taskDetails.innerHTML = task.getTaskDetails();
    taskDetailsContainer.appendChild(taskDetails);

    //this div contains delete button
    taskButtonDiv = document.createElement('div');
    taskButtonDiv.setAttribute('class', 'task-button-div floatRight');

    //button to delete the specific task
    deleteTaskButton = document.createElement('button');
    deleteTaskButton.setAttribute('class', ' delete-task-button');
    deleteTaskButton.textContent = 'Delete';
    taskButtonDiv.appendChild(deleteTaskButton);

    taskDetailsContainer.appendChild(taskButtonDiv)

    tasksContainer.appendChild(taskDetailsContainer);
  }

  //function to edit the specific task
  function editTask(taskId){
    var taskDetails = document.getElementById('details_'+taskId);

    taskDetails.setAttribute('contenteditable', 'true');
  }
  
  //function to mark task as done by adding linethrough class to the details
  function taskCheckedUI(taskId, checkboxStatus) {
    // var currentTask = event.target.task;
    //var taskId = task.getTaskId();
    //var checkboxStatus = event.target.checked;
    var taskDetails = document.getElementById('details_'+taskId);

    if(!checkboxStatus) {
      taskDetails.classList.remove('taskLineThrough');
    } else {
      taskDetails.classList.add('taskLineThrough');
    }
  }

  //function to delete the specific task
  function deleteTaskUI(taskId) {
    if (taskId) {
      var taskDetailsContainer = document.getElementById(taskId);
      taskDetailsContainer.parentNode.removeChild(taskDetailsContainer);
    }
  }

  //function to clear the task input fields
  function clearTaskInput(inputTaskElement) {
    inputTaskElement.value = '';
    inputTaskElement.focus();
  }


  return {
    createTaskUI,
    editTask,
    taskCheckedUI,
    deleteTaskUI,
    clearTaskInput
  };
})