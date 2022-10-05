const express = require('express');
const app = express();
const pool = require('./db');

app.use(express.json());

// get all todos

app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');

    res.json(allTodos.rows);
  } catch (err) {
    console.log(err);
  }
});

// get a todo

app.get('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await pool.query(
      'SELECT * FROM todo WHERE todo_id = $1',
      [id]
    );

    res.json(todo.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

// create a todo

app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES ($1) RETURNING *',
      [description]
    );

    res.json(newTodo);
  } catch (err) {
    console.log(err);
  }
});

// update a todo

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params; // WHERE
  const { description } = req.body; // SET
  try {
    const updateTodo = await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id = $2',
      [description, id]
    );

    res.json('todo was updated!');
  } catch (err) {
    console.log(err);
  }
});

// delete a todo

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params; // WHERE
  try {
    const deleteTodo = await pool.query(
      'DELETE FROM todo WHERE todo_id = $1',
      [id]
    );

    res.json('todo was deleted!');
  } catch (err) {
    console.log(err);
  }
});

app.listen(3333, () => {
  console.log('server is listening on port 3333');
});
