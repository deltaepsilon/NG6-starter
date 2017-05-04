import Service from './algorithm.service';
import UtilitiesService from '../utilities/utilities.service';

describe('AlgorithmService', () => {
  let service, utilitiesService;
  beforeEach(() => {
    utilitiesService = new UtilitiesService();
    service = new Service(utilitiesService);
  });

  describe('Fibonacci', () => {
    const fibonacciSequence = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

    describe('For Loop', () => {
      fibonacciSequence.forEach((result, i) => testFibonacci('fibonacciForLoop', i + 1, result));
    });

    describe('Recursive', () => {
      fibonacciSequence.forEach((result, i) => testFibonacci('fibonacciRecursive', i + 1, result));
    });

    function testFibonacci(funcName, n, result) {
      it(`should return ${result} when n is ${n}`, () => {
        expect(service[funcName](n)).toEqual(result);
      });
    }
  });

  describe('Bubble Sort', () => {
    describe('Input/Ouput Tests', () => {
      describe('Monolithic', () => {
        generateBubbleSortTests('bubbleSortMonolith');
      });

      describe('Refactored', () => {
        generateBubbleSortTests('bubbleSortRefactored');
      });

      function generateBubbleSortTests(funcName) {
        it('should sort integers to zero', () => testBubbleSort([4, 3, 2, 1, 0]));
        it('should sort floats', () => testBubbleSort([5.4, 5.3, 5.2, 5.1]));
        it('should sort alphanumeric including empty strings', () => testBubbleSort(['10', '4', '3', '2', '1', '']));
        it('should sort letters', () => testBubbleSort(['d', 'c', 'b', 'a']));
        it('should omit non-alphanumeric values', () => testBubbleSort(['d', 'c', 'b', 'a', {}, [], function() {}]));

        function testBubbleSort(list) {
          const filtered = list.filter(item => {
            const type = typeof item;
            return type == 'string' || type == 'number';
          });
          const sorted = filtered.slice(0).sort();
          expect(service[funcName](list).join()).toEqual(sorted.join());
        }
      }
    });

    describe('Spy Tests', () => {
      it('bubbleSortRefactored', () => {
        spyOn(utilitiesService, 'filterForAlphanumeric').and.returnValue(1);
        spyOn(utilitiesService, 'sortListOnce').and.returnValues(2, 3, 4);
        spyOn(utilitiesService, 'areArraysIdentical').and.returnValues(false, false, true);

        expect(service.bubbleSortRefactored(5)).toEqual(4);
        expect(utilitiesService.filterForAlphanumeric).toHaveBeenCalledWith(5);
        expect(utilitiesService.sortListOnce.calls.allArgs()).toEqual([[1], [2], [3]]);
        expect(utilitiesService.areArraysIdentical.calls.allArgs()).toEqual([[1, 2], [2, 3], [3, 4]]);
      });
    });
  });
});
