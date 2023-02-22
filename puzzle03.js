const fs = require("fs");

const files = fs.readFileSync("./puzzle03-input.txt", "utf8"); //Read the input

const arr = files.replace(/\r/g, "").trim().split("\n"); //remove all carriage returns and split by single line return

//Conver letters to numbers
function letterToNum(s) {
  if (/[a-z]/.test(s)) {
    return s.charCodeAt(0) - 96;
  } else {
    return s.charCodeAt(0) - 38;
  }
}

//Part1
function partI() {
  let resultPartI = [];
  const frontArr = arr.map((x) => x.slice(0, x.length / 2).split(""));
  const backArr = arr.map((x) => x.slice(x.length / 2).split(""));
  for (let i = 0; i < frontArr.length; i++) {
    const frontSet = new Set(frontArr[i]);
    const backSet = new Set(backArr[i]);
    const intersection = new Set([...frontSet].filter((x) => backSet.has(x)));
    //Push the values inside the intersection set into the resultPartI array
    intersection.forEach((x) => {
      resultPartI.push(x);
    });
  }
  //Convert all the letters to numbers
  const resultNumPartI = resultPartI.map((x) => {
    return letterToNum(x);
  });
  //Get the sum
  const totalPartI = resultNumPartI.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  console.log(totalPartI);
}

function partII() {
  let resultPartII = [];
  //First create the grouped array
  groupedArr = [];
  for (let i = 0; i < arr.length / 3; i++) {
    groupedArr.push([arr[i * 3], arr[i * 3 + 1], arr[i * 3 + 2]]);
  }
  const splitedGroupedArr = groupedArr.map((array) =>
    array.map((x) => x.split(""))
  );
  for (let i = 0; i < splitedGroupedArr.length; i++) {
    const firstSet = new Set(splitedGroupedArr[i][0]);
    const secondSet = new Set(splitedGroupedArr[i][1]);
    const thirdSet = new Set(splitedGroupedArr[i][2]);
    const intersection = new Set(
      [...firstSet].filter((x) => secondSet.has(x) && thirdSet.has(x))
    );
    //Push the values inside the intersection set into the resultPartII array
    intersection.forEach((x) => {
      resultPartII.push(x);
    });
  }
  //Convert all the letters to numbers
  const resultNumPartII = resultPartII.map((x) => {
    return letterToNum(x);
  });
  //Get the sum
  const totalPartII = resultNumPartII.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  console.log(totalPartII);
}

partI();
partII();
