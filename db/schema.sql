DROP DATABASE IF EXISTS grocery_db;
CREATE DATABASE grocery_db;
USE grocery_db;
CREATE TABLE users(
  id int NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(255) NOT NULL,
  pass VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
  );
CREATE TABLE groceries(
  id int NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  price DECIMAL(4,2) NOT NULL,
  inventory INT NOT NULL,
  image VARCHAR(255) NOT NULL
  PRIMARY KEY (id)
);
CREATE TABLE cart(
  id int NOT NULL AUTO_INCREMENT,
  -- add this later to handle different users: user_id int NOT NULL,
  grocery_id int NOT NULL,
  amt int NOT NULL, 
  PRIMARY KEY (id),
  -- FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (grocery_id) REFERENCES groceries(id)
)