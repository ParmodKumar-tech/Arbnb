# 🏡 Airbnb – Rental Property Management System

## 📌 Overview
This project is a **Rental Property Management System** that allows users to add, manage, and explore property listings in a simple and efficient way.

Each property includes:

* Property Name
* Description
* Location
* Price
* Images

---

## 🛠️ Technologies Used(Node.js)

* **EJS (Embedded JavaScript)** – Dynamic rendering of data in templates
* **Express.js** – Backend framework for handling routes and APIs
* **MongoDB** – Database for storing property and user data
* **Bootstrap** – Responsive UI design
* **Cloudinary** – Image storage and optimization

---

## 🚀 Key Features

### 🤖 AI Assistant

* Suggests property listings based on user's location
* Helps users find nearby properties easily

### 🔐 User Authentication

* Secure registration and login system
* Implemented using Passport.js

### ⭐ Reviews & Ratings

* Users can:

  * Add reviews
  * Provide star ratings
  * Share experiences

### 🏠 Property Management

* Add new properties
* Update property details
* View all listings

---

## ⚙️ Challenges Faced

### 🖼️ Image Storage Approach

Instead of storing images directly in the database:

* Only **image URLs** are stored in MongoDB
* Actual images are stored on **Cloudinary**

✅ Benefits:

* Faster database performance
* Reduced storage load
* Efficient image delivery

---

## 🧪 How to Run Locally

```bash
# Clone the repository
git clone git@github.com:ParmodKumar-tech/Airbnb-Project.git

# Navigate to project folder
cd airbnb-project

# Install dependencies
npm install

# Step up .env variables:
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=
JWT_SECRET=
FOLDER_NAME=
ATLASDB_PROJECT_ID=
ATLASDB_CLUSTER_NAME=
ATLASDB_URL=
ATLASDB_PUBLIC_KEY=
ATLASDB_PRIVATE_KEY=

# Start server
npm start
```


