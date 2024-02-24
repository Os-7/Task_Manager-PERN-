CREATE DATABASE perntodo;

CREATE TABLE todo (
  todo_id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  start_date DATE,
  end_date DATE,
  status VARCHAR(50)
);
