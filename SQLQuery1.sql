CREATE TABLE Customer (
    Id int IDENTITY(1,1) PRIMARY KEY,
    Name varchar(50) NOT NULL,
    Address varchar(50)
);

INSERT INTO Customer (Name,Address)
VALUES ('Rohit', 'NoosaHeads'),
	   ('Bob', 'BoxHill'),
	   ('Thomas', 'TownHill'),
	   ('Nabbu', 'Nambour'),
	   ('Karishma', 'karakin'),
	   ('Arron', 'Strathfield'),
	   ('Litzie', 'Banksia'),
	   ('Tom', 'Casurina'),
	   ('Thelma', 'Darwinia')

SELECT * FROM Customer

CREATE TABLE Sales (
    Id int IDENTITY(1,1) PRIMARY KEY,
    ProductId int ,
	CustomerId int ,
	StoreId int,
	DateSold date
);

INSERT INTO Sales (ProductId,CustomerId,StoreId,DateSold)
VALUES (1, 1, 4, GETDATE()),
	   (4, 3, 4, GETDATE())
	
	  
	   
SELECT * FROM Sales


CREATE TABLE Store (
    Id int IDENTITY(1,1) PRIMARY KEY,
    Name varchar(50),
	Address varchar(50)
);

SELECT * FROM Store


CREATE TABLE Product (
    Id int IDENTITY(1,1) PRIMARY KEY,
    Name varchar(50),
	Price int
);

SELECT * FROM Product


INSERT INTO Product (Name,Price)
VALUES ('Mobile', 1500),
	   ('TV', 3000),
	   ('Laptop', 2000),
	   ('Fridge', 700),
	   ('Microwave', 400),
	   ('AirFryer', 250),
	   ('Soundbar', 500),
	   ('HeadPhone', 220)

SELECT * FROM Product

	  

SELECT Customer.name as Customer, Product.name as Product, Store.name as Store, Sales.DateSold as Date
FROM Sales
INNER JOIN Customer ON Sales.CustomerId = Customer.Id
INNER JOIN Product ON Sales.ProductId = Product.Id
INNER JOIN Store ON Sales.StoreId = Store.Id
	
