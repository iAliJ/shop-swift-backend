# shop-swift-backend

# E-Commerce wholsale App Backend 

Backend server for the shop swift app which is an e-commerce platform for whole products sale.
The server is responsible for user logins, verification and performing the CRUD operations on the database.
Server is powered by ExpressJS and MongoDB which is part of the MERN Stack whcih the app was built on.

## Entity Relationship Diagram: 
![ERD](https://github.com/iAliJ/shop-swift-backend/assets/47180374/81e48a28-2fc2-4b77-9fca-fa58f345c1bd)

## Trello User Stories

https://trello.com/invite/b/UtTfIwLI/ATTIf59d66b3dac62e0f4170e2a008c980e8E2D7E8B2/wholesale-app

## Platform Map: 

### User (Buyer / Seller)

Is the customer or client of shops, Consists of: 
* First Name
* Last Name 
* Phone number 
* Email 
* Password
* User Role (Buyer or Seller)
* 
### Products

Are the goods to be sold by the shop, Consists of: 
* Image
* Name
* Price
* Description
* Quantity 

### Features

* Backend user and role authentication
* CRUD Operations for Users, products, stores, carts, orders

## Future Plans

* Add admin role and access
* crop images uploaded to cloudinary
* images size verification and limitation
* implement a better search engine for products

## Project Requirements

Intiate .env file `touch .env` in project root directory and add the following enviroments
```
MONGO_DB_URI= Mongo DB Database connection string
CLOUDINARY_URL= Cloudinary API key
SECRET= Secret string for the JWT verification
```
install required dependencies `npm i`, these dependencies are:
* bcrypt
* cloudinary
* dotenv
* express
* jsonwebtoken
* mongoose
* multer
