#!/usr/bin/env node
(function() {
  var csv = require('csv-parser'),
      fs = require('fs'),
      helpers = require('./helpers'),
      readline = require('readline'),
      fruitDataValid = [],
      rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

  init = function() {
    console.log('------------------WELCOME TO FRUIT BASKET APP------------------');
  }

  shareFruitSummary = function() {
    console.log('------------------YOUR FRUIT SUMMARY------------------');
    helpers.logTotalFruitCount(fruitDataValid);
    helpers.logTypesOfFruit(fruitDataValid);
    helpers.logOldestFruit(fruitDataValid);
    helpers.logFruitTypesInDescOrder(fruitDataValid);
    helpers.logFruitsTypesAndCharInDescOrder(fruitDataValid);
  }

  loadFile = function(file) {
    console.log('----------------------------');
    console.log('LOADING FILE....' + file);
    console.log('----------------------------');

    fs.readFile(file, 'utf8' , (error, data) => { // this will return the data in string form
      if (error) {
        console.log('ERROR: FILE DOES NOT EXIST! ' + error);
        return;
      }
      console.log(data); // this needs to be uncommented out!
      parseData(file);
    });
  }

  parseData = function(file) {
    fs.createReadStream(file, { encoding: 'utf8'})
    .pipe(csv())
    .on('data', (data) => {
      fruitDataValid.push(data)
    })
    .on('end', () => {
      console.log('LOADED FILE!')
      if (!validateData(fruitDataValid)) {
        return console.log('ERROR: DATA IS NOT VALID');
      };

      console.log('DATA VALID');
      shareFruitSummary();
      return;
    })
  }

  validateData = function(arrData) {
    var isValid = arrData.every(function(value) {
      return (value.hasOwnProperty('fruit-type') && value['fruit-type']) &&
             (value.hasOwnProperty('age-in-days') && value['age-in-days']) &&
             (value.hasOwnProperty('characteristic1') && value['characteristic1']) &&
             (value.hasOwnProperty('characteristic2') && value['characteristic1']);
    });
    return isValid;
  }

  showFilePrompt = function() {
    rl.question('Enter CSV File: ',(filepath) => {
      this.loadFile(filepath);
      rl.close();
    });
  }

  init();
  showFilePrompt(); //input functionality
}());