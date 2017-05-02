class UtilitiesService {
  filterForAlphanumeric(list) {
    return list.filter(item => this.isSortableValue(item)).slice(0);
  }

  isSortableValue(value) {
    return ['number', 'string', 'boolean'].includes(typeof value);
  }

  sortListOnce(list) {
    return list.reduce(
      (list, item, i) => {
        return this.reduceList(list, item, i);
      },
      list
    );
  }

  reduceList(incomingList, item, i) {
    let list = incomingList.slice(0);
    let { a, b } = this.getItemsForSort(list, i);
    if (this.shouldSwapItems(a, b)) {
      list = this.swapListItems(list, i, i - 1);
    }
    return list;
  }

  getItemsForSort(list, i) {
    return {
      a: list[i],
      b: list[i - 1]
    };
  }

  shouldSwapItems(a, b) {
    return typeof a != 'undefined' && typeof b != 'undefined' && a < b;
  }

  swapListItems(incomingList, i, j) {
    const list = incomingList.slice(0);
    const a = list[i];
    const b = list[j];
    list[i] = b;
    list[j] = a;
    return list;
  }

  areArraysIdentical(a, b) {
    let equal = false;
    if (a.length == b.length) {
      equal = !a.find((item, i) => item != b[i]);
    }
    return equal;
  }

}

export default UtilitiesService;
