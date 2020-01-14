define([], function(){

  var currentShowingTasksList, currentListContainer;

  /*function to create list element to display in the UI
  1. Select the left section where all list names are displayed
  2. List Title Container (which contains the name of the list and a delete button to delete the list)
  3. It also also calls the function which creates task container on the right section as the new list is created.*/
  function createListUI(list){

    var listArea, listTitleContainer, listTitle, listButtonDiv, deleteListButton;
    var listId = list.getListId();

    //list area is the left section on the UI where all the list name are displayed
    listArea = document.querySelector('.list-area');

    //This element contains the list name and the delete button
    listTitleContainer = document.createElement('div');
    listTitleContainer.setAttribute('class', 'list-title-container')
    listTitleContainer.setAttribute('id', listId);

    //This contains the list name
    listTitle = document.createElement('div')
    listTitle.setAttribute('class', 'list-title');
    listTitle.innerHTML = list.getListName();
    listTitle.listId = listId;
    listTitleContainer.appendChild(listTitle);

    //This contains delete button
    listButtonDiv = document.createElement('div');
    listButtonDiv.setAttribute('class', 'list-button-div floatRight');

    //Button to delete the list
    deleteListButton = document.createElement('button');
    deleteListButton.setAttribute('class', 'delete-list-button');
    deleteListButton.textContent = 'Delete';
    listButtonDiv.appendChild(deleteListButton);

    listTitleContainer.appendChild(listButtonDiv);

    listArea.appendChild(listTitleContainer);

    //creates the task container on the right section.
    createTaskContainerUI(listId);
  }

  /*function to create the task container on the UI for each list which is hidden when the list is created, which is
  displayed when user clicks on the list title container, this contains tasks list container which contains all tasks of active list.*/
  function createTaskContainerUI(listId){

    var taskArea, taskListContainer;

    //task area is the right section on the UI where we display all the tasks and task input area.
    taskArea = document.querySelector('.task-area');

    //tasks list container which contians all the task of the active list
    taskListContainer = document.createElement('div');
    taskListContainer.setAttribute('class', 'task-list-container hide');
    taskListContainer.setAttribute('id', 'tasks_'+listId);
    taskArea.appendChild(taskListContainer);
  }

  //function to show the task container of the active list
  function showTaskContainerUI(currentListId) {
    
    if (currentShowingTasksList && currentListContainer) {
      currentShowingTasksList.classList.remove('show');
      currentListContainer.classList.remove('active-list');
      currentShowingTasksList.classList.add('hide');
    }

    var tasksListToShow = document.getElementById('tasks_'+currentListId);
    var activeListContainer = document.getElementById(currentListId)

    tasksListToShow.classList.remove('hide');
    tasksListToShow.classList.add('show');
    activeListContainer.classList.add('active-list');
    currentShowingTasksList = tasksListToShow;
    currentListContainer = activeListContainer;
  }

  //function to delete specific list
  function deleteListUI(listId) {
    var listContainer = document.getElementById(listId);
    var listTaskContainer = document.getElementById("tasks_"+listId);

    if (listId) {
      listContainer.parentNode.removeChild(listContainer);
      listTaskContainer.parentNode.removeChild(listTaskContainer);
    }
  }

  //function to clear the list input field
  function clearListInput(inputListElement) {
    inputListElement.value = '';
    inputListElement.focus();
  }

  return {
    createListUI,
    clearListInput,
    deleteListUI,
    showTaskContainerUI
  };
});