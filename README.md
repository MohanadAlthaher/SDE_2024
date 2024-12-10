Shoe E-Commerce Application
This is a web-based application for selling shoes online, designed for men, women, and children. Users can browse through different categories of shoes, add products to their cart, and make purchases. The platform also allows sellers to list their shoes for sale.
Features
  User Registration and Login: Users can register and log in to their accounts.
  Product Listings: Browse different shoe categories: Sport Shoes, Casual Shoes, Formal Shoes, Boots, and Sandals & Slippers.
  Shopping Cart: Users can add products to the shopping cart, view, and update items.
  Payment System: Secure payment gateway integration for checkout.
  Seller Dashboard: Sellers can list their shoes, manage stock, and track sales.
Tech Stack
  This project uses the following technologies:
  c
  Frontend:
  
    React: JavaScript library for building the user interface.
    HTML: Markup language for structuring the web content.
    CSS: Styling for the website layout.
    Bootstrap: Frontend framework for responsive design.
    Thymeleaf: Java templating engine used for server-side rendering of dynamic content.
  Backend:
  
    JavaFX: Used for building the server-side logic and managing the application’s backend processes.
    Node.js: JavaScript runtime environment for handling server-side operations.
    Express.js: Web application framework for Node.js to handle routing and requests.
    JWT (JSON Web Tokens): Authentication mechanism for securely managing user sessions.
    MySQL: Relational database management system for storing user, product, and order data.
  Version Control:

    Git: For version control, managed through GitHub.
  Testing:

    Jest: Used for unit and integration testing of the frontend components.
    Mocha/Chai: Backend testing framework.

Installation
  Prerequisites
    Node.js: Make sure you have Node.js installed. Download it here
    MySQL: You’ll need MySQL installed and running on your machine. Download it here
Frontend Setup
  Clone the repository:
  
  bash
  Copy code
  git clone https://github.com/MohanadAlthaher/SDE_2024.git
  cd SDE_2024
  Install frontend dependencies:
  
  bash
  Copy code
  cd client
  npm install

  Frontend Setup
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/shoe-ecommerce.git
cd shoe-ecommerce
Install frontend dependencies:

bash
Copy code
cd client
npm install
Run the React app:

bash
Copy code
npm start
Backend Setup
Install backend dependencies:

bash
Copy code
cd server
npm install
Create a .env file in the root of the server folder and add your MySQL database credentials:

env
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=shoe_ecommerce
JWT_SECRET=your_jwt_secret
Run the backend server:

bash
Copy code
node app.js
Database Setup
Import the MySQL schema from the db/ folder or create tables manually based on the application’s requirements.
Ensure the necessary tables (users, products, orders, etc.) are created in your MySQL database.
Usage
Visit the frontend on http://localhost:3000 to browse, add items to the cart, and check out.
Admin users (Sellers) can log in to their dashboard to manage listings and orders.
Testing
Run the tests for the frontend:

bash
Copy code
npm test
Run the tests for the backend (using Mocha):

bash
Copy code
npm test -- --backend
License
This project is licensed under the MIT License.


