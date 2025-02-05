# Number Classification API

## Description

The **Number Classification API** provides interesting mathematical properties about a given number, including whether it is prime, perfect, Armstrong, odd/even, and a fun fact from the [Numbers API](http://numbersapi.com/).

## Features

- Accepts a number as a query parameter and returns its mathematical properties.
- Retrieves a fun fact about the number using the Numbers API.
- Handles CORS and responds in JSON format.
- Returns appropriate HTTP status codes for successful and erroneous requests.

## API Endpoints

### GET /api/classify-number

#### Request

The API accepts a GET request to the `/api/classify-number` endpoint with the following query parameter:

- `number` (required): An integer for which the classification is to be retrieved.

#### Example Request

```
GET /api/classify-number?number=371
```

#### Success Response (200 OK)

On success, the API returns a JSON object with the following structure:

```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

- **number**: The number provided as input.
- **is_prime**: Boolean indicating if the number is prime.
- **is_perfect**: Boolean indicating if the number is perfect.
- **properties**: An array listing whether the number is "armstrong" and/or "odd"/"even".
- **digit_sum**: The sum of the digits of the number.
- **fun_fact**: A fun fact about the number retrieved from the Numbers API.

#### Error Response (400 Bad Request)

In case of an invalid input (e.g., non-integer), the API returns the following JSON:

```json
{
  "number": "alphabet",
  "error": true
}
```

- **number**: The invalid input provided.
- **error**: Boolean indicating the error.

## Mathematical Properties

- **is_prime**: Determines whether the number is prime.
- **is_perfect**: Checks if the number is a perfect number (equal to the sum of its divisors excluding itself).
- **properties**:
  - **armstrong**: A number is an Armstrong number if the sum of its digits each raised to the power of the number of digits equals the original number.
  - **odd** or **even**: Indicates whether the number is odd or even.
- **digit_sum**: The sum of the digits of the number.
- **fun_fact**: A fun fact about the number from the Numbers API.

## Error Handling

The API includes basic error handling to ensure:

- Only valid integers are accepted as input.
- A `400 Bad Request` is returned for invalid inputs (e.g., non-integer).

## Deployment

The API is deployed to a publicly accessible endpoint, ensuring it meets the following criteria:

- **CORS** is enabled.
- Fast response time (less than 500ms).
- Stable and reliable.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Domfa/hng-backend-track-s1.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. The API should now be running at `http://localhost:4000/api/classify-number`.
