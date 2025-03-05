const inputArr = [2, 5, 6, 1, 2, 4, 3, 3, 2, 5, 4, 3];

function removeDuplicateElementsUsingTwoLoops(inputArr) {
  const uniqueArr = [];
  for (let i = 0; i < inputArr.length; i++) {
    if (!uniqueArr.includes(inputArr[i])) {
      uniqueArr.push(inputArr[i]);
    }
  }
  return uniqueArr;
}

function removeDuplicateElementsUsingSortAndLoop(inputArr) {
  if (inputArr.length === 0) return []
  inputArr.sort((a, b) => a - b);
  const uniqueArr = [inputArr[0]];
  for (let i = 1; i < inputArr.length; i++) {
    if (inputArr[i] !== inputArr[i - 1]) {
      uniqueArr.push(inputArr[i]);
    }
  }
  return uniqueArr;
}

function removeDuplicateElementsUsingSet(inputArr) {
  const uniqueArr = [...new Set(inputArr)];
  return uniqueArr;
}

console.log(removeDuplicateElementsUsingTwoLoops(inputArr));

console.log(removeDuplicateElementsUsingSortAndLoop([...inputArr]));

console.log(removeDuplicateElementsUsingSet(inputArr));
