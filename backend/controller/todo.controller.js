import Todo from "../model/todo.model.js" // Bring in the Todo model so we can work with todos in the database

// Make a new todo
export const createTodo = async (req, res) => {
    const todo = new Todo({
        text: req.body.text, // Get todo text from what the user sent
        completed: req.body.completed // Get if todo is done or not
    })

    try {
        const newTodo = await todo.save() // Save the new todo in the database
        res.status(201).json({ message: "Todo Created Successfully", newTodo }) // Tell the user it worked
    } catch (error) {
        console.log(error) // Show error in console
        res.status(400).json({ message: "Error occuring in todo creation" }) // Tell the user it failed
    }
}

// Get all todos
export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find() // Find all todos in the database
        res.status(201).json({ message: "Todo Fetched Successfully", todos }) // Send todos back to the user
    } catch (error) {
        console.log(error) // Show error in console
        res.status(400).json({ message: "Error occuring in todo fetching" }) // Tell the user it failed
    }
}

// Update a todo by its id
export const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the updated todo, not the old one
        })
        res.status(201).json({ message: "Todo Updated Successfully", todo }) // Tell the user it worked
    } catch (error) {
        console.log(error) // Show error in console
        res.status(400).json({ message: "Error occuring in todo updating" }) // Tell the user it failed
    }
}

// Delete a todo by its id
export const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id) // Remove the todo from the database
        res.status(201).json({ message: "Todo Deleted Successfully", todo }) // Tell the user it worked
    } catch (error) {
        console.log(error) // Show error in console
        res.status(400).json({ message: "Error occuring in todo deletion" }) // Tell the user it failed
    }
}
