const fs = require("fs");
const xlsx = require("node-xlsx");

var parsedFile = xlsx.parse("osoby.xlsx");
var list = parsedFile[0].data;
console.log(list);
for (var i = 1; i < list.length; ++i) {
  list[i].push(generatePassword());
}
list[0].push("haslo");
console.log(list);

const buffer = xlsx.build([{ name: "Arkusz1", data: list }]);
console.log(buffer);

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
