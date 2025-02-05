const express = require('express');
const app = express();

const cors = require('cors');
const axios = require('axios');
const port = process.env.PORT || 4000;

//middleware
app.use(cors());

app.get('/api/classify-number', async (req, res) => {
  const { number } = req.query;
  if (!number) {
    return res.status(400).json({
      number: '',
      error: true,
    });
  }

  // Input validation
  const parsedNumber = Number(number);
  if (isNaN(parsedNumber) || !Number.isInteger(parsedNumber)) {
    return res.status(400).json({
      number: number, // Return the actual input string
      error: true,
    });
  }

  //function to check if a number is prime.
  const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  //function to check if a number is an Armstrong number.
  const isArmstrong = (num) => {
    const digits = String(num).split('');
    const power = digits.length;
    const sum = digits.reduce(
      (acc, digit) => acc + Math.pow(parseInt(digit), power),
      0
    );
    return sum === num;
  };

  //function to check if a number is perfect.
  const isPerfect = (num) => {
    let sum = 0;
    for (let i = 1; i < num; i++) {
      if (num % i === 0) sum += i;
    }
    return sum === num;
  };

  //Helper function to calculate the digit sum.
  function digitSum(num) {
    return Math.abs(num)
      .toString()
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit), 0);
  }

  // Classify the number
  const prime = parsedNumber > 1 && isPrime(parsedNumber);
  const armstrong = isArmstrong(Math.abs(parsedNumber));
  const perfect = parsedNumber > 0 && isPerfect(parsedNumber);
  const sumOfDigits = digitSum(parsedNumber);
  const isOdd = parsedNumber % 2 !== 0;
  const properties = [];
  if (armstrong) properties.push('armstrong');
  properties.push(isOdd ? 'odd' : 'even');

  // Get a fun fact using Numbers API
  let funFact;
  try {
    const response = await axios.get(
      `http://numbersapi.com/${parsedNumber}/math`
    );
    funFact = response.data;
  } catch (error) {
    funFact = 'No fun fact available';
  }

  const result = {
    number: parsedNumber,
    is_prime: prime,
    is_perfect: perfect,
    properties,
    digit_sum: sumOfDigits,
    fun_fact: funFact,
  };
  return res.status(200).json(result);
});

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
