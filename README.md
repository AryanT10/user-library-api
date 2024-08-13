# User Library API

## Overview

This is a Node.js REST API application that manages a collection of users and tracks whether they have borrowed a book, along with the borrowing date and time. The API provides endpoints for lending a book to a user, returning a book, and checking if a user has overdue items.

## Features

Lend a Book: Allows a user to borrow a book if they don't have one already borrowed.
Return a Book: Allows a user to return a borrowed book.
Check Overdue Items: Checks if a user has borrowed an item for more than 14 days and flags it as overdue.
Requirements
Node.js (version 12 or higher)
npm (Node Package Manager)
Installation
Clone the repository:

```bash
git clone https://github.com/your-username/user-library-api.git
cd user-library-api
```

Install the necessary packages:

```bash
npm install
```

Running the Application

To start the server, use the following command:

```bash
node server.js
```

Alternatively, if you have nodemon installed, you can use:

```bash
npx nodemon server.js
```

`The server will start on port 3000. You can change the port by setting the PORT environment variable.`


## API Endpoints

1. Lend a Book

Endpoint: /lend

Method: POST

Request Body:

```json
Copy code
{
  "username": "string"
// Response: Returns a success message with the user details.
}
```

Example:

```bash
curl -X POST http://localhost:3000/lend -H "Content-Type: application/json" -d '{"username": "Aryan"}'
```

1. Return a Book
Endpoint: /return

Method: POST

Request Body:

```json
{
  "username": "string"
}
// Response: Returns a success message with the user details.
```

Example:
```bash
curl -X POST http://localhost:3000/return -H "Content-Type: application/json" -d '{"username": "Aryan"}'
```
1. Check Overdue Items
Endpoint: /overdue

Method: GET

Query Parameter:

username: The username to check for overdue items.
Response: Returns a message indicating whether the user has overdue items.

Example:

```bash
curl http://localhost:3000/overdue?username=Aryan

```


## Assumptions and Decisions

### In-Memory Storage: The application uses an in-memory array to store user data. This approach was chosen for simplicity and to avoid dependencies on a database. This means that the data will be reset every time the server restarts.

### Validation: The API includes basic validation to ensure that a user cannot borrow a book if they already have one borrowed and cannot return a book if they haven't borrowed one.

### Overdue Calculation: The overdue calculation assumes a fixed 14-day period for all borrowed items. The Luxon library is used for date manipulation and comparison.

### No Authentication: The application does not include authentication or user management features. It assumes that usernames are unique and manages users based solely on their usernames.

## Testing the Application

### You can use tools like Postman or cURL to test the API endpoints. Examples of how to test each endpoint using cURL are provided above.

### If you wish to write unit tests, consider using a testing framework like Jest or Mocha.

