const fs = require("fs");

const files = fs.readFileSync("./puzzle01-input.txt", "utf8"); //Read the input numbers of Calories as a string

const arr = files.replace(/\r/g, "").trim().split("\n\n"); //remove all carriage returns and split by double line return

const totalCalories = arr.map((x) => {
  return x
    .split("\n") //split by single line return for each item
    .map(Number) //turn string into a number
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0); //get the sum using the reduce method.
});

//Part1 Solution:
const maxTotalCalories = Math.max(...totalCalories);
console.log(maxTotalCalories);

//Part2:
//First sort the totalCalories array in descending order:
totalCalories.sort((a, b) => b - a);

//Part2 Solution:
topThreeTotalCalories = totalCalories[0] + totalCalories[1] + totalCalories[2];
console.log(topThreeTotalCalories);
