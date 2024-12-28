Calculator dApp
A Solana-based decentralized application (dApp) for performing basic arithmetic operations (addition, subtraction, multiplication, division) using the Anchor framework. This dApp includes custom error handling, such as for division by zero, and is designed for local testing and development.

Features
Perform basic arithmetic operations:
Addition
Subtraction
Multiplication
Division (with remainder)
Handles division by zero with a custom error message.
Includes comprehensive TypeScript tests for local validation.
Prerequisites
Before using the dApp, ensure you have the following installed:

Rust (Version 1.75.0 or later)
Solana CLI (Version 1.16.0 or later)
Anchor CLI (Version 0.30.0 or later)
Node.js (Version 14 or later)
Yarn
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/jephter-olamiposi/Calculator-dApp.git
cd Calculator-dApp
Install dependencies:

bash
Copy code
yarn install
Build the program:

bash
Copy code
anchor build
Usage
This project is designed for local testing only and does not require deployment.

Local Testing
Run the provided TypeScript tests:

bash
Copy code
anchor test
Example Output:

Each test verifies the correctness of the arithmetic operations (add, subtract, multiply, divide) and custom error handling for division by zero.
Running Tests
The project includes comprehensive tests written in TypeScript. To run the tests:

Build the program:

bash
Copy code
anchor build
Execute the tests:

bash
Copy code
anchor test
