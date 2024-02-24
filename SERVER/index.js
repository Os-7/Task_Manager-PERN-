const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request body

// Routes

// Create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description, endDate, status } = req.body;
    const startDate = new Date(); // Get current date

    // Generate title based on the number of existing todos
    const { rowCount } = await pool.query("SELECT * FROM todo");
    const title = `Todo ${rowCount + 1}`;

    const newTodo = await pool.query(
      "INSERT INTO todo (title, description, start_date, end_date, status) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [title, description, startDate, endDate, status]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, endDate, status } = req.body;

    const updateTodo = await pool.query(
      "UPDATE todo SET end_date = $1, status = $2, description = $3 WHERE todo_id = $4",
      [endDate, status, description, id]
    );

    res.json({ message: "Todo was updated!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json({ message: "Todo was deleted!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
