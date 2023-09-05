const fs = require("fs");
const xlsx = require("node-xlsx");

var parsedFile = xlsx.parse("osoby.xlsx");
var list = parsedFile[0].data;

for (var i = 1; i < list.length; ++i) {
  list[i].push(generatePassword());
  console.log("send mail to " + list[i][2]);
}
list[0].push("haslo");

const buffer = xlsx.build([{ name: "Arkusz1", data: list }]);

fs.writeFile("osoby-hasla.xlsx", buffer, (err) => {
  if (err) throw err;
});

function generatePassword() {
  var length = 10,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}
