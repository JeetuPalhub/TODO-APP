import express from "express" // Helps us make routes for our app
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controller/todo.controller.js" // Bring in functions that do todo work

const router = express.Router() // Make a small box to keep our todo routes

router.post("/create", createTodo) // When someone sends new todo data, run createTodo
router.get("/fetch", getTodos) // When someone asks for todos, run getTodos
router.put("/update/:id", updateTodo) // When someone changes a todo by its id, run updateTodo
router.delete("/delete/:id", deleteTodo) // When someone deletes a todo by its id, run deleteTodo

export default router // Share this todo routes box with the rest of the app
