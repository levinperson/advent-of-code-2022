const fs = require("fs");

const files = fs.readFileSync("./puzzle07-input.txt", "utf8"); //Read the input

const arr = files
  .replace(/\r/g, "")
  .trim()
  .split("\n")
  .filter((x) => {
    return x !== "$ ls" && x !== "$ cd ..";
  }); //remove all carriage returns and split by single line return and conduct a filter

//This while and for loop is to assign every directory with a unique name and get rid of the duplicates
while (new Set(arr).size !== arr.length) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      section = arr.slice(i + 1, j + 1);
      if (
        arr[i].startsWith("dir") &&
        arr[j].startsWith("$ cd") &&
        arr[i].substring(4) === arr[j].substring(5) &&
        !section.includes(arr[i])
      ) {
        arr[i] += i;
        arr[j] += i;
      }
    }
  }
}

arrCleaned = arr.map((x) => {
  if (/^\d/.test(x)) return parseInt(x.replace(/\D/g, ""));
  if (typeof x === "string" && x.includes("dir")) return x.replace("dir ", "");
  return x;
});

let directoriesNameIndex = [];
for (let i = 0; i < arrCleaned.length; i++) {
  if (typeof arrCleaned[i] === "string" && arrCleaned[i].includes("$ cd")) {
    directoriesNameIndex.push({
      name: arrCleaned[i].slice(5),
      index: i,
    });
  }
}
//Obtain the directory array, each element is an object
let dirs = [];
for (let i = 0; i < directoriesNameIndex.length - 1; i++) {
  dirs[i] = {
    name: directoriesNameIndex[i].name,
    items: arrCleaned.slice(
      directoriesNameIndex[i].index + 1,
      directoriesNameIndex[i + 1].index
    ),
  };
}
dirs[directoriesNameIndex.length - 1] = {
  name: directoriesNameIndex[directoriesNameIndex.length - 1].name,
  items: arrCleaned.slice(
    directoriesNameIndex[directoriesNameIndex.length - 1].index + 1,
    arrCleaned.length
  ),
};
//Finally, make all the directories only include number items (no string)
for (let i = 0; i < dirs.length; i++) {
  //dirs
  while (dirs[i].items.some((x) => typeof x === "string")) {
    for (let j = 0; j < dirs[i].items.length; j++) {
      //items
      if (typeof dirs[i].items[j] === "string") {
        //If the items have a string name
        const tempStr = dirs[i].items[j]; //tempStr is the string name
        for (let k = i + 1; k < dirs.length; k++) {
          if (dirs[k].name === tempStr) {
            dirs[i].items.splice(j, 1, ...dirs[k].items);
            break;
          }
        }
      }
    }
  }
}

//Calculate the size of each folder, and store the info in the object
for (let i = 0; i < dirs.length; i++) {
  dirs[i].size = dirs[i].items.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
}

//Part 1
let totalPartI = 0;
for (let directory of dirs) {
  if (directory.size <= 100000) {
    totalPartI += directory.size;
  }
}

//Part 2
const totalSpace = 70000000;
const spaceNeeded = 30000000;
const currentUnusedSpace = totalSpace - dirs[0].size;
const minimumSizeToFree = spaceNeeded - currentUnusedSpace;
const filteredDirs = dirs
  .filter((x) => x.size >= minimumSizeToFree)
  .sort((a, b) => a.size - b.size);
//Get the Part2 result
const totalPartII = filteredDirs[0].size;

console.log(totalPartI);
console.log(totalPartII);
