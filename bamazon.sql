DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50),
  department VARCHAR(50),
  price INT,
  stock_quantity INT,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department, price, stock_quantity)
VALUES ("hoodie", "clothing", 20.00, 5);

INSERT INTO products (product_name, department, price, stock_quantity)
VALUES ("shirt", "clothing", 10.00, 20);

INSERT INTO products (product_name, department, price, stock_quantity)
VALUES ("jeans", "clothing", 15.00, 10);

INSERT INTO products (product_name, department, price, stock_quantity)
VALUES ("red chucks", "shoes", 20.00, 5);

INSERT INTO products (product_name, department, price, stock_quantity)
VALUES ("blue chucks", "shoes", 20.00, 5);

INSERT INTO products (product_name, department, price, stock_quantity)
VALUES ("notebook", "school supplies", 2.00, 10);

INSERT INTO products (product_name, department, price, stock_quantity)
VALUES ("pen", "school supplies", 1.00, 20);

INSERT INTO products (product_name, department, price, stock_quantity)
VALUES ("binder", "school supplies", 3.00, 5);

INSERT INTO products (product_name, department, price, stock_quantity)
VALUES ("laptop", "school supplies", 50.00, 10);

INSERT INTO products (product_name, department, price, stock_quantity)
VALUES ("highlighter", "school supplies", 1.00, 15);
