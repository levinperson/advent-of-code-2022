const fs = require("fs");

const files = fs.readFileSync("./puzzle04-input.txt", "utf8"); //Read the input

const arr = files.replace(/\r/g, "").trim().split("\n"); //remove all carriage returns and split by single line return

const splitedArr = arr.map((x) => {
  return x.split(/,|-/).map(Number); //split each item by , and -, and turn them into number
});

function partI() {
  count = 0;
  for (let item of splitedArr) {
    if (item[0] <= item[2] && item[1] >= item[3]) {
      count += 1;
    } else if (item[0] >= item[2] && item[1] <= item[3]) {
      count += 1;
    }
  }
  console.log(count);
}

function partII() {
  count = 0;
  for (let item of splitedArr) {
    if (item[1] < item[2] || item[0] > item[3]) {
      count += 0;
    } else {
      count += 1;
    }
  }
  console.log(count);
}

partI();
partII();
