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