const fs = require("fs");

const files = fs.readFileSync("./puzzle09-input.txt", "utf8"); //Read the input

const arr = files.replace(/\r/g, "").trim().split("\n"); //remove all carriage returns and split by single line return

const moves = arr.map((x) => x.split(" "));
const movesNum = moves.map((x) => {
  return [x[0], parseInt(x[1])];
});
//position object for Part 1
const positionsI = {
  H: { x: [0], y: [0] }, //Assume that the initital positions of both H and T are at (0,0)
  T: { x: [0], y: [0] },
};

function followsTheKnot(head, tail) {
  if (
    //if T and H are on the same row and H is on its right
    tail.y[tail.y.length - 1] === head.y[head.y.length - 1] &&
    head.x[head.x.length - 1] === tail.x[tail.x.length - 1] + 2
  ) {
    tail.x.push(tail.x[tail.x.length - 1] + 1);
    tail.y.push(tail.y[tail.y.length - 1]);
  } else if (
    //if T and H are on the same row and H is on its left
    tail.y[tail.y.length - 1] === head.y[head.y.length - 1] &&
    head.x[head.x.length - 1] === tail.x[tail.x.length - 1] - 2
  ) {
    tail.x.push(tail.x[tail.x.length - 1] - 1);
    tail.y.push(tail.y[tail.y.length - 1]);
  } else if (
    //if T and H are on the same column and H is on its top
    tail.x[tail.x.length - 1] === head.x[head.x.length - 1] &&
    head.y[head.y.length - 1] === tail.y[tail.y.length - 1] + 2
  ) {
    tail.y.push(tail.y[tail.y.length - 1] + 1);
    tail.x.push(tail.x[tail.x.length - 1]);
  } else if (
    //if T and H are on the same column and H is on its bottom
    tail.x[tail.x.length - 1] === head.x[head.x.length - 1] &&
    head.y[head.y.length - 1] === tail.y[tail.y.length - 1] - 2
  ) {
    tail.y.push(tail.y[tail.y.length - 1] - 1);
    tail.x.push(tail.x[tail.x.length - 1]);
  } else if (
    // when the tail needs to move one step diagonally to keep up
    //when H is on the right top corner of T
    head.y[head.y.length - 1] > tail.y[tail.y.length - 1] &&
    head.x[head.x.length - 1] > tail.x[tail.x.length - 1] &&
    (head.y[head.y.length - 1] === tail.y[tail.y.length - 1] + 2 ||
      head.x[head.x.length - 1] === tail.x[tail.x.length - 1] + 2)
  ) {
    tail.x.push(tail.x[tail.x.length - 1] + 1);
    tail.y.push(tail.y[tail.y.length - 1] + 1);
  } else if (
    //when H is on the right bottom corner of T
    head.y[head.y.length - 1] < tail.y[tail.y.length - 1] &&
    head.x[head.x.length - 1] > tail.x[tail.x.length - 1] &&
    (head.y[head.y.length - 1] === tail.y[tail.y.length - 1] - 2 ||
      head.x[head.x.length - 1] === tail.x[tail.x.length - 1] + 2)
  ) {
    tail.x.push(tail.x[tail.x.length - 1] + 1);
    tail.y.push(tail.y[tail.y.length - 1] - 1);
  } else if (
    //when H is on the left bottom corner of T
    head.y[head.y.length - 1] < tail.y[tail.y.length - 1] &&
    head.x[head.x.length - 1] < tail.x[tail.x.length - 1] &&
    (head.y[head.y.length - 1] === tail.y[tail.y.length - 1] - 2 ||
      head.x[head.x.length - 1] === tail.x[tail.x.length - 1] - 2)
  ) {
    tail.x.push(tail.x[tail.x.length - 1] - 1);
    tail.y.push(tail.y[tail.y.length - 1] - 1);
  } else if (
    //when H is on the left top corner of T
    head.y[head.y.length - 1] > tail.y[tail.y.length - 1] &&
    head.x[head.x.length - 1] < tail.x[tail.x.length - 1] &&
    (head.y[head.y.length - 1] === tail.y[tail.y.length - 1] + 2 ||
      head.x[head.x.length - 1] === tail.x[tail.x.length - 1] - 2)
  ) {
    tail.x.push(tail.x[tail.x.length - 1] - 1);
    tail.y.push(tail.y[tail.y.length - 1] + 1);
  }
}

//Get the positions of Tail based on the obtained final positions object
function positionsOfT(tail) {
  const pOfT = [];
  for (let i = 0; i < tail.x.length; i++) {
    pOfT.push(JSON.stringify([tail.x[i], tail.y[i]])); //Turn the position array, such as [0,3] into a string
  }
  return pOfT;
}

function partI() {
  //j is the number of moves that are carried out
  for (let j = 0; j <= movesNum.length - 1; j++) {
    for (let i = 1; i <= movesNum[j][1]; i++) {
      if (movesNum[j][0] === "R") {
        positionsI.H.x.push(positionsI.H.x[positionsI.H.x.length - 1] + 1);
        positionsI.H.y.push(positionsI.H.y[positionsI.H.y.length - 1]);
      }
      if (movesNum[j][0] === "L") {
        positionsI.H.x.push(positionsI.H.x[positionsI.H.x.length - 1] - 1);
        positionsI.H.y.push(positionsI.H.y[positionsI.H.y.length - 1]);
      }
      if (movesNum[j][0] === "U") {
        positionsI.H.y.push(positionsI.H.y[positionsI.H.y.length - 1] + 1);
        positionsI.H.x.push(positionsI.H.x[positionsI.H.x.length - 1]);
      }
      if (movesNum[j][0] === "D") {
        positionsI.H.y.push(positionsI.H.y[positionsI.H.y.length - 1] - 1);
        positionsI.H.x.push(positionsI.H.x[positionsI.H.x.length - 1]);
      }
      followsTheKnot(positionsI.H, positionsI.T);
    }
  }
  const tailPositions = positionsOfT(positionsI.T);
  const uniq = [...new Set(tailPositions)];
  console.log(uniq.length);
}

//position object for Part 2
const knotsNum = 9;
const positionsII = {
  H: { x: [0], y: [0] },
};
for (let i = 1; i <= knotsNum; i++) {
  positionsII[i] = { x: [0], y: [0] };
}

function partII() {
  //j is the number of moves that are carried out
  for (let j = 0; j <= movesNum.length - 1; j++) {
    for (let i = 1; i <= movesNum[j][1]; i++) {
      if (movesNum[j][0] === "R") {
        positionsII.H.x.push(positionsII.H.x[positionsII.H.x.length - 1] + 1);
        positionsII.H.y.push(positionsII.H.y[positionsII.H.y.length - 1]);
      }
      if (movesNum[j][0] === "L") {
        positionsII.H.x.push(positionsII.H.x[positionsII.H.x.length - 1] - 1);
        positionsII.H.y.push(positionsII.H.y[positionsII.H.y.length - 1]);
      }
      if (movesNum[j][0] === "U") {
        positionsII.H.y.push(positionsII.H.y[positionsII.H.y.length - 1] + 1);
        positionsII.H.x.push(positionsII.H.x[positionsII.H.x.length - 1]);
      }
      if (movesNum[j][0] === "D") {
        positionsII.H.y.push(positionsII.H.y[positionsII.H.y.length - 1] - 1);
        positionsII.H.x.push(positionsII.H.x[positionsII.H.x.length - 1]);
      }
      followsTheKnot(positionsII.H, positionsII[1]);
      //keep calling the followsTheKnot function until the tail position is calculated
      for (let i = 1; i < knotsNum; i++) {
        followsTheKnot(positionsII[i], positionsII[i + 1]);
      }
    }
  }
  const tailPositionsII = positionsOfT(positionsII[knotsNum]);
  const uniqII = [...new Set(tailPositionsII)];
  console.log(uniqII.length);
}

partI();
partII();
