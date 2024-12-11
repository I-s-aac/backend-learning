const start = Number(process.argv[3]) || 1;
const end = Number(process.argv[4]) || 20; // inclusive
let lineNumber = 1;

const type = process.argv[2] || "even";

// valid process.argv inputs, in order
// type: "even" or "odd"
// start: number
// end: number

const thing = (i) => {
  if ((i % 2 === 0 && type === "even") || (i % 2 !== 0 && type === "odd")) {
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

// const array = [];
// for (let i = 0; i <= 20; i++) {
//   array.push(i);
// }
// console.log(array);

// lineNumber = 1;
// array.forEach((value) => {
//   thing(value);
// });
