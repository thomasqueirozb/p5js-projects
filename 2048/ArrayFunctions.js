// Create 2-dimensional array
function Array2D(w, h) {
  let arr = [];
  for (let x = 0; x < h; x++) {
    arr.push(new Array(w));
    for (let y = 0; y < w; y++) {
      arr[x][y] = 0;
    }
  }
  return arr;
}

// Get available spots
function getAvailable(arr) {
  let list = [];
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y] == 0) {
        list.push([x, y]);
      }
    }
  }
  return list;
}

// From the available spots, put a new number in it
function putNewNumber(arr) {
  let available = getAvailable(arr);

  // 10% chance of being a 4
  let number = 2;
  if (random(1) < 0.1) {
    number = 4;
  }

  pos = available[floor(random(available.length))];
  arr[pos[0]][pos[1]] = number

}


// Check if 1D arrays are equal
// Only works with same sized arrays
function checkEqual1D(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i]) {
      // print(arr1[i],arr2[i])
      return false;
    }
  }
  return true;
}


// Check if 2D arrays are equal
// Only works with same sized arrays
function checkEqual2D(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    if (!checkEqual1D(arr1[i], arr2[i])) {
      // print(arr1[i],arr2[i])
      return false;
    }
  }
  return true;
}

// Copies the array without any references
function copyArray(arr) {
  let ret = Array2D(gridwidth, gridheight);
  for (let x = 0; x < arr.length; x++) {
    for (let y = 0; y < arr[x].length; y++) {
      ret[x][y] = arr[x][y];
    }
  }
  return ret;

}

// Reverses vertically
function reverse1D(arr) {
  let ret = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    ret.push(arr[i]);
  }
  return ret;
}

function reverseY(arr) {
  let ret = [];
  for (let i of arr) {
    ret.push(reverse1D(i));
  }
  return ret;
}

function transpose(arr) {
  return arr[0].map((col, i) => arr.map(row => row[i]));
}

function reverseX(arr) {
  arr = transpose(arr);
  arr = reverseY(arr);
  arr = transpose(arr);
  return arr;
}

function copyArray1D(arr) {
  let ret = [];
  for (let i of arr) {
    ret.push(i)
  }
  return ret
}
