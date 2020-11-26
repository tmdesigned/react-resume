import TimelineArray from "./TimelineArray";

const sample = [
  {
    myTitle: "some title",
    myType: "some category",
    mySubtitle: "some subtitle",
    myStart: "2020-04-15T04:00:00.000Z",
    myEnd: "2019-05-28T04:00:00.000Z"
  },
  {
    myTitle: "some other title",
    mySubtitle: "some other subtitle",
    myStart: "2016-04-14T20:59:59.999Z",
    myEnd: "2017-11-07T04:00:00.000Z"
  },
  {
    myTitle: "some third title",
    mySubtitle: "some third subtitle",
    myStart: "2019-04-14T20:59:59.999Z",
    myEnd: "2020-11-07T04:00:00.000Z"
  }
];

const sortByEndDate = (a, b) => {
  return new Date(a.myEnd) - new Date(b.myEnd);
};

const sampleFunctions = {
  title: (item) => item.myTitle,
  type: (item) => item.myType,
  subtitle: (item) => item.mySubitle,
  from: (item) => new Date(item.myStart),
  to: (item) => new Date(item.myEnd)
};

describe("it should store items", () => {
  test("initializes without error", () => {
    new TimelineArray();
  });

  test("returns an empty array when nothing has been added", () => {
    const tA = new TimelineArray();
    expect(tA.items.length).toEqual(0);
  });

  test("has undefined first and last dates when none have been added", () => {
    const tA = new TimelineArray();
    expect(tA.earliestDate).toBeUndefined();
    expect(tA.latestDate).toBeUndefined();
  });

  test("accepts an array of new items", () => {
    const tA = new TimelineArray();
    tA.addStandardizedItems(sample, sampleFunctions);
    const sortedSample = sample.sort(sortByEndDate);
    expect(tA.items.length).toEqual(sample.length);
    expect(tA.items[0].timelineTitle).toEqual(sortedSample[0].myTitle);
  });

  test("accepts multiple arrays of new items", () => {
    const tA = new TimelineArray();
    tA.addStandardizedItems(sample, sampleFunctions).addStandardizedItems(
      sample,
      sampleFunctions
    );
    expect(tA.items.length).toEqual(2 * sample.length);
  });

  test("sorts by end date, ascending", () => {
    const tA = new TimelineArray();
    tA.addStandardizedItems(sample, sampleFunctions);

    const sortedSample = sample.sort(sortByEndDate);

    sortedSample.forEach((item, idx) => {
      expect(tA.items[idx].timelineTitle).toEqual(item.myTitle);
    });
  });

  test("throws an error if invalid arguments added", () => {
    const tA = new TimelineArray();
    let registerException = jest.fn();
    try {
      tA.addStandardizedItems(
        {}, // must be array
        sampleFunctions
      );
    } catch (e) {
      registerException();
    }
    try {
      tA.addStandardizedItems(sample, {
        title: "", // should be func
        from: sampleFunctions.from,
        to: sampleFunctions.to
      });
    } catch (e) {
      registerException();
    }
    try {
      tA.addStandardizedItems(sample, {
        title: sampleFunctions.title,
        from: "", // should be func
        to: sampleFunctions.to
      });
    } catch (e) {
      registerException();
    }
    try {
      tA.addStandardizedItems(sample, {
        title: sampleFunctions.title,
        from: sampleFunctions.from,
        to: "" // should be func
      });
    } catch (e) {
      registerException();
    }
    expect(registerException).toBeCalledTimes(4);
  });

  test("ignore items if invalid date", () => {
    const tA = new TimelineArray();
    tA.addStandardizedItems(sample, {
      title: sampleFunctions.title,
      from: (item) => item.title, // should be date
      to: sampleFunctions.to
    });

    expect(tA.items.length).toEqual(0);
  });

  test("uses default functions for properties of same name, if not provided", () => {
    const tA = new TimelineArray();
    tA.addStandardizedItems([
      {
        title: "some title",
        subtitle: "some subtitle",
        type: "some type",
        from: new Date(),
        to: new Date()
      }
    ]);

    expect(tA.items.length).toEqual(1);
    expect(tA.items[0].title).toBe("some title");
  });

  test("calculates the earliest received date", () => {
    const tA = new TimelineArray().addStandardizedItems(
      sample,
      sampleFunctions
    );
    expect(tA.earliestDate.valueOf()).toEqual(
      new Date("2016-04-14T20:59:59.999Z").valueOf()
    );
  });

  test("calculates the latest received date", () => {
    const tA = new TimelineArray().addStandardizedItems(
      sample,
      sampleFunctions
    );
    expect(tA.latestDate.valueOf()).toEqual(
      new Date("2020-11-07T04:00:00.000Z").valueOf()
    );
  });

  test("calculates the timeline duration", () => {
    const tA = new TimelineArray().addStandardizedItems(
      sample,
      sampleFunctions
    );
    expect(tA.duration().valueOf()).toEqual(144054000001);
  });
});
