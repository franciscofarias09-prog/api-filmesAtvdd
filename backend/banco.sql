CREATE DATABASE backlog_filmes;
USE backlog_filmes;

CREATE TABLE filmes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100),
  genero VARCHAR(50)
);
