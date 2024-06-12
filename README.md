# Simpsons API Backend
![The Simpsons](https://upload.wikimedia.org/wikipedia/commons/9/98/The_Simpsons_yellow_logo.svg)

This project is a backend API for retrieving and managing data related to characters from the famous TV show "The Simpsons". It provides endpoints to perform CRUD operations on character data.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Endpoints](#endpoints)
- [Contributing](#contributing)

## Introduction

The Simpsons API Backend is built using Node.js and Express.js, with MySQL as the database management system. It serves as a backend service for applications or websites that require character data from "The Simpsons" TV show. This API allows users to perform various operations such as retrieving character information, adding new characters, updating existing characters, and deleting characters.

## Features

- Retrieve a list of all characters
- Get details of a specific character by ID
- Add a new character
- Update existing character information
- Delete a character

## Installation

To run the Simpsons API Backend locally, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Adalab/modulo-4-evaluacion-final-bpw-Raquelcb24.git
   ```

2. Navigate to the project directory:

   ```bash
   cd modulo-4-evaluacion-final-bpw-Raquelcb24
   ```

3. Install dependencies using npm:

   ```bash
   npm install
   ```

4. Set up your MySQL database and update the file with your database credentials.

5. Start the server:

   ```bash
   npm run dev
   ```


## Endpoints

- `GET /characters`: Retrieve a list of all characters.
- `GET /characters/:id`: Get details of a specific character by ID.
- `POST /newCharacter`: Add a new character.
- `PUT /characters/:id`: Update existing character information.
- `DELETE /characters/:id`: Delete a character.


## Contributing

Contributions to the Simpsons API Backend are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request with your changes.


