const start = 1;
const end = 20; // inclusive
let lineNumber = 1;
const thing = (i) => {
  if (i % 2 !== 0) {
    console.log(`${lineNumber}: ${i}`);
    lineNumber++;
  }
};
if (start < end) {
  for (let i = start; i <= end; i++) {
    thing(i);
  }
} else if (start > end) {
  for (let i = end; i >= start; i--) {
    thing(i);
  }
}

const array = [];
for (let i = 0; i <= 20; i++) {
  array.push(i);
}
console.log(array);

lineNumber = 1;
array.forEach((value) => {
  thing(value);
});
