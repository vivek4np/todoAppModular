define([], function(){
    var todoList = {};

    function addList(list) {
        todoList[list.getListId()] = list;
    }

    function deleteList(listId) {
        delete todoList[listId];
    }

    function getList(listId) {
        return todoList[listId];
    }

    return {
        addList,
        deleteList,
        getList
    }
})