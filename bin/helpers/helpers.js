/*-------------------getters methods----------------*/
exports.getNumberOfFruit = (data) => {
  return (data || []).length;
}

exports.getOccuranceOfFruit = (data) => {
  return data.filter(function(v) {
        return v.hasOwnProperty(value);
  });
}

exports.getTypesOfFruit = (data) => {
  var fruitTypes = [];
  // create an array of only the 'fruit-type' values
  (data || []).forEach(function(value) {
    value.hasOwnProperty('fruit-type') && fruitTypes.push(value['fruit-type']);
  });

  // removes duplicates from fruitType array and gets unique types of fruit to store in a set
  fruitTypes.splice(0, fruitTypes.length, ...(new Set(fruitTypes)));
  return fruitTypes;
}

exports.getTypesOfFruitNum = (data) => {
  return this.getTypesOfFruit(data).length;
}

exports.getOldestFruitValue = (data) => {
  var ageInDays = 'age-in-days',
      largestNum = 0;

  (data ||[]).forEach(function(value) {
    if (largestNum < value[ageInDays]){
      largestNum = value[ageInDays];
    }
  });
  return largestNum;
}

exports.getSortedFruitsWithOldestDay = (data, largestAge) => {
  return (data || []).filter(value => (value['age-in-days'] || null) === largestAge)
  .sort(function(a,b) { // sort the array alphabetically
    var fruitTypeA = a['fruit-type'],
        fruitTypeB = b['fruit-type'];
    return fruitTypeA > fruitTypeB ? 1 : fruitTypeA < fruitTypeB ? -1 : 0;
  });
}

exports.getArrayOfAllFruitsWithCount = (data) => {
  var fruits = [];
  (data || []).forEach(function(value) {
    if (value.hasOwnProperty('fruit-type')) {
      var fruit = {
        fruitType: value['fruit-type'],
        count: data.reduce((acc,cur) => (cur['fruit-type'] === value['fruit-type'] ? ++acc : acc), 0)
      }
      fruits.push(fruit);
    }
  });
  return fruits;
}

exports.getArrayWithoutDuplicates = (arr) => {
  return Array.from(new Set((arr || []).map(JSON.stringify))).map(JSON.parse);
}

exports.getArraySortedByDecreasingCount = (arr) => {
  return (arr || []).sort(function(a, b) { //sort the array by count from highest to lowest
    var a = a.count,
        b = b.count;
    if (!a || !b) {
      return arr;
    }
    return (a < b) ? 1 : (a > b) ? -1 : 0;
  });
}

exports.getCountOfAllFruitTypesAndChars = (arr, compareFruitObj) => {
  return (arr || []).reduce(function(acc, fruit) {
    return fruit['fruit-type'] === compareFruitObj.fruitType &&
      fruit['characteristic1'] === compareFruitObj.char1 &&
      fruit['characteristic2']  === compareFruitObj.char2 ? ++acc : acc;
  }, 0);
}

/*-------------------logger methods----------------*/
exports.logTotalFruitCount = (data) => {
  console.log('Total number of fruit:');
  console.log(this.getNumberOfFruit(data));
  console.log(' ');
}

exports.logTypesOfFruit = (data) => {
  console.log('Total types of fruit:');
  console.log(this.getTypesOfFruitNum(data));
  console.log(' ');
}

exports.logOldestFruit = (data) => {
  var largestAge = this.getOldestFruitValue(data) || 0; // find the oldest value

  //return an array with the fruits with the oldest days
  console.log('Oldest fruit & age:');
  this.getSortedFruitsWithOldestDay(data, largestAge).forEach(function(value) {
    console.log(value['fruit-type'] + ': ' + value['age-in-days']);
  });
  console.log(' ');
}

exports.logFruitTypesInDescOrder = (data) => {
  var fruits = this.getArrayOfAllFruitsWithCount(data); // returns array with all fruitTypes and the number of each
  uniqueFruit = this.getArrayWithoutDuplicates(fruits);
  uniqueFruit = this.getArraySortedByDecreasingCount(uniqueFruit);
  console.log('The number of each type of fruit in descending order:');
  uniqueFruit.forEach(value => console.log(value.fruitType + ': ' + value.count));
  console.log(' ');
}

exports.logFruitsTypesAndCharInDescOrder = (data) => {
  var fruit = [],
      uniqueFruit;

  data.forEach(function(value) { //create a new array with objects contains properites to log out (contains duplicates)
    var fruitObj = {
      fruitType: value['fruit-type'],
      char1: value['characteristic1'],
      char2: value['characteristic2']
    };

    /*count up by fruit-type and characteristics (based on comparing an object)
      for ex: [
        { 'fruit-type': 'apple', 'characteristic1': 'red', 'characteristic2': 'sweet'},
        { 'fruit-type': 'orange', 'characteristic1': 'round', 'characteristic2': 'sweet'}
        { 'fruit-type': 'apple', 'characteristic1': 'red', 'characteristic2': 'sweet'}
    ]
      would give us a count of 2 bc there are two instances of apple, red, and sweet
    */
    fruitObj.count = this.getCountOfAllFruitTypesAndChars(data, fruitObj);
    fruit.push(fruitObj);
  }, this);

  uniqueFruit = this.getArrayWithoutDuplicates(fruit);
  console.log('The various characteristics (count, color, shape, etc.) of each fruit by type:')
  uniqueFruit.forEach(function(fruit) {
    console.log(fruit.count + ' ' + fruit.fruitType + ': ' + fruit.char1 + ', '+ fruit.char2);
  });
}