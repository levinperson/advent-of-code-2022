const fs = require("fs");

const str = fs.readFileSync("./puzzle06-input.txt", "utf8"); //Read the input string

const arr = str.trim().split("");

function partI() {
  //Re-construct a new nested array. Each element include 4 consective letters.
  let arrWithFour = [];
  for (let i = 0; i < arr.length - 3; i++) {
    tempArr = [];
    for (let j = 0; j < 4; j++) {
      tempArr.push(arr[i + j]);
    }
    arrWithFour.push(tempArr);
  }

  res = 0;
  for (let i = 0; i < arrWithFour.length; i++) {
    if (arrWithFour[i].length === new Set(arrWithFour[i]).size) {
      res = i + 1 + 3;
      break;
    }
  }
  console.log(res);
}

function partII() {
  //Re-construct a new nested array. Each element include 14 consective letters.
  let arrWithFourteen = [];
  for (let i = 0; i < arr.length - 13; i++) {
    tempArr = [];
    for (let j = 0; j < 14; j++) {
      tempArr.push(arr[i + j]);
    }
    arrWithFourteen.push(tempArr);
  }

  res = 0;
  for (let i = 0; i < arrWithFourteen.length; i++) {
    if (arrWithFourteen[i].length === new Set(arrWithFourteen[i]).size) {
      res = i + 1 + 13;
      break;
    }
  }
  console.log(res);
}

partI();
partII();
