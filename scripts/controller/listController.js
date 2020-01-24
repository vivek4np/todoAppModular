define([
  "../models/TodoList",
  "../models/List",
  "../views/listView",
  "../views/baseElements"
], function(todolistMethods, listMethods, listUIMethods, baseElements) {
  // Controlling all the actions in left panel
  function ctrlAddListItem() {
    var listName = baseElements.DOMStrings.listNameInput.value;
    // Add list Item to the List Module
    var newList = listMethods.createListItem(listName);
    todolistMethods.addList(newList);

    // Add list to the UI
    listUIMethods.createListUI(newList);

    //Clear the List Input Element
    listUIMethods.clearListInput(baseElements.DOMStrings.listNameInput);

    if (baseElements.DOMStrings.listArea.childElementCount === 1) {
      listUIMethods.showTaskContainerUI(newList);
    }
  }

  function ctrlShowTaskContainer(listId) {
    var list = todolistMethods.getList(listId);

    //Show the active list in the UI
    listUIMethods.showTaskContainerUI(list);
  }

  function ctrlDeleteListItem(event) {
    var listId = event.target.parentNode.parentNode.id;
    var list = todolistMethods.getList(listId);
    var listActiveStatus = list.getActiveListStatus();
    var todoListKeys = Object.keys(todolistMethods.getTodoList());
    var listIndex = todoListKeys.indexOf(listId);
    var activeListId;

    // Delete List from the data structure
    todolistMethods.deleteList(listId);

    // Delete List from the UI
    listUIMethods.deleteListUI(listId);

    if (listActiveStatus) {
      if (listIndex > 0) {
        activeListId = todoListKeys[listIndex - 1];
      } else if (listIndex == 0) {
        activeListId = todoListKeys[listIndex + 1];
      }
      ctrlShowTaskContainer(activeListId);
    }
  }

  return {
    ctrlAddListItem,
    ctrlShowTaskContainer,
    ctrlDeleteListItem
  };
});
