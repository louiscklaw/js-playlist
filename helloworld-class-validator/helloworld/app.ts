import { validate } from 'class-validator';
import { Post, PostType } from './Post';

// Sample1. simple validation

let post1 = new Post();
post1.title = 'Hello world'; // should pass

validate(post1).then((result) => {
  console.log('1. should pass: ', result); // should pass completely, e.g. return empty array
});
