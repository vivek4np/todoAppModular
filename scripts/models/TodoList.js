define([], function(){
    var todoLists = {};

    function addList(list) {
        todoLists[list.getListId()] = list;
    }

    function deleteList(listId) {
        delete todoLists[listId];
    }

    function getList(listId) {
        return todoLists[listId];
    }

    return {
        addList,
        deleteList,
        getList
    }
})