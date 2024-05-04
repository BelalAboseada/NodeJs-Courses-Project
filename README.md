# Course Backend App

This README file serves as a guide to understand, set up, and utilize the Course Backend App created using Node.js, Express.js, and MongoDB.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Endpoints](#api-endpoints)
6. [Contributing](#contributing)
7. [License](#license)

## Introduction

The Course Backend App is a RESTful API built using Node.js, Express.js, and MongoDB. It provides functionalities to manage courses, including creating, reading, updating, and deleting course data.

## Features

- **CRUD Operations**: Easily perform Create, Read, Update, and Delete operations on course data.
- **Authentication and Authorization**: Secure endpoints using authentication and authorization mechanisms.
- **Validation**: Validate user inputs to ensure data integrity and security.
- **Error Handling**: Handle errors gracefully with informative error messages.
- **Scalability**: Built with scalability in mind to accommodate growing user bases and data volumes.

## Installation

1. Clone the repository:

    ```
    git clone https://github.com/BelalAboseada/NodeJs-Courses-Project.git
    ```

2. Navigate to the project directory:

    ```
    cd NodeJs-Courses-Project
    ```

3. Install dependencies:

    ```
    npm install
    ```

4. Set up environment variables:
   
   Create a `.env` file in the root directory and add the following environment variables:
    
    PORT=3001

    MONGODB_URI=<your_mongodb_connection_string>
    
    JWT_SECRET=<your_jwt_secret_key>


## Usage

1. Start the server:

 ```
 npm start
 ```

2. The server will start running at the specified port.

## API Endpoints

The Course Backend App exposes the following API endpoints:

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Authenticate a user and generate a JWT token.
- `GET /api/courses`: Get all courses.
- `GET /api/courses/:id`: Get a course by ID.
- `POST /api/courses`: Create a new course.
- `PUT /api/courses/:id`: Update a course by ID.
- `DELETE /api/courses/:id`: Delete a course by ID.

For detailed information about each endpoint and its usage, refer to the API documentation.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests to contribute to the project. Please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
