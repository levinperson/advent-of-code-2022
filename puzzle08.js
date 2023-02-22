const fs = require("fs");

const files = fs.readFileSync("./puzzle08-input.txt", "utf8"); //Read the input

const arr = files.replace(/\r/g, "").trim().split("\n"); //remove all carriage returns and split by single line return

const splitedArr = arr.map((x) => {
  let temp = x.split("");
  return temp.map(Number);
});

function partI() {
  count = splitedArr.length * 2 + (splitedArr[0].length - 2) * 2;
  for (let j = 1; j < splitedArr.length - 1; j++) {
    for (let i = 1; i < splitedArr[0].length - 1; i++) {
      //first construct four arrays on the four directions of the tree
      let leftArr = [];
      for (let k = 0; k < i; k++) {
        leftArr.push(splitedArr[j][k]);
      }
      let rightArr = [];
      for (let k = i + 1; k < splitedArr[0].length; k++) {
        rightArr.push(splitedArr[j][k]);
      }
      let topArr = [];
      for (let k = 0; k < j; k++) {
        topArr.push(splitedArr[k][i]);
      }
      let bottomArr = [];
      for (let k = j + 1; k < splitedArr.length; k++) {
        bottomArr.push(splitedArr[k][i]);
      }
      //Then make sure that the tree is taller than the other trees on either of the four directions
      if (
        leftArr.every((x) => x < splitedArr[j][i]) ||
        rightArr.every((x) => x < splitedArr[j][i]) ||
        topArr.every((x) => x < splitedArr[j][i]) ||
        bottomArr.every((x) => x < splitedArr[j][i])
      ) {
        count += 1;
      }
    }
  }
  console.log(count);
}

function partII() {
  let totalArea = [];
  for (let j = 1; j < splitedArr.length - 1; j++) {
    for (let i = 1; i < splitedArr[0].length - 1; i++) {
      let countLeft = 0;
      let countRight = 0;
      let countTop = 0;
      let countBottom = 0;
      //left direction
      for (k = i - 1; k >= 0; k--) {
        if (splitedArr[j][i] > splitedArr[j][k]) {
          countLeft += 1;
        } else {
          countLeft += 1;
          break;
        }
      }
      //right direction
      for (k = i + 1; k < splitedArr[0].length; k++) {
        if (splitedArr[j][i] > splitedArr[j][k]) {
          countRight += 1;
        } else {
          countRight += 1;
          break;
        }
      }
      //top direction
      for (k = j - 1; k >= 0; k--) {
        if (splitedArr[j][i] > splitedArr[k][i]) {
          countTop += 1;
        } else {
          countTop += 1;
          break;
        }
      }
      //bottom direction
      for (k = j + 1; k < splitedArr.length; k++) {
        if (splitedArr[j][i] > splitedArr[k][i]) {
          countBottom += 1;
        } else {
          countBottom += 1;
          break;
        }
      }
      totalArea.push(countLeft * countRight * countTop * countBottom);
    }
  }
  const highestScore = Math.max(...totalArea);

  console.log(highestScore);
}

partI();
partII();
