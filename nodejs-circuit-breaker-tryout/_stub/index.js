const circuitBreaker = require('opossum');
const axios = require('axios');

const express = require('express');
const app = express();
const port = 3000;
const random = Math.random

var i = 0;

// real servicing endpoint
app.get('/helloworld', (req, res) => {
    i = i + 1;
    console.log(`request ${i} received`);

    if (i % 10 < 3) {
        console.log("hello pass");
        res.send('Hello, World!');
    } else {
        console.log("hello fail");
        res.status(500);
        res.send("hello fail")
    }
});

// Define the backend API endpoint
const backendApiEndpoint = () => axios.get('http://localhost:3000/helloworld');

// Create a circuit breaker
const circuit = new circuitBreaker(backendApiEndpoint, {
    timeout: 3000, // Request timeout in milliseconds
    errorThresholdPercentage: 50, // Error threshold percentage for circuit breaker
    resetTimeout: 5000 // Time to wait before attempting to close the circuit
});

// protected endpoint
app.get('/protected_helloworld', (req, res) => {
    circuit.fire()
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(500).send('Error');
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
