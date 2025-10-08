<<<<<<< HEAD
# Tripzo - Your Next Travel Adventure Planner ✈️

Tripzo is a full-stack web application designed to simplify travel planning, booking, and user management. It features a dynamic frontend built with HTML, CSS, and JavaScript, powered by a robust backend using **Node.js, Express, and MongoDB**.

## ✨ Features

* **User Authentication:** Secure registration and login using JWT and email OTP verification (via Nodemailer).
* **Dynamic Trip Booking:** Users can select destinations, flights, vehicles, and hotels, with real-time price calculation based on member count, nights, and available discounts/offers.
* **Trip Management:** Users can view their past and upcoming bookings on a dedicated "My Bookings" page.
* **AI Travel Assistant (Myra):** An integrated Gemini-powered chatbot for real-time assistance with weather checks, distance calculation, flight, and hotel inquiries.
* **SOS Functionality:** An emergency button that triggers a local contact call (for demo purposes).
* **Responsive Design:** Optimized for a seamless experience on desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

### Frontend (`FrontendTripzo/`)
* **Languages:** HTML5, CSS3 (with media queries for responsiveness), JavaScript (ES6+).
* **Libraries:** Remixicon (for icons).

### Backend (`BackendTripzo/`)
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (via Mongoose ODM)
* **Authentication:** `bcryptjs` for password hashing, `jsonwebtoken` for secure session management.
* **APIs & Services:**
    * **Google Gemini:** For the AI travel assistant (`@google/generative-ai`).
    * **OpenWeatherMap:** For weather lookups (`axios`).
    * **MapQuest:** For distance calculation (`axios`).
    * **Nodemailer & Google Mail:** For sending registration OTPs.

---

## ⚙️ Project Setup Guide

Follow these step-by-step instructions to get the Tripzo application running on your local machine.

### Prerequisites

1.  **Node.js & npm:** Download and install from [nodejs.org](https://nodejs.org/). This project uses npm for package management.
2.  **Code Editor:** **VS Code** is recommended. Install the following extensions:
    * `Live Server` (For running the frontend locally)
    * `MongoDB VS Code Extension` (Optional, for database viewing)
    * `Auto Close Tag`, `Auto Rename Tag` (Optional, for smoother coding)
3.  **Git:** Install Git from [git-scm.com](https://git-scm.com/).
4.  **MongoDB Atlas Account:** Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas) to get a free cloud database.

### Step 1: Clone the Repository

Open your Git Bash or Command Prompt and run the following commands:

```bash
# 1. Clone the repository
git clone <Your-Repository-URL>
# Example: git clone [https://github.com/your-username/Tripzo.git](https://github.com/your-username/Tripzo.git)

# 2. Navigate into the project's root directory
cd Tripzo
=======
# Tripzo-Fullstack-Project
The project appears to be a Travel Booking and Exploration Platform that serves as a promotional website and a portal for booking trips, featuring a conversational AI assistant.
>>>>>>> 3ce34def40a1b570a426514fe08b25f6e9870367

⚙️ Project Setup Guide (Continued)
Step 2: Configure the Backend
After cloning the repository and navigating into the root directory (Tripzo), you need to install the server-side dependencies and set up the environment variables.

2.1 Install Backend Dependencies
Navigate into the backend directory and install all required Node.js packages.

Bash

# 3. Navigate into the backend directory
cd BackendTripzo

# 4. Install all backend dependencies (Node.js packages like express, mongoose, bcryptjs, etc.)
npm install
2.2 Set Up Environment Variables
Create a configuration file to store your sensitive keys and credentials.

Create .env file: In the root of the BackendTripzo/ directory, create a new file named .env.

Add Configuration: Paste the following structure into the .env file and replace the placeholder values with your actual credentials.

Environment Variables for .env File

Server & Database

PORT: The port the backend server will run on (e.g., 5000).

MONGODB_URI: Connection string for your MongoDB Atlas cluster.

JWT_SECRET: A long, complex string for signing JSON Web Tokens.

API Keys

GEMINI_API_KEY: Your API key for the Gemini-powered AI Assistant.

OPENWEATHER_API_KEY: API key for weather lookups.

MAPQUEST_API_KEY: API key for distance calculations.

Email Service (Nodemailer)

EMAIL_USER: The email address for sending OTPs (e.g., your Gmail).

EMAIL_PASS: The application-specific password for the email account.

Bash

# .env file content structure (inside BackendTripzo/)
PORT=5000
MONGODB_URI="<YOUR_MONGO_DB_CONNECTION_STRING>"
JWT_SECRET="<YOUR_LONG_AND_COMPLEX_SECRET_KEY>"

GEMINI_API_KEY="<YOUR_GOOGLE_GEMINI_API_KEY>"
OPENWEATHER_API_KEY="<YOUR_OPENWEATHERMAP_API_KEY>"
MAPQUEST_API_KEY="<YOUR_MAPQUEST_API_KEY>"

EMAIL_USER="<YOUR_GMAIL_ADDRESS>"
EMAIL_PASS="<YOUR_GMAIL_APP_PASSWORD>"
Step 3: Run the Backend Server
Start the Node.js server to handle API requests and database interactions.

Bash

# 5. Start the backend server (ensure you are still in the BackendTripzo/ directory)
npm start

# Success: You should see a console message confirming the server is running and connected to MongoDB.
Step 4: Run the Frontend Application
The frontend is a static application, which you can run using the recommended Live Server VS Code extension.

Open the Frontend Folder: In VS Code, navigate to the FrontendTripzo/ directory.

Launch index.html: Right-click on the main entry file, index.html, and select "Open with Live Server".

Access the Application: Your default web browser will open a new tab, and the Tripzo application will be ready for use! 🚀
