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

  addStandardizedItems = (incomingItems, titleFunc, fromFunc, toFunc) => {
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
          timelineStart,
          timelineEnd,
          key: previousLength + idx - 1
        }
      ];
    }, []);
    this.items = this._items.concat(newItems);
    return this;
  };
}

export default TimelineArray;
