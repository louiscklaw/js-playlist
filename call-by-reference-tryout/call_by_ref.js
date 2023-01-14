let myObj = { value: 10 }

function updateValue(objRef) {
  objRef.value = 20
  console.log(objRef)
}

updateValue(myObj)
console.log(myObj)
