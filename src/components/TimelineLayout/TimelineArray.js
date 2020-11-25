import { isValidDate } from "../../util/helpers";

class TimelineArray extends Array {
  constructor() {
    super();
    this._items = [];
    // this.earliestDate
    // this.latestDate
  }

  get items() {
    return this._items;
  }

  set items(val) {
    this._items = val;
  }

  duration() {
    if (!this.earliestDate || !this.latestDate) {
      return undefined;
    }
    return this.latestDate - this.earliestDate;
  }

  _checkDateForNewTimelineEdge(date) {
    this._checkEarliestDate(date);
    this._checkLatestDate(date);
  }

  _checkEarliestDate(date) {
    if (!this.earliestDate || date < this.earliestDate) {
      this.earliestDate = date;
    }
  }

  _checkLatestDate(date) {
    if (!this.latestDate || date > this.latestDate) {
      this.latestDate = date;
    }
  }

  _dateRangeOverlaps(a_start, a_end, b_start, b_end) {
    if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
    if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
    if (b_start < a_start && a_end < b_end) return true; // a in b
    return false;
  }

  _numberOverlappingPrevious(newProcessedItems, from, to) {
    let overlap = 0;
    [...this.items, ...newProcessedItems].forEach((existingItem) => {
      if (
        this._dateRangeOverlaps(
          from,
          to,
          existingItem.timelineStart,
          existingItem.timelineEnd
        )
      ) {
        overlap++;
      }
    });
    return overlap;
  }

  _sortedAdd = (item) => {
    console.log("adding item", item, "to", this._items);
    this._items.splice(this._findLoc(item, this._items), 0, item);
  };

  _findLoc(el, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].timelineEnd > el.timelineEnd) {
        return i - 1;
      }
    }
    return arr.length;
  }

  addStandardizedItems = (
    incomingItems,
    { title: titleFunc, subtitle: subtitleFunc, from: fromFunc, to: toFunc }
  ) => {
    if (!incomingItems) {
      return this;
    }
    let previousLength = this.items.length;
    let newItems = incomingItems.reduce((acc, item, idx) => {
      const timelineStart = fromFunc(item);
      const timelineEnd = toFunc(item);
      if (!isValidDate(timelineStart) || !isValidDate(timelineEnd)) {
        return acc;
      }
      this._checkDateForNewTimelineEdge(timelineStart);
      this._checkDateForNewTimelineEdge(timelineEnd);
      return [
        ...acc,
        {
          ...item,
          timelineTitle: titleFunc(item),
          timelineSubtitle: subtitleFunc(item),
          timelineStart,
          timelineEnd,
          timelineOverlap: this._numberOverlappingPrevious(
            acc,
            timelineStart,
            timelineEnd
          ),
          key: `timelineKey-${previousLength + idx - 1}`
        }
      ];
    }, []);
    newItems.forEach((newItem) => this._sortedAdd(newItem));
    return this;
  };
}

export default TimelineArray;
