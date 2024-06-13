# Task Manager API

## Overview

The Task Manager API is built with Express.js and MongoDB to facilitate the management of tasks and subtasks. It supports CRUD operations and implements soft deletion, where tasks and subtasks marked as deleted remain in the database but are excluded from API responses.

## Features

- User-specific task and subtask management
- CRUD operations for tasks and subtasks
- Soft deletion handling
- MongoDB for data storage
- Environment-based configuration
- Detailed API documentation

## Technologies Used

- **Node.js** and **Express.js** for the server
- **MongoDB** with **Mongoose** for the database
- **dotenv** for environment configuration
- **express-validator** for request validation
- **Nodemon** for development ease


## Setup and Installation

### Prerequisites

- Node.js (v14.x or higher)
- MongoDB
- Git

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/task-manager.git
    cd task-manager
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Create a `.env` file:**
    ```plaintext
    MONGO_URI="Your Mongodb URI"
    PORT=5000
    ```

4. **Start the server:**
    ```bash
    npm run dev
    ```

The server will run on `http://localhost:5000`.



