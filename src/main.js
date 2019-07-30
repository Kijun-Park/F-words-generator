import db from "../db";

const generate = document.getElementById("generate");
console.log(generate.childNodes);
db.forEach(element => {
  console.log(element.word);
});
