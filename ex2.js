const inputArr = [1, 2, 3, 4, 2, 3, 4, 1, 5, 2, 2, 3, 4, 1, 3];

function findMostFrequent(arr) {
  const frequencyMap = {};
  arr.forEach((num) => (frequencyMap[num] = (frequencyMap[num] || 0) + 1));
  const maxFrequency = Math.max(...Object.values(frequencyMap));
  return Object.keys(frequencyMap)
    .filter((num) => frequencyMap[num] === maxFrequency)
    .map(Number);
}

function findMostFrequentUsingMap(arr) {
  const frequencyMap = new Map();
  arr.forEach((num) => (frequencyMap[num] = (frequencyMap[num] || 0) + 1));
  const maxFrequency = Math.max(...frequencyMap.values());
  return [...frequencyMap.keys()]
    .filter((num) => frequencyMap.get(num) === maxFrequency)
    .map(Number);
}

findMostFrequentUsingMap(inputArr).forEach((num) => console.log(Number(num)));

