CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(60) NOT NULL,
	department_name VARCHAR(60) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER,
	PRIMARY KEY(id)
); 

ALTER TABLE products
ADD COLUMN product_sales DECIMAL(10,2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Echo Dot", "Electronics", 49.99, 15), ("Walki-Talki", "Electronics", 35.79, 20), ("Vitamins", "Health and Beauty", 5.99, 10), ("Playstation", "Electronics", 299.99, 5), ("Massager", "Health and Beauty", 25.25, 10), ("Red Beans", "Grocery", 4.99, 34), ("Taco Shells", "Grocery", 6.49, 53), ("Nike Trainers", "Shoes", 45.99, 12), ("Flip Flops", "Shoes", 19.89, 23), ("Nintendo Wii", "Electronics", 199.99, 65);


CREATE TABLE departments(
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
	department_name VARCHAR(60) NOT NULL,
	over_head_costs DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER,
	PRIMARY KEY(id)
); 
