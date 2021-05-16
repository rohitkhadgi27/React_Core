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

CREATE TABLE Store (
    Id int IDENTITY(1,1) PRIMARY KEY,
    Name varchar(50),
	Address varchar(50)
);

CREATE TABLE Product (
    Id int IDENTITY(1,1) PRIMARY KEY,
    Name varchar(50),
	Price int
);

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

	  

