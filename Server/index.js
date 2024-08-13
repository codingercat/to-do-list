const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todos');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB URI
const uri = process.env.URI;
console.log("MongoDB URI:", uri);  // Add this line to debug
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));


// Route to get all tasks
app.get('/get', async (req, res) => {
  try {
    console.log("Fetching tasks from the database...");
    const tasks = await TodoModel.find(); // Fetch all tasks from the database
    console.log("Tasks fetched:", tasks);

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }
    return res.status(200).json(tasks);
  } catch (err) {
    console.error("Error in /get endpoint:", err);
    return res.status(500).send("Some error occurred on the server");
  }
});


app.put('/update/:id', (req,res)=>{
  const {id} = req.params;
  console.log(id);
  TodoModel.findByIdAndUpdate({_id: id}, {done: true})
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
  const {id} = req.params;
  TodoModel.findByIdAndDelete({_id : id})
  .then(result => res.json(result))
  .catch(err => res.json(err))

})


// Route to add a task
app.post('/add', async (req, res) => {
  const { task } = req.body;
  console.log("Received task:", task);

  if (!task) {
    return res.status(400).send("No task present");
  }

  try {
    const newTask = new TodoModel({ task: task });
    const savedTask = await newTask.save();
    console.log("Task saved:", savedTask);
    return res.status(200).json(savedTask);
  } catch (e) {
    console.log("Error saving task:", e);
    return res.status(500).send("Some error occurred");
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});