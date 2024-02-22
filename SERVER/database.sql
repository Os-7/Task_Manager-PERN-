CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    description VARCHAR(255),
    start_date DATE,
    end_date DATE,
    status VARCHAR(20)
);