import * as yup from "yup";
import moment from "moment-timezone";

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
let validateIsoTime = yup
  .string()
  .test(
    "test string if iso time",
    "${path} is not a iso time",
    (value, context) => moment(value, iso_time_schema, true).isValid()
  );

// validateIsoTime
//   .validate("1")
//   .then((r) => {
//     console.log("r", r);
//   })
//   .catch((e) => {
//     console.log("e", e);
//   });

validateIsoTime.isValid("1").then((r) => {
  console.log(r);
});

let day_control_schema = yup
  .object()
  .shape({
    utc_start_time: yup
      .string()
      .test(
        "check iso format",
        "${path} failed iso format",
        async (value, context) => {
          return await validateIsoTime.isValid(value);
        }
      ),
    utc_end_time: yup
      .string()
      .test(
        "check iso format",
        "${path} failed iso format",
        async (value, context) => {
          return await validateIsoTime.isValid(value);
        }
      ),
    enabled: yup.boolean().required(),
  })
  .test(
    "check time difference",
    "${path} failed time difference",
    (value, context) => {
      let t_start = moment(value.utc_start_time, iso_time_schema, true);
      let t_end = moment(value.utc_end_time, iso_time_schema, true);
      return t_start.diff(t_end) < 0;
    }
  );

let schema = yup.object().shape({
  hello: yup.string().required(),
  opening_schedule: yup.object().shape({
    MON: day_control_schema,
    TUE: day_control_schema,
    WED: day_control_schema,
    THU: day_control_schema,
    FRI: day_control_schema,
    SAT: day_control_schema,
    SUN: day_control_schema,
  }),
});

// check validity
schema
  .validate({
    hello: "world",
    lineup: {
      lineup_username_placeholder: "名前 / テーブル番号",
      max_num_of_children: 34,
      max_num_of_adult: 12,
    },
    opening_schedule: {
      THU: {
        utc_end_time: "2021-06-12T13:45:00.000Z",
        utc_start_time: "2021-06-12T12:45:00.000Z",
        enabled: false,
      },
      TUE: {
        utc_end_time: "2021-06-12T14:00:00.000Z",
        utc_start_time: "2021-06-12T13:00:00.000Z",
        enabled: false,
      },
      SAT: {
        utc_end_time: "2021-06-12T14:00:00.000Z",
        utc_start_time: "2021-06-12T01:00:00.000Z",
        enabled: false,
      },
      WED: {
        utc_end_time: "2021-06-12T14:00:00.000Z",
        utc_start_time: "2021-06-12T01:00:00.000Z",
        enabled: false,
      },
      MON: {
        utc_end_time: "2021-06-12T14:00:00.000Z",
        utc_start_time: "2021-06-12T12:15:15.000+08:00",
        enabled: false,
      },
      SUN: {
        utc_end_time: "2021-06-12T14:00:00.000Z",
        utc_start_time: "2021-06-12T01:00:00.000Z",
        enabled: false,
      },
      FRI: {
        enabled: false,
        utc_end_time: "2021-06-12T08:15:00.000+08:00",
        utc_start_time: "2021-06-12T07:45:00.000+08:00",
      },
    },
  })
  .then(function (valid) {
    console.log("opening_schedule valid", valid);
  })
  .catch((e) => {
    console.log("e", e);
  });
