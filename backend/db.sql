-- Create database and table
CREATE DATABASE todo_db;

\c todo_db

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE
);

-- Sample data
INSERT INTO todos (title, completed) VALUES
('Finish assignment', false),
('Review PR', true);
