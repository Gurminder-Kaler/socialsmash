const mongoose = require("mongoose");
const Todo = require("@models/todoModel");
const messages = require("@constants/messages");

const getAllTodosServiceFunc = async (req, res) => {
	console.log('page', req.body);
  let limit = req.body.page * 10;
  Todo.find().limit(limit)
    .then((result) => {
      if (result) {
      	console.log('resul', result);
        return res.json({
          status: 201,
          data: result,
          success: true,
          message: messages.SUCCESS.TODO.FETCHED,
        });
      } else {
        return res.json({
          status: 401,
          success: false,
          message: messages.FAILURE.SWW,
        });
      }
    })
    .catch((err) => {
      return res.json({
        status: 500,
        success: false,
        message: "err",
      });
    });
};

const getAllTodosViaUserIdServiceFunc = async (req, res) => {
  Todo.find({ user: req.body.userId })
    .then((result) => {
      if (result) {
        res.json({
          status: 201,
          data: result,
          success: true,
          message: messages.SUCCESS.TODO.FETCHED,
        });
      } else {
        res.json({
          status: 401,
          success: false,
          message: messages.FAILURE.SWW,
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        success: false,
        message: "err",
      });
    });
};

const getATodoViaIdServiceFunc = async (req, res) => {
  await Todo.findOne({ _id: req.body.id })
    .then((result) => {
      if (result) {
        res.json({
          status: 201,
          data: result,
          success: true,
          message: messages.SUCCESS.TODO.FETCHED,
        });
      } else {
        res.json({
          status: 401,
          success: false,
          message: messages.FAILURE.SWW,
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        success: false,
        message: "err",
      });
    });
};

const updateTodoServiceFunc = async (req, res) => {
	  console.log("res", req.body);
	  const filter = {
	    _id: req.body.id,
	  };
	  const data = {
	    name: req.body.name,
	    description: req.body.description,
	    priority: req.body.priority,
	    isActive: req.body.isActive == null || req.body.isActive == true ? true : false,
	  };
	  await Todo.findOneAndUpdate(
	    filter,
	    { $set: data },
	    {
	      Original: false,
	      useFindAndModify: false,
	    }
	  ).then((result) => {
    	console.log('result', result);
    	return res.json({
          status: 201,
          success: true,
          message: messages.SUCCESS.TODO.FETCHED,
          data: result
        });
      // if (result) {
      //   Todo.find().then((todos) => {
      //     if (todos) {
      //       return res.json({
      //         status: 201,
      //         data: todos,
      //         success: true,
      //         message: messages.SUCCESS.TODO.FETCHED,
      //       });
      //     } else {
      //       return res.json({
      //         status: 401,
      //         success: false,
      //         message: messages.FAILURE.TODO_NOT_FOUND,
      //       });
      //     }
      //   });
      // }
    }).catch((err) => {
      return res.json({
        status: 500,
        success: false,
        message: "err",
      });
    });
};

const deleteTodoServiceFunc = async (req, res) => {
  await Todo.findByIdAndDelete(req.body.id)
    .then((todo) => {
      res.json({
        status: 200,
        success: true,
        message: messages.SUCCESS.TODO.DELETED,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        success: false,
        message: err && err.message ? err.message : "",
      });
    });
};

const saveTodoServiceFunc = async (req, res) => {
  const todo = new Todo({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    priority: req.body.priority,
    isActive: req.body.isActive,
    user: req.body.userId,
  });
  todo
    .save()
    .then((todo) => {
      Todo.find().then((todos) => {
        if (todos) {
          res.json({
            status: 201,
            success: true,
            data: todos,
            message: messages.SUCCESS.TODO.CREATED,
          });
        } else {
          res.json({
            status: 401,
            success: false,
            message: messages.FAILURE.TODO_NOT_FOUND,
          });
        }
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        success: false,
        message: "err",
      });
    });
};

module.exports = {
  getAllTodosServiceFunc,
  getATodoViaIdServiceFunc,
  getAllTodosViaUserIdServiceFunc,
  updateTodoServiceFunc,
  saveTodoServiceFunc,
  deleteTodoServiceFunc,
};
