define([], function() {
  /*A private constructor function from which we can create multiple lists and each individual list will have
  their own id, name and a task list.*/
  var List = function(listName) {
    this.id = 0;
    this.name = "";
    this.taskList = {};

    this.setListId(List.generateListId());
    this.setListName(listName);
  };

  List.listIdGenerator = 0;

  List.generateListId = function() {
    return (this.listIdGenerator += 1);
  };

  List.prototype = {
    //List Id setter and getter
    setListId(listId) {
      this.id = listId;
    },
    getListId() {
      return this.id;
    },

    //List Name setter (if no name given to the list by user, then the name will be 'No Name') and getter
    setListName(listName) {
      this.name = listName || "No Name";
    },
    getListName() {
      return this.name;
    },

    //Add and Remove task to the list
    addTask(newTask) {
      this.taskList[newTask.getTaskId()] = newTask;
    },
    removeTask(id) {
      if (this.taskList[id]) {
        return delete this.taskList[id];
      }
    },

    //Task object getter
    getTaskList() {
      return this.taskList;
    }
  };

  //function to add new list to the main todoList object and call createList function to create the list element.
  function createListItem(listName) {
    return new List(listName);
  }

  return {
    createListItem
  };
});
