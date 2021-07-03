const fetch = require("node-fetch");

fetch(
  "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=flw&lang=en"
)
  .then((res) => res.json())
  .then((json) => console.log(json));
