function chunkArray(myArray, chunk_size) {
  var index = 0
  var arrayLength = myArray.length
  var tempArray = []

  for (index = 0; index < arrayLength; index += chunk_size) {
    myChunk = myArray.slice(index, index + chunk_size)
    // Do something if you want with the group
    tempArray.push(myChunk)
  }

  return tempArray
}

var result = chunkArray([1, 2, 3, 4, 5, 6], 4)

console.log(result)
