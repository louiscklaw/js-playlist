// helloworld example

let message: string = 'Hello World'

console.log(message)

// helloworld example

// Defining Types
interface User {
  name: string
  id: number
}

// Defining Types

const user: User = {
  name: 'Hayes',
  id: 0,
}

class UserAccount {
  name: string
  id: number

  constructor(name: string, id: number) {
    this.name = name
    this.id = id
  }
}

const user1: User = new UserAccount('Murphy', 1)

// function getAdminUser(): User {}
// function deleteUser(user: User) {}

// Defining Types

type MyBool = true | false
type WindowStates = 'open' | 'closed' | 'minimized'
type LockStates = 'locked' | 'unlocked'
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9

// Unions provide a way to handle different types too. For example, you may have a function that takes an array or a string:
function getLength(obj: string | string[]) {
  return obj.length
}

// For example, you can make a function return different values depending on whether it is passed a string or an array:
function wrapInArray(obj: string | string[]) {
  if (typeof obj === 'string') {
    return [obj]
  }
  return obj
}

// Generics
type StringArray = Array<string>
type NumberArray = Array<number>
type ObjectWithNameArray = Array<{ name: string }>

interface Backpack<Type> {
  add: (obj: Type) => void
  get: () => Type
}

// This line is a shortcut to tell TypeScript there is a
// constant called `backpack`, and to not worry about where it came from.
declare const backpack: Backpack<string>

// object is a string, because we declared it above as the variable part of Backpack.
const object = backpack.get()

// Since the backpack variable is a string, you can't pass a number to the add function.
// backpack.add(23);

// Structural Type System
interface Point {
  x: number
  y: number
}

function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`)
}

// logs "12, 26"
const point = { x: 12, y: 26 }
logPoint(point)

class VirtualPoint {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

const newVPoint = new VirtualPoint(13, 56)
logPoint(newVPoint) // logs "13, 56"
