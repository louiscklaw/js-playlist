let a = 1;

function testCallback(input_helloworld, cb) {
  let b = 10;
  cb(b);
}

testCallback("111", (b) => {
  console.log("input_a", a);
  console.log("input_b", b);
});

a = 2;

testCallback("111", (b) => {
  console.log("input_a", a);
  console.log("input_b", b);
});
