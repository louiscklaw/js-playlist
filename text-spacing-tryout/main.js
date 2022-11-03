let test_string = '韓股低收apple helloworld0.2%'

// input
console.log(test_string)

// output
let output_string = ''

output_string = test_string.replace(/([\u4E00-\u9FCC]+)(\w)/, '$1 $2')
output_string = output_string.replace(/(\w)(\d)/, '$1 $2')

console.log(output_string)
