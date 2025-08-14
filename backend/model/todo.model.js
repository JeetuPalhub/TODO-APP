import mongoose from "mongoose" // Helps us talk to the MongoDB database

// Make a blueprint (schema) for how a todo should look
const todoSchema = new mongoose.Schema({
    text: {
        type: String, // The todo task is written as text
        required: true // We must have it
    },
    completed: {
        type: Boolean, // True or false → is the todo done?
        required: true // We must have it
    }
})

// Make a "Todo" collection in the database using the blueprint
const Todo = mongoose.model("Todo", todoSchema)

// Share Todo so other files can use it
export default Todo
