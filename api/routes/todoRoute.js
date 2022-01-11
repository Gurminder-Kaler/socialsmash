const express = require("express");
const router = express.Router();
const todoController = require("@controllers/todoController");

router.post("/saveTodo", todoController.saveTodo);

router.post("/updateTodo", todoController.updateTodo);

router.post("/getAllTodos", todoController.getAllTodos);

router.post("/getATodoViaId", todoController.getATodoViaId);

router.post("/getAllTodosViaUserId", todoController.getAllTodosViaUserId);

router.post("/deleteTodo", todoController.deleteTodo);

module.exports = router;
