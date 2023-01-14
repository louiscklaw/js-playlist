console.log('helloworld')

let hello = 'world'

function changeHelloValue() {
  function insideChangeHelloValue() {
    hello = 'world 123321'
  }

  insideChangeHelloValue()
}

console.log('hello value:', hello)

changeHelloValue()

console.log('hello value:', hello)

console.log('done')
