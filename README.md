# DemoQA_Cypress_TestAutomation
# Project Name

**DemoQA Testing Project**

## Overview

This repository contains automated tests for the DemoQA website using the Cypress framework in JavaScript. The tests cover both UI and API testing scenarios. For UI testing, various functionalities of the [DemoQA](https://demoqa.com/) website, such as WebTables, Practice Form, and Progres Bar, were automated. Additionally, API testing was performed on the BookStore API, including Login, Registration, and managing books on user profiles.

## UI Testing

### WebTables

- *Adding a New Record:*
  - The test script adds a new record to the WebTables and asserts it for both positive and negative scenarios .

- *Editing an Existing Record:*
  - The test script edits an existing record in the WebTables and verifies the changes.

### PracticeForm

- *Form Value Validation:*
  - The test script validates the entered values in the PracticeForm.

### Progres Bar

- *Progress Bar Operations:*
  - The test script covers the functionalities of starting, stopping, and resetting the Progres Bar.

## API Testing

### BookStore API

- *Login:*
  - Positive test cases for successful login.
  - Negative test cases for unsuccessful login scenarios.

- *Registration:*
  - Positive test cases for successful user registration.
  - Negative test cases for unsuccessful registration scenarios.

- *Books:*
  - Adding and deleting books from user profiles.
  - Positive and negative test cases for book management.

## Prerequisites

Before running the tests, ensure that you have the following set up on your machine:

 [Visual Studio Code](https://code.visualstudio.com/)  
 [Node.js](https://node.js.org/)  
 [Cypress](https://www.cypress.io/)  
 [Postman](https://learning.postman.com/)  

## Setup Instructions

1. **Clone the Repository:**
   - Clone the repository to your local machine. More informations:[here](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
2. **Navigate to Project Directory:**
   - Open project in VS Code
3. **Install Dependencies:**
   ```bash
   npm install cypress --save-dev
4. **Run Cypress Tests:**
   ```bash
   npx cypress open
   
## How to Run Postman Tests  
**To run the Postman tests in Postman, follow these steps:**

1. Open Postman. 
2. Import the test collection file located in the project directory: DemoQA.postman_collection.json.  
3. Run the imported collection to execute the API tests.
   
**To run Postman tests in VSCode:**
1. **Execute the command to install Newman, tool for running Postman collection:**
   ```bash
   npm install -g newman
2. **After installation, execute the following command to run Postman tests:**
   ```bash
   newman run cypress\e2e\API\postmanCollection\BookStore_API_Tests.postman_collection.json


   
## Acknowledgments
Special thanks to the [DemoQA](https://demoqa.com/) team for providing a platform for testing and learning.

## Author
Mina Lazicic
