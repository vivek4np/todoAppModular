define([], function() {
  var taskInputArea = document.querySelector(".task-input-container");

  function createTaskTextInput() {
    var taskInputImageElement = document.querySelector(".task-image-input");

    if (document.body.contains(taskInputImageElement)) {
      taskInputImageElement.parentNode.removeChild(taskInputImageElement);

      var taskInputTextElement = document.createElement("input");
      taskInputTextElement.setAttribute("type", "text");
      taskInputTextElement.setAttribute("class", "task-text-input");
      taskInputTextElement.setAttribute("id", "taskTextInput");
      taskInputTextElement.setAttribute(
        "placeholder",
        "Enter the task details..."
      );

      taskInputArea.appendChild(taskInputTextElement);
    }
  }

  function createTaskImageInput() {
    var taskInputTextElement = document.querySelector(".task-text-input");

    if (document.body.contains(taskInputTextElement)) {
      taskInputTextElement.parentNode.removeChild(taskInputTextElement);

      var taskInputImageElement = document.createElement("input");
      taskInputImageElement.setAttribute("type", "file");
      taskInputImageElement.setAttribute("class", "task-image-input");
      taskInputImageElement.setAttribute("id", "taskImageInput");
      taskInputImageElement.setAttribute("accept", "image/*");

      taskInputArea.appendChild(taskInputImageElement);
    }
  }

  return {
    createTaskTextInput,
    createTaskImageInput
  };
});
