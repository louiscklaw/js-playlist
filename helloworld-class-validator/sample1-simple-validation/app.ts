import { validate } from 'class-validator'
import { Post, PostType } from './Post'

// Sample1. simple validation

let post1 = new Post()
post1.title = 'Hello world' // should pass
post1.text = 'this is a great post about hello world' // should pass
post1.rating = 10 // should pass
post1.email = 'info@google.com' // should pass
post1.site = 'google.com' // should pass
post1.createDate = new Date() // should pass
post1.tags = ['abcd1', 'abcd2', 'abcd3', 'abcd4', 'abcd4'] // should pass
post1.type = PostType.Private

validate(post1).then(result => {
  console.log('1. should pass: ', result) // should pass completely, e.g. return empty array
})

let post2 = new Post()
post2.title = 'Hello' // should not pass
post2.text = 'this is a great post about hell world' // should not pass
post2.rating = 1.1 // should not pass
post2.email = 'google.com' // should not pass
post2.site = 'googlecom' // should not pass
post2.type = PostType.Private // should pass

// should not pass because date property is missing
validate(post2).then(result => {
  console.log('2. should not pass: ', result) // should not pass completely, must return array of ValidationError-s
})

// Sample2. using validation options to skip properties that are not defined

let post3 = new Post()
post3.title = 'Hello' // should not pass
post3.text = 'this is a great post about hell world' // should not pass
post3.rating = 1.1 // should not pass
post3.email = 'google.com' // should not pass
post3.site = 'googlecom' // should not pass
post3.type = PostType.Private

validate(post3, { skipMissingProperties: true }).then(result => {
  console.log('3. should not pass: ', result) // should not pass, but returned ValidationError-s should not have error about date field
})

let post4 = new Post()
post4.title = 'Hello world' // should pass
post4.text = 'this is a great post about hello world' // should pass
post4.rating = 10 // should pass
post4.email = 'info@google.com' // should pass
post4.site = 'google.com' // should pass
post4.type = PostType.Private

validate(post4, { skipMissingProperties: true }).then(result => {
  console.log('4. should pass: ', result) // should pass even if date is not set
})

// Sample3. using validation groups

let post5 = new Post()
post5.title = 'Hello world' // should pass
post5.text = 'this is a great post about hello world' // should pass
post5.rating = 10 // should pass
post5.email = 'info@google.com' // should pass
post5.site = 'google.com' // should pass
post5.type = PostType.Private

validate(post5, { skipMissingProperties: true }).then(result => {
  console.log('5. should pass: ', result) // should pass even if date is not set
})

// Sample4. array validation

let post6 = new Post()
post6.title = 'Hello world' // should pass
post6.text = 'this is a great post about hello world' // should pass
post6.rating = 10 // should pass
post6.email = 'info@google.com' // should pass
post6.site = 'google.com' // should pass
post6.createDate = new Date() // should pass
post6.tags = ['abcd1', 'abcd2', 'abcd3', 'abcd4', 'abcd4']
post6.type = PostType.Private

validate(post6).then(result => {
  console.log('6. should pass: ', result) // should pass completely, e.g. return empty array
})

let post7 = new Post()
post7.title = 'Hello world' // should pass
post7.text = 'this is a great post about hello world' // should pass
post7.rating = 10 // should pass
post7.email = 'info@google.com' // should pass
post7.site = 'google.com' // should pass
post7.createDate = new Date() // should pass
post7.tags = ['news', 'a']
post7.type = PostType.Private

validate(post7).then(result => {
  console.log('7. should not pass: ', result) // should not pass
})

let post8 = new Post()
post8.title = 'Hello world' // should pass
post8.text = 'this is a great post about hello world' // should pass
post8.rating = 10 // should pass
post8.email = 'info@google.com' // should pass
post8.site = 'google.com' // should pass
post8.createDate = new Date() // should pass
post8.tags = []
post8.type = PostType.Private

validate(post8).then(result => {
  console.log('8. should not pass: ', result) // should not pass
})

let post9 = new Post()
post9.title = 'Hello world' // should pass
post9.text = 'this is a great post about hello world' // should pass
post9.rating = 10 // should pass
post9.email = 'info@google.com' // should pass
post9.site = 'google.com' // should pass
post9.createDate = new Date() // should pass
post9.tags = ['abcd1', 'abcd2', 'abcd3', 'abcd4', 'abcd4', 'abcd4']
post9.type = PostType.Private

validate(post9).then(result => {
  console.log('9. should not pass: ', result) // should not pass
})

let post10 = new Post()
post10.title = 'Hello world' // should pass
post10.text = 'this is a great post about hello world' // should pass
post10.rating = 10 // should pass
post10.email = 'info@google.com' // should pass
post10.site = 'google.com' // should pass
post10.createDate = new Date() // should pass
post10.tags = ['abcd1', 'abcd2', 'abcd3', 'abcd4', 'abcd4']
post10.type = PostType.Private

validate(post10).then(result => {
  console.log('10. should pass: ', result) // should pass
})

let post11 = new Post()
post11.title = 'Hello world' // should pass
post11.text = 'this is a great post about hello world' // should pass
post11.rating = 10 // should pass
post11.email = 'info@google.com' // should pass
post11.site = 'google.com' // should pass
post11.createDate = new Date() // should pass
post11.tags = null
post11.type = PostType.Private

validate(post11).then(result => {
  console.log('11. should not pass: ', result) // should not pass
})

let post12 = new Post()
post12.title = 'Hello world' // should pass
post12.text = 'this is a great post about hello world' // should pass
post12.rating = 10 // should pass
post12.email = 'info@google.com' // should pass
post12.site = 'google.com' // should pass
post12.createDate = new Date() // should pass
post12.tags = ['abcd1', 'abcd2', 'abcd3', 'abcd4', 'abcd4'] // should pass
post12.type = 99 // should not pass

validate(post1).then(result => {
  console.log('12. should not pass: ', result) // should not pass as type is not a valid enum
})
