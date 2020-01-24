define(["./baseElements"], function(baseElements) {
  function createTaskTextInput() {
    var taskInputImageElement = document.getElementById("taskImageInput");
    var taskInputTextElement;

    if (document.body.contains(taskInputImageElement)) {
      taskInputImageElement.parentNode.removeChild(taskInputImageElement);

      taskInputTextElement = document.createElement("input");
      taskInputTextElement.setAttribute("type", "text");
      taskInputTextElement.setAttribute("class", "task-text-input");
      taskInputTextElement.setAttribute("id", "taskTextInput");
      taskInputTextElement.setAttribute(
        "placeholder",
        "Enter the task details..."
      );

      baseElements.DOMStrings.taskInputArea.appendChild(taskInputTextElement);

      return taskInputTextElement;
    }
  }

  function createTaskImageInput() {
    var taskInputTextElement = document.getElementById("taskTextInput");
    var taskInputImageElement;

    if (document.body.contains(taskInputTextElement)) {
      taskInputTextElement.parentNode.removeChild(taskInputTextElement);

      taskInputImageElement = document.createElement("input");
      taskInputImageElement.setAttribute("type", "file");
      taskInputImageElement.setAttribute("class", "task-image-input");
      taskInputImageElement.setAttribute("id", "taskImageInput");
      taskInputImageElement.setAttribute("accept", "image/*");

      baseElements.DOMStrings.taskInputArea.appendChild(taskInputImageElement);

      return taskInputImageElement;
    }
  }

  return {
    createTaskTextInput,
    createTaskImageInput
  };
});
