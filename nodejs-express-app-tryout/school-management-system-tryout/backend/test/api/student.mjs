import fetch from 'node-fetch';

console.log('hello teacher api test');

const response = await fetch('https://github.com/');
const body = await response.text();
