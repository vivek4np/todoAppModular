define([], function() {

  /*A private constructor function from which we can create multiple lists and each individual list will have
  their own id, name and a task list.*/
  var List = function (listName){

    //private static variable intialized once and used to generate list Id.
    var listIdGenerator = 0;

    //function to generate listId for every new list creation.
    function generateListId() {
      return listIdGenerator += 1;
    }

    /*here we are returning the properties of the list which are Id, name and task list.
    we are using object to store tasks as we need to delete the task */
    this.id = 0;
    this.name = '';
    this.taskList = {};

    this.setListId(generateListId());
    this.setListName(listName);
  };
  
  List.prototype = {

    //List Id setter and getter
    setListId(listId) {
      this.id = listId;
    },
    getListId(){
      return this.id;
    },

    //List Name setter (if no name given to the list by user, then the name will be 'No Name') and getter
    setListName(listName){
      this.name = listName || 'No Name';
    },
    getListName(){
      return this.name;
    },

    //Add and Remove task to the list
    addTask(newTask){
      this.taskList[newTask.getTaskId()] = newTask;
    },
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
  
  //function to add new list to the main todoList object and call createList function to create the list element.
  function createListItem(listName) {
    return new List(listName);
  }

  return {
    createListItem
  };
});