import Service from './utilities.service';

describe('UtilitiesService', () => {
  let service;
  beforeEach(() => {
    service = new Service();
  });

  it('filterForAlphanumeric', () => {
    const list = [1, 2, 3, 4, 5];
    spyOn(service, 'isSortableValue').and.returnValues(false, false, false, true, true);
    expect(service.filterForAlphanumeric(list)).toEqual([4, 5]);
    expect(list.length).toEqual(5);
  });

  describe('isSortableValue', () => {
    const tests = [
      { description: 'number', value: 1, expected: true },
      { description: 'string', value: '1', expected: true },
      { description: 'boolean', value: true, expected: true },
      { description: 'function', value: () => true },
      { description: 'object', value: { test: 1 } },
      { description: 'array', value: [] }
    ];

    tests.forEach(test => {
      it(`should return ${!!test.expected} for a ${test.description}`, () => {
        testisSortableValue(test);
      });
    });

    function testisSortableValue({ value, expected }) {
      expect(service.isSortableValue(value)).toEqual(!!expected);
    }
  });

  it('sortListOnce', () => {
    const list = [1, 2, 3];
    spyOn(service, 'reduceList').and.returnValues(4, 5, 6);
    expect(service.sortListOnce(list)).toEqual(6);
    expect(service.reduceList.calls.allArgs()).toEqual([[[1, 2, 3], 1, 0], [4, 2, 1], [5, 3, 2]]);
  });

  describe('reduceList', () => {
    it('should not swap items', () =>
      testReduceList(
        { args: [[1], 2, 3], getItemsForSort: { a: 4, b: 5 }, shouldSwapItems: false },
        { getItemsForSort: [[[1], 3]], shouldSwapItems: [[4, 5]], swapListItems: [], result: [1] }
      ));
    
    it('should swap items', () =>
      testReduceList(
        { args: [[1], 2, 3], getItemsForSort: { a: 4, b: 5 }, shouldSwapItems: true, swapListItems: 6 },
        { getItemsForSort: [[[1], 3]], shouldSwapItems: [[4, 5]], swapListItems: [[[1], 3, 2]], result: 6 }
      ));

    function testReduceList(results, expectations) {
      const subFunctions = ['getItemsForSort', 'shouldSwapItems', 'swapListItems'];

      subFunctions.forEach(funcName => {
        spyOn(service, funcName).and.returnValue(results[funcName]);
      });

      expect(service.reduceList.apply(service, results.args)).toEqual(expectations.result);

      subFunctions.forEach(funcName => {
        expect(service[funcName].calls.allArgs()).toEqual(expectations[funcName]);
      });
    }
  });

  it('getItemsForSort', () => {
    const list = [0, 1];
    expect(service.getItemsForSort(list, 1)).toEqual({ a: 1, b: 0 });
  });

  describe('shouldSwapItems', () => {
    const tests = [
      { expected: false, a: undefined, b: undefined },
      { expected: false, a: undefined, b: 1 },
      { expected: false, a: 1, b: undefined },
      { expected: false, a: false, b: false },
      { expected: true, a: false, b: true },
      { expected: true, a: 1, b: 2 },
      { expected: false, a: 2, b: 1 },
      { expected: true, a: 'a', b: 'b' },
      { expected: false, a: 'b', b: 'a' }
    ];

    tests.forEach(test => {
      it(`should return ${test.expected} for ${test.a} < ${test.b}`, () => testshouldSwapItems(test));
    });

    function testshouldSwapItems({ a, b, expected }) {
      expect(service.shouldSwapItems(a, b)).toEqual(expected);
    }
  });

  it('swapListItems', () => {
    const list = [1, 2];
    expect(service.swapListItems(list, 0, 1)).toEqual([2, 1]);
    expect(list).toEqual([1, 2]);
  });

  describe('areArraysIdentical', () => {
    const tests = [
      { expected: true, a: [1, 2], b: [1, 2] },
      { expected: false, a: [1, 2], b: [1, 2, 3] },
      { expected: false, a: [1, 2], b: [1, 1] }
    ];

    tests.forEach(test => {
      it(`should return ${test.expected} for ${test.a.join()} and ${test.b.join()}`, () =>
        testareArraysIdentical(test));
    });

    function testareArraysIdentical({ a, b, expected }) {
      expect(service.areArraysIdentical(a, b)).toEqual(expected);
    }
  });
});
