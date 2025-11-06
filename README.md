 A Full-Stack Stock Trading Platform
<div align-center">
A feature-rich, full-stack stock trading and portfolio management platform built from the ground up with the MERN stack (MongoDB, Express.js, React, Node.js). This project demonstrates a comprehensive set of features, from secure user authentication to live stock data integration.
</div>

Live Demo
Application	Link

Landing Page	https://stock-trading-application.vercel.app

Dashboard App	https://stock-trading-application-app.vercel.app

Note: The backend is hosted on a free Render instance, which may "spin down" after a period of inactivity. The first request might take up to 30 seconds to wake the server.

🚀 Key Features

This project is a complete, dynamic application demonstrating a wide range of full-stack development skills and professional architectural patterns.

Secure JWT Authentication: Full user registration and login system using JSON Web Tokens (JWT) stored in secure cookies. Passwords are encrypted using bcryptjs, and new accounts require strong passwords.

Protected Routes & Session Verification: The backend API and frontend dashboard pages are protected. A dedicated /verify endpoint on the backend acts as the source of truth for user sessions, a standard practice for cross-domain SPA security.

Dynamic Portfolio Management:

Buy Orders: When a user buys a stock, their holdings are dynamically created or updated. If they buy more of an existing stock, the quantity and weighted average cost are correctly recalculated in real-time.

Sell Orders: The backend validates that a user owns the stock and has sufficient quantity before executing a sale. Holdings are updated or removed from the database accordingly.

Live Stock Data Integration (API Gateway Pattern):

A secure backend route acts as a gateway to the Alpha Vantage API, allowing users to search for any stock symbol (US or Indian) without exposing the API key on the frontend.

Live market index data (NIFTY 50, SENSEX) is fetched and displayed on the dashboard's top bar.

User-Specific, Database-Driven Watchlist: Each user has their own personal watchlist stored in MongoDB. New users are automatically provided with a default watchlist. Users can search for new stocks and dynamically add or remove them.

Comprehensive & Dynamic User Dashboard:

Displays a user's holdings, positions, and a complete order history (sorted by latest first).

Portfolio summary figures (Total Investment, Current Value, P&L) are calculated dynamically from the fetched holdings data.

Visual data representation through dynamic charts that update based on portfolio and watchlist composition.

Demo Login for Recruiters: A one-click "Demo Login" feature provides instant access to a pre-populated user account, showcasing the application's full functionality without requiring signup.

Three-Part Monorepo Architecture: The project is professionally structured into three distinct applications within a single GitHub repository: a marketing frontend, the main dashboard application, and the backend API.

🛠️ Tech Stack & Architecture

Tech Stack

Category   &nbsp;&nbsp;&nbsp;&nbsp;	Technologies

Frontend   &nbsp;&nbsp;&nbsp;&nbsp;  	React, Vite, React Router, Axios, Bootstrap, Chart.js.

Backend	    &nbsp;&nbsp;&nbsp;&nbsp;  Node.js, Express.js, Mongoose, JWT, bcryptjs, cookie-parser, CORS, dotenv

Database	   &nbsp;&nbsp;&nbsp;&nbsp;  MongoDB Atlas (Cloud-hosted NoSQL database)

Architecture

The application is architected as a monorepo containing three decoupled services, a pattern used in modern web development for scalability and separation of concerns.

frontend (Deployed on Vercel):

A static marketing and landing page built with React and Vite. Its primary purpose is to introduce the platform and funnel users to the main application via standard <a> tag navigation.

dashboard (Deployed on Vercel):

The core Single-Page Application (SPA) where users manage their portfolio. It communicates with the backend API to fetch and manipulate all user data and handles all authenticated views.

backend (Deployed on Render):

A Node.js/Express RESTful API that handles all business logic, user authentication, database interactions, and secure communication with third-party services like Alpha Vantage.
All cross-domain communication between the Vercel frontends and the Render backend is securely handled via a precise CORS (Cross-Origin Resource Sharing) configuration.

⚙️ Running Locally

To get a local copy up and running, follow these simple steps.

Prerequisites

Node.js (v18 or later recommended)

npm

A MongoDB Atlas account and connection string



Installation & Setup



Clone the repository:

git clone https://github.com/ihthisham6/Stock_Trading_Application.git

cd Stock_Trading_Application



Backend Setup:

Navigate to the backend folder: cd backend

Install dependencies: npm install

Create a .env file and add the following variables:

MONGO_URL=YOUR_MONGODB_CONNECTION_STRING

TOKEN_KEY=YOUR_JWT_SECRET_KEY

ALPHA_VANTAGE_API_KEY=YOUR_ALPHA_VANTAGE_KEY

DASHBOARD_URL=http://localhost:3000

FRONTEND_URL=http://localhost:5173



Dashboard Setup:

Navigate to the dashboard folder: 

cd ../dashboard

Install dependencies: npm install

Create a .env file and add the following:

VITE_API_URL=http://localhost:3002



Frontend Setup:

Navigate to the frontend folder: 

cd ../frontend

Install dependencies: npm install

Create a .env file and add the following:

VITE_DASHBOARD_URL=http://localhost:3000



Running the Application

You will need to open three separate terminals to run all services concurrently.



Run the Backend:

cd backend

npm start



Run the Dashboard App:

cd dashboard

npm run dev



Run the Frontend Landing Page:

cd frontend

npm run dev


You can now access the landing page at http://localhost:5173 and the main dashboard/login at http://localhost:3000.


☁️ Deployment

The application is deployed on a modern, scalable cloud stack:

Frontend & Dashboard:

Deployed as two separate projects on Vercel, leveraging its global CDN for optimal performance and automatic CI/CD from the main branch. A vercel.json file in each frontend ensures correct routing for a Single-Page Application.

Backend API: 

Hosted on Render as a Web Service, which also provides automatic deployments on every push to main.

Database:

A managed MongoDB Atlas cluster ensures high availability and scalability for the database.

🔮 Future Improvements

Full Mobile Responsiveness: Add CSS media queries and leverage Bootstrap's responsive utilities to ensure the application is fully usable and looks professional on tablet and mobile devices.

👨‍💻 Author

Ihthisham Raafee

GitHub: @ihthisham6

LinkedIn: https://www.linkedin.com/in/ihthisham-raafee-96404423b/

Portfolio: https://ihthisham.vercel.app/
