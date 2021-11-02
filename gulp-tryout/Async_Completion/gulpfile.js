const fs = require("fs");

async function asyncAwaitTask() {
  const { version } = JSON.parse(fs.readFileSync("package.json", "utf8"));
  console.log(version);
  await Promise.resolve("some result");
}

exports.default = asyncAwaitTask;
