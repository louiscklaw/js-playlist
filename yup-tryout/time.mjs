import * as Yup from "yup";

import moment from "moment-timezone";

Yup.mixed;
Yup.string;
Yup.number;
Yup.boolean; // also aliased as Yup.bool
Yup.date;
Yup.object;
Yup.array;

Yup.reach;
Yup.addMethod;
Yup.ref;
Yup.lazy;
Yup.setLocale;
Yup.ValidationError;

console.log("helloworld");

// let jimmySchema = yup
//   .string()
//   .test(
//     "is-jimmy",
//     "${path} is not Jimmy",
//     (value, context) => value === "jimmy"
//   );

// jimmySchema.isValid("jimmy").then((r) => {
//   console.log("r", r);
// });
// jimmySchema
//   .validate("john")
//   .then((r) => {
//     console.log("r", r);
//   })
//   .catch((e) => console.log("e", e.errors));

let iso_time_schema = "YYYY-MM-DDTHH:mm:ss.000Z";
let validateIsoTime = Yup.string().test(
  "test string if iso time",
  "${path} is not a iso time",
  (value, context) => {
    return moment(value, iso_time_schema, true).isValid();
  }
);

// console.log(validateIsoTime.isValidSync("1"));
// console.log(validateIsoTime.isValidSync("2021-06-12T14:00:00.000Z"));

let validateDayControl = Yup.object()
  .shape({
    utc_start_time: Yup.string().test(
      "check iso format",
      "${path} failed iso format",
      (value, context) => validateIsoTime.validateSync(value)
    ),
    utc_end_time: Yup.string().test(
      "check iso format",
      "${path} failed iso format",
      (value, context) => validateIsoTime.validateSync(value)
    ),
    enabled: Yup.boolean().required(),
  })
  .test(
    "check time difference",
    "${path} failed time difference",
    (value, context) => {
      let t_start = moment(value.utc_start_time, iso_time_schema, true);
      let t_end = moment(value.utc_end_time, iso_time_schema, true);
      return t_start.diff(t_end) < 0;
      // return false;
    }
  );

let validateRestaurantConfig = Yup.object().shape({
  opening_schedule: Yup.object().shape({
    MON: validateDayControl,
  }),
});

// check validity
// try {
//   let m = validateIsoTime.validateSync("2021-06-12T13:45:00.000+09:00", {
//     abortEarly: false,
//   });
// } catch (error) {
//   console.log("m", error.errors);
// }

// check validity
try {
  let m = validateDayControl.validateSync({
    utc_start_time: "2021-06-12T09:00:00.000+09:00",
    utc_end_time: "2021-06-12T22:00:00.000+09:00",
    enabled: true,
  });
} catch (error) {
  console.log("m", error.errors);
}

// // check validity
// try {
//   let m = validateRestaurantConfig.validateSync(
//     {
//       lineup: {
//         lineup_username_placeholder: "名前 / テーブル番号",
//         max_num_of_children: 34,
//         max_num_of_adult: 12,
//       },
//       opening_schedule: {
//         MON: {
//           utc_end_time: "2021-06-12T14:00:00.000Z",
//           utc_start_time: "1",
//           enabled: false,
//         },
//       },
//     },
//     { abortEarly: false }
//   );
// } catch (error) {
//   console.log("m", error.errors);
// }
