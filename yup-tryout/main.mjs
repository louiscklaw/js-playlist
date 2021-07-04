import * as yup from "yup";

yup.mixed;
yup.string;
yup.number;
yup.boolean; // also aliased as yup.bool
yup.date;
yup.object;
yup.array;

yup.reach;
yup.addMethod;
yup.ref;
yup.lazy;
yup.setLocale;
yup.ValidationError;

console.log("helloworld");

let schema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().positive().integer(),
  email: yup.string().email(),
  website: yup.string().url(),
  createdOn: yup.date().default(function () {
    return new Date();
  }),
  testArray: yup
    .array()
    .test("test1", "test1", (value, context) => {
      if (value.length != 3) return false;
      return true;
    })
    .test("test2", "test2", (value, context) => {
      if (value[0] == "1") return true;
      return false;
    }),
});

// check validity
schema
  .isValid({
    name: "jimmy",
    age: 24,
    testArray: ["1", 2, 3],
  })
  .then(function (valid) {
    console.log("valid", valid);
  });
