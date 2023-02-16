-- Active: 1676573623983@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO users (id, name, email, password)
VALUES
    ("u001", "Darth Vader", "vader@email.com", "vader123"),
    ("u002", "Luke Skywalker", "luke@email.com", "luke123"),
    ("u003", "Han Solo", "hansolo@email.com", "hansolo123");

SELECT * FROM users;