const {
  saveTodoServiceFunc,
  updateTodoServiceFunc,
  getATodoViaIdServiceFunc,
  getAllTodosViaUserIdServiceFunc,
  getAllTodosServiceFunc,
  deleteTodoServiceFunc,
} = require("@services/todoService");
//async await should not be put into loop so refactoring of code cannot be done further than this

//@private
//@usage : save Todo
exports.saveTodo = async (req, res) => {
  try {
    return await saveTodoServiceFunc(req, res);
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

//@private
//@usage update post in db
exports.updateTodo = async (req, res) => {
  try {
    return await updateTodoServiceFunc(req, res);
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

//@private
//@usage get all the posts from the database via userId.
exports.getAllTodosViaUserId = async (req, res) => {
  try {
    return await getAllTodosViaUserIdServiceFunc(req, res);
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

//@private
//@usage get single post via Id
exports.getATodoViaId = async (req, res) => {
  try {
    return await getATodoViaIdServiceFunc(req, res);
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

//@private
//@usage getAllTodos
exports.getAllTodos = async (req, res) => {
  try {
    return await getAllTodosServiceFunc(req, res);
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

//@private
//@usage deleteTodo
exports.deleteTodo = async (req, res) => {
  try {
    return await deleteTodoServiceFunc(req, res);
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
};
