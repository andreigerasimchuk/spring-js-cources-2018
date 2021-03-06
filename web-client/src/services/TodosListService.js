import { guid, findIndex } from '../utils';

export default class TodosListService {
  constructor(todosListDAO, todoService) {
    this.todosListDAO = todosListDAO;
    this.todoService = todoService;
  }

  /**
   * @param {Object} data
   * @param {string} data.title
   * @param {string} data.description
   * @return {string}
   */
  createTodoItem(data) {
    let todoId;

    return this.todosListDAO.getAllTodos()
      .then((todos) => {
        const todo = this.todoService.createTodo(data);
        todoId = todo.id;
        const result = [...todos, todo];
        return this.todosListDAO.saveAllTodos(result);
      })
      .then(() => todoId);
  }

  /**
   * @param {string} todoId
   */
  removeTodoItem(todoId) {
    return this.todosListDAO.getAllTodos()
      .then((todos) => {
        const index = findIndex(todoId, todos);
        const result = [...todos];

        result.splice(index, 1);

        return this.todosListDAO.saveAllTodos(result);
      })
      .then(() => todoId);
  }
  /**
   * @param {string} todoId
   * @param {Object} change
   */
  updatingItem(todoId, data) {
    return this.todosListDAO.getAllTodos()
      .then((todos) => {
        const index = findIndex(todoId, todos);
        const result = [...todos];
        const target = result[index];

        const updatedTodo = this.todoService.updateTodo(data, target);

        result.splice(index, 1, updatedTodo);

        return this.todosListDAO.saveAllTodos(result);
      })
      .then(() => todoId);
  }

  /**
   * @param {string} todoId
   * @param {Boolean} isLiked
   */
  likingItem(todoId, isLiked) {
    this.updatingItem(todoId, { isLiked: !isLiked });
  }

  /**
   * @param {string} todoId
   * @param {Boolean} isCompleted
   */
  completingItem(todoId, isCompleted) {
    this.updatingItem(todoId, { isCompleted: !isCompleted });
  }

  /**
   * @param {string} todoId
   * @param {string} commentTitle
   */
  commentingItem(todoId, commentTitle) {
    return this.todosListDAO.getAllTodos()
      .then((todos) => {
        const index = findIndex(todoId, todos);

        const result = [...todos];
        const target = result[index];
        const comment = {
          id: guid(),
          title: commentTitle,
          date: new Date().toLocaleString(),
        };

        target.comments = [...target.comments, comment];

        return this.todosListDAO.saveAllTodos(result);
      })
      .then(() => todoId);
  }

  /**
   * @param {string} todoId
   * @param {string} commentId
   */
  removeComment(todoId, commentId) {
    return this.todosListDAO.getAllTodos()
      .then((todos) => {
        const index = findIndex(todoId, todos);

        const result = [...todos];
        const target = result[index];

        const indexComment = findIndex(commentId, target.comments);
        target.comments.splice(indexComment, 1);

        return this.todosListDAO.saveAllTodos(result);
      })
      .then(() => todoId);
  }
}
