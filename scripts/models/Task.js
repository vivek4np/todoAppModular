define([], function() {
  /*A private constructor function from which we can create multiple tasks and each individual task will have
  their own id and name.*/
  var Task = function(taskType) {
    this.id = 0;
    this.type = "";
    this.completed = false;

    this.setTaskId(Task.generateTaskId());
    this.setTaskType(taskType);
  };

  Task.taskIdGenerator = 100;

  Task.generateTaskId = function() {
    return (this.taskIdGenerator += 1);
  };

  Task.prototype = {
    //task Id setter and getter
    setTaskId(taskId) {
      this.id = taskId;
    },
    getTaskId() {
      return this.id;
    },

    //task name setter and getter
    setTaskType(taskType) {
      this.type = taskType;
    },
    getTaskType() {
      return this.type;
    },

    //task status setter and getter
    setTaskCompleted(taskCompleted) {
      this.completed = taskCompleted;
    },
    getTaskCompleted() {
      return this.completed;
    }
  };

  // Function if the type of task is text
  var TextTask = function(taskText, taskType) {
    Task.call(this, taskType);
    this.text = "";

    this.setTaskText(taskText);
  };

  TextTask.prototype = Object.create(Task.prototype);

  TextTask.prototype.getTaskText = function() {
    return this.text;
  };

  TextTask.prototype.setTaskText = function(taskText) {
    this.text = taskText;
  };

  // function if the type of task is image
  var ImageTask = function(taskImage, taskType) {
    Task.call(this, taskType);
    this.image = "";

    this.setTaskImage(taskImage);
  };

  ImageTask.prototype = Object.create(Task.prototype);

  ImageTask.prototype.getTaskImage = function() {
    return this.image;
  };

  ImageTask.prototype.setTaskImage = function(taskImage) {
    this.image = taskImage;
  };

  //function to add task to the active list and also add it to the task list object. It also calls create task function which creates tasks in the UI.
  function createTaskItem(taskDetails, taskType) {
    if (taskDetails) {
      if (taskType === "image") {
        return new ImageTask(taskDetails, taskType);
      } else {
        return new TextTask(taskDetails, taskType);
      }
    }
  }

  return {
    createTaskItem
  };
});
