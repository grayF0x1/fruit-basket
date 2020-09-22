const chai = require('chai'),
      expect = chai.expect,
      helper = require('../');

describe('#getNumberOfFruit', function() {
  describe('if empty array is passed', function() {
    it('returns 0 as default', function () {
      expect(helper.getNumberOfFruit([])).equal(0);
    })
  });
  describe('if no array is passed', function() {
    it('returns 0 as default', function () {
      expect(helper.getNumberOfFruit()).equal(0);
    })
  });
  describe('if array (with values) is passed', function() {
    it('logs the total number of fruit', function() {
      expect(helper.getNumberOfFruit(['foo', 'bar', 'hi'])).equal(3);
    });
  });
});

describe('#getTypeOfFruit', function() {
  describe('if no array is passed', function() {
    it('returns empty array', function() {
      expect(helper.getTypesOfFruit()).deep.equal([])
    });
  });
  describe('if empty array is passed', function() {
    it('returns empty array', function() {
      expect(helper.getTypesOfFruit([])).deep.equal([])
    });
  });
  describe('if array is passed', function() {
    describe('if array with multiple objects with unique fruit-type property values is passed', function() {
      it('returns array with expected values', function() {
        var testData = [
          { 'fruit-type': 'apple' },
          { 'fruit-type': 'orange' },
          { 'fruit-type': 'pear' }
        ];
        expect(helper.getTypesOfFruit(testData)).deep.equal(['apple', 'orange', 'pear']);
      });
    });
    describe('if array with multiple objects without fruit-type property is passed', function() {
      it('returns empty array', function() {
        var testData = [
          { 'foo': 1 },
          { 'foo': 5 },
          { 'foo': 3 },
          { 'foo': 2 }
        ];
        expect(helper.getTypesOfFruit(testData)).deep.equal([]);
      });
    });
    describe('if array with multiple objects with duplicates of fruit-type property values is passed', function() {
      it('returns only the unique number of fruits', function() {
        var testData = [
          { 'fruit-type': 'apple' },
          { 'fruit-type': 'orange' },
          { 'fruit-type': 'apple' },
          { 'fruit-type': 'pear' }
        ];
        expect(helper.getTypesOfFruit(testData)).deep.equal(['apple', 'orange', 'pear']);
      });
    });
  });
});

describe('#getOldestFruitValue', function() {
  describe('if no array is passed', function() {
    it('returns 0', function() {
      expect(helper.getOldestFruitValue()).equal(0);
    });
  });
  describe('if empty array is passed', function() {
    it('returns 0', function() {
      expect(helper.getOldestFruitValue([])).equal(0);
    });
  });
  describe('if array with multiple objects without "age-in-days" property is passed', function() {
    it('returns 0', function() {
      var testData = [
        { 'foo': 1 },
        { 'foo': 5 },
        { 'foo': 3 },
        { 'foo': 2 }
      ];
      expect(helper.getOldestFruitValue(testData)).equal(0);
    });
  });
  describe('if array with multiple objects with age-in-dates property is passed', function() {
    it('returns the largest age-in-days value', function() {
      var testData = [
        { 'age-in-days': 1 },
        { 'age-in-days': 5 },
        { 'age-in-days': 3 },
        { 'age-in-days': 2 }
      ];
      expect(helper.getOldestFruitValue(testData)).equal(5);
    });
  });
});

describe('#getSortedFruitsWithOldestDay', function() {
  describe('if no array is passed', function() {
    describe('and if largestAge is not passed', function() {
      it('returns empty array', function() {
        expect(helper.getSortedFruitsWithOldestDay(null)).deep.equal([])
      });
    });
    describe('and if largestAge is passed', function() {
      it('returns empty array', function() {
        expect(helper.getSortedFruitsWithOldestDay(null, 8)).deep.equal([])
      });
    });
  });
  describe('if empty array is passed', function() {
    describe('and largestAge is not passed', function() {
      it('returns empty array', function() {
        expect(helper.getSortedFruitsWithOldestDay([])).deep.equal([])
      });
    });
    describe('and largestAge is passed', function() {
      it('returns empty array', function() {
        expect(helper.getSortedFruitsWithOldestDay([], 8)).deep.equal([])
      });
    });
  });
  describe('if array with multiple objects without "age-in-days" property is passed and largestAge is passed', function() {
    it('returns empty array', function() {
      var testData = [
        { 'foo': 1 },
        { 'foo': 5 },
        { 'foo': 3 },
        { 'foo': 2 }
      ];
      expect(helper.getSortedFruitsWithOldestDay(testData, 8)).deep.equal([])
    });
  });
});

describe('#getArrayOfAllFruitsWithCount', function() {
  describe('if no array is passed', function() {
    it('returns empty array', function() {
      expect(helper.getArrayOfAllFruitsWithCount()).deep.equal([]);
    });
  });
  describe('if empty array is passed', function() {
    it('returns empty array', function() {
      expect(helper.getArrayOfAllFruitsWithCount([])).deep.equal([]);
    });
  });
  describe('if array with multiple objects with with no fruit-type property is passed', function() {
    it('returns array of all fruit-types', function() {
      var testData = [
        { 'foo': 1 },
        { 'foo': 5 },
        { 'foo': 3 },
        { 'foo': 2 }
      ];
      expect(helper.getArrayOfAllFruitsWithCount(testData)).deep.equal([]);
    });
  });
  describe('if array with multiple objects with the same fruit-type property value is passed', function() {
    it('returns array of all fruit-types', function() {
      var testData = [
        { 'fruit-type': 'apple' },
        { 'fruit-type': 'pear' },
        { 'fruit-type': 'apple' },
        { 'fruit-type': 'orange' }
      ];
      expect(helper.getArrayOfAllFruitsWithCount(testData)).deep.equal([
        { 'count': 2, 'fruitType': 'apple' },
        { 'count': 1, 'fruitType': 'pear' },
        { 'count': 2, 'fruitType': 'apple' },
        { 'count': 1, 'fruitType': 'orange' }
      ]);
    });
  });
});

describe('#getArrayWithoutDuplicates', function() {
  describe('if no array is passed', function() {
    it('returns empty array', function() {
      expect(helper.getArrayWithoutDuplicates()).deep.equal([]);
    });
  });
  describe('if empty array is passed', function() {
    it('returns empty array', function() {
      expect(helper.getArrayWithoutDuplicates([])).deep.equal([]);
    });
  });
  describe('if array contains duplicates passed', function() {
    it('returns empty array', function() {
      expect(helper.getArrayWithoutDuplicates(['every', 'day', 'shuffling', 'every'])).deep.equal(['every', 'day', 'shuffling']);
    });
  });
});

describe('#getArraySortedByDecreasingCount', function() {
  describe('if no array is passed', function() {
    it('returns empty array', function() {
      expect(helper.getArraySortedByDecreasingCount()).deep.equal([]);
    });
  });
  describe('if empty array is passed', function() {
    it('returns empty array', function() {
      expect(helper.getArraySortedByDecreasingCount([])).deep.equal([]);
    });
  });
  describe('if array contains multiple objects without a count property passed', function() {
    it('returns array as unsorted', function() {
      var testData = [
        { foo: 1 },
        { foo: 5 },
        { foo: 3 }
      ];
      expect(helper.getArraySortedByDecreasingCount(testData)).deep.equal([
        { foo: 1 },
        { foo: 5 },
        { foo: 3 }
      ]);
    });
  });
  describe('if array contains multiple objects with count property passed', function() {
    it('returns sorted array by count', function() {
      var testData = [
        { count: 1 },
        { count: 5 },
        { count: 3 }
      ];
      expect(helper.getArraySortedByDecreasingCount(testData)).deep.equal([
        { count: 5 },
        { count: 3 },
        { count: 1 }
      ]);
    });
  });
});

describe('#getCountOfAllFruitTypesAndChars', function() {
  describe('if no array is passed', function() {
    it('returns 0', function() {
      expect(helper.getCountOfAllFruitTypesAndChars()).deep.equal(0);
    });
  });
  describe('if empty array is passed', function() {
    it('returns 0', function() {
      expect(helper.getCountOfAllFruitTypesAndChars([])).deep.equal(0);
    });
  });
  describe('if array contains multiple objects with fruit-type, characteristic1 and characteristic2 properties passed', function() {
    it('returns number value', function() {
      var testData = [
        { 'fruit-type': 'apple',  'characteristic1': 'red', 'characteristic2': 'sweet'},
        { 'fruit-type': 'orange', 'characteristic1': 'round', 'characteristic2': 'sweet'},
        { 'fruit-type': 'apple',  'characteristic1': 'red', 'characteristic2': 'sweet'}
      ],
      comparedData = { 'fruitType': 'apple',  'char1': 'red', 'char2': 'sweet'};
      expect(helper.getCountOfAllFruitTypesAndChars(testData, comparedData)).equal(2);
    });
  });
});