define([], function(){
  /*A private constructor function from which we can create multiple tasks and each individual task will have
  their own id and name.*/
  var Task = function(taskDetails) {
  
    //private static variable intialized once and used to generate task Id.
    var taskIdGenerator = 100;

    //function to generate task Id for every new task creation.
    function generateTaskId(){
      return taskIdGenerator += 1;
    }

    //here we are returning the properties of the task which are Id and name.
    this.id = 0;
    this.details = '';
    this.checked = false;

    this.setTaskId(generateTaskId());
    this.setTaskDetails(taskDetails);
  };
  
  Task.prototype = {
      
    //task Id setter and getter
    setTaskId(taskId){
      this.id = taskId;
    },
    getTaskId(){
      return this.id;
    },

    //task name setter and getter
    setTaskDetails(taskDetails){
      this.details = taskDetails;
    },
    getTaskDetails(){
      return this.details;
    },

    //task status setter and getter
    setTaskCheck(taskCheck) {
      this.checked = taskCheck;
    },
    getTaskCheck() {
      return this.checked;
    }
  }

  //function to add task to the active list and also add it to the task list object. It also calls create task function which creates tasks in the UI.
  function createTaskItem(taskDetails) {
    var newTask;

    if(taskDetails){
      newTask = new Task(taskDetails);
      return newTask;
    }
  }

  return {
    createTaskItem
  }
})