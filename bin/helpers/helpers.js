exports.logTotalFruitCount = (data) => {
  console.log('Total number of fruit:');
  console.log(data.length);
  console.log(' ');
}

exports.logTypesOfFruit = (data) => {
  var fruitTypes = [];

  // create an array of only the 'fruit-type' values
  data.forEach(function(value) {
    fruitTypes.push(value['fruit-type']);
  });

  // removes duplicates from fruitType array and gets unique types of fruit to store in a set
  fruitTypes.splice(0, fruitTypes.length, ...(new Set(fruitTypes)));
  console.log('Total types of fruit:');
  console.log(fruitTypes.length);
  console.log(' ');
}

exports.logOldestFruit = (data) => {
  var ageInDays = 'age-in-days',
      largestNum = 0,
      oldestFruits = [];

  // could you sort from the highest first? map?

  // find the oldest value
  data.forEach(function(value) {
    if (largestNum < value[ageInDays]){
      largestNum = value[ageInDays];
    }
  });

  //return an array with the fruits with the oldest days
  oldestFruits = data.filter(value => value[ageInDays] === largestNum)
  .sort(function(a,b) { // sort the array alphabetically
    var fruitTypeA = a['fruit-type'],
        fruitTypeB = b['fruit-type'];
    return fruitTypeA > fruitTypeB ? 1 : fruitTypeA < fruitTypeB ? -1 : 0;
  });
  console.log('Oldest fruit & age:');
  oldestFruits.forEach(function(value) {
    console.log(value['fruit-type'] + ': ' + value[ageInDays]);
  });
  console.log(' ');
}

exports.logFruitTypesInDescOrder = (data) => {
  var fruits =[];
  data.forEach(function(value) {
    var fruit = {
      fruitType: value['fruit-type'],
      count: data.reduce((acc,cur) => (cur['fruit-type'] === value['fruit-type'] ? ++acc : acc), 0)
    }
    fruits.push(fruit);
  })
  //remove the duplicates from the array
  uniqueFruit = Array.from(new Set(fruits.map(JSON.stringify))).map(JSON.parse)
  .sort(function(a, b) { //sort the array by count from highest to lowest
    var a = a.count,
        b = b.count;
    return (a.count < b) ? 1 : (a > b) ? -1 : 0;
  });
  console.log('The number of each type of fruit in descending order:');
  uniqueFruit.forEach(value => console.log(value.fruitType + ': ' + value.count));
  console.log(' ');
}

exports.logFruitsTypesAndCharInDescOrder = (data) => {
  var fruit = [],
      uniqueFruit;

  data.forEach(function(value) { //create a new array with objects contains properites to log out
    var fruitObj = {
      fruitType: value['fruit-type'],
      char1: value['characteristic1'],
      char2: value['characteristic2']
    };

    fruitObj.count = data.reduce(function(acc, fruit) {
      return fruit['fruit-type'] === fruitObj.fruitType &&
        fruit['characteristic1'] === fruitObj.char1 &&
        fruit['characteristic2']  === fruitObj.char2 ? ++acc : acc;
    }, 0);
    fruit.push(fruitObj);
  });
  uniqueFruit = Array.from(new Set(fruit.map(JSON.stringify))).map(JSON.parse);
  console.log('The various characteristics (count, color, shape, etc.) of each fruit by type:')
  uniqueFruit.forEach(function(fruit) {
    console.log(fruit.count + ' ' + fruit.fruitType + ': ' + fruit.char1 + ', '+ fruit.char2);
  });
}