class AlgorithmService {
  constructor(UtilitiesService) {
    this.UtilitiesService = UtilitiesService;
  }

  fibonacciForLoop(n) {
    let result = 1;
    let lagged1 = 1;
    let lagged2 = 0;
    for (let index = 2; index <= n; index++) {
      result = lagged1 + lagged2;
      lagged2 = lagged1;
      lagged1 = result;
    }
    return result;
  }

  fibonacciRecursive(n) {
    if (n <= 2) return 1;
    return this.fibonacciRecursive(n - 1) + this.fibonacciRecursive(n - 2);
  }

  bubbleSortMonolith(unfiltered) {
    const list = unfiltered.filter(value => ['number', 'string', 'boolean'].includes(typeof value)).slice(0);
    let swapped = true;

    while (swapped) {
      let i = list.length;
      swapped = false;

      while (i--) {
        let a = list[i];
        let b = list[i - 1];
        if (typeof b != 'undefined' && a < b) {
          list[i - 1] = a;
          list[i] = b;
          swapped = true;
        }
      }
    }

    return list;
  }
  
  bubbleSortRefactored(unfiltered) {
    var list = this.UtilitiesService.filterForAlphanumeric(unfiltered);
    var changed = false;

    while (!changed) {
      let previous = list;
      let next = this.UtilitiesService.sortListOnce(list);
      
      changed = this.UtilitiesService.areArraysIdentical(previous, next);
      list = next;
    }

    return list;
  }
}

export default AlgorithmService;
