define([], function(){
  /*A private constructor function from which we can create multiple tasks and each individual task will have
  their own id and name.*/
  var Task = function(taskDetails) {

    this.id = 0;
    this.details = '';
    this.checked = false;

    this.setTaskId(Task.generateTaskId());
    this.setTaskDetails(taskDetails);
  };

  Task.taskIdGenerator = 100;

  Task.generateTaskId = function() {
    return this.taskIdGenerator += 1;
  }
  
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
      return new Task(taskDetails);
    }
  }

  return {
    createTaskItem
  }
})