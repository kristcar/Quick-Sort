//Quick Sort Visualizer

//Quick Sort runs in O(n log(n)) time with a divide and conquer approach

let values = [];
let w = 10;
let states = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  values = new Array(floor(width / w));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
    states[i] = -1;
  }
  quickSort(values, 0, values.length - 1);
}

async function quickSort(array, start, end) {
  if (start >= end) {
    return;
  }

  let index = await partition(array, start, end); //use end as pivot
  states[index] = -1;
  await Promise.all([
    //runs simultaneously
    quickSort(array, start, index - 1), //sort front half
    quickSort(array, index + 1, end), //sort end half
  ]);
}

async function partition(array, start, end) {
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }

  let pivotIndex = start;
  let pivotValue = array[end];
  states[pivotIndex] = 0;
  for (let i = start; i < end; i++) {
    if (array[i] < pivotValue) {
      await swap(array, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  await swap(array, pivotIndex, end);
  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }
  return pivotIndex;
}

function draw() {
  background(255, 255, 255);
  for (let i = 0; i < values.length; i++) {
    noStroke();
    if (states[i] == 0) {
      fill(255, 80, 80);
    } else if (states[i] == 1) {
      fill(255, 204, 0);
    } else {
      fill(51, 153, 255);
    }
    rect(i * w, height - values[i], w, values[i]);
  }
}

async function swap(array, a, b) {
  await sleep(25);
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
