#!/usr/bin/env node
(function() {
  var csv = require('csv-parser'),
      fs = require('fs'),
      helpers = require('./helpers'),
      program = require('commander'),
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
        process.exit();
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
        console.log('ERROR: DATA IS NOT VALID');
        process.exit();
        return;
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

  program
    .command('help')
    .description('Display Verbose Help')
    .action(function(){
      console.log(' ');
      console.log('****************************************');
      console.log('----------------------------');
      console.log('NEED HELP TO GET STARTED?');
      console.log('----------------------------');
      console.log(' ');
      console.log('HOW TO RUN THIS APP?');
      console.log('To run the fruit-basket app, enter this command "fruit-basket start"')
      console.log('****************************');
      console.log(' ');
      console.log('HOW TO RUN UNIT TESTS?');
      console.log('Enter this command "npm test"');
      console.log('****************************************');
      console.log(' ');
      process.exit();
    });

  program
    .command('start')
    .description('start fruit-basket app')
    .action(function(){
      init();
      showFilePrompt(); //input functionality
    });

  program.parse(process.argv);

}());