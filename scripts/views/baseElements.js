define([], function() {
  var DOMStrings = {
    addListButton: document.getElementById("addListButton"),
    listNameInput: document.getElementById("listNameInput"),
    listArea: document.querySelector(".list-area"),
    addTaskButton: document.getElementById("addTaskButton"),
    taskTypeSelect: document.getElementById("taskTypeSelect"),
    taskArea: document.querySelector(".task-area"),
    taskTextInput: document.getElementById("taskTextInput"),
    taskImageInput: document.getElementById("taskImageInput"),
    taskInputArea: document.querySelector(".task-input-container")
  };

  return {
    DOMStrings
  };
});
