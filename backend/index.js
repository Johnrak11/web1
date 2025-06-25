const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todo_db",
  password: "password",
  port: 5432,
});

app.get("/api/todos", async (req, res) => {
  const result = await pool.query("SELECT * FROM todos ORDER BY id");
  res.json(result.rows);
});

app.post("/api/todos", async (req, res) => {
  const { title } = req.body;
  const result = await pool.query(
    "INSERT INTO todos(title, completed) VALUES($1, false) RETURNING *",
    [title]
  );
  res.json(result.rows[0]);
});

app.put("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const result = await pool.query(
    "UPDATE todos SET title=$1, completed=$2 WHERE id=$3 RETURNING *",
    [title, completed, id]
  );
  res.json(result.rows[0]);
});

app.delete("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM todos WHERE id=$1", [id]);
  res.sendStatus(204);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
