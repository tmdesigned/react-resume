import TimelineArray from "./TimelineArray";

const sample = [
  {
    myTitle: "some title",
    mySubtitle: "some subtitle",
    myStart: "2020-04-15T04:00:00.000Z",
    myEnd: "2019-05-28T04:00:00.000Z"
  },
  {
    myTitle: "some other title",
    mySubtitle: "some other subtitle",
    myStart: "2016-04-14T20:59:59.999Z",
    myEnd: "2017-11-07T04:00:00.000Z"
  }
];

const sampleFunctions = {
  title: (item) => item.myTitle,
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
    expect(tA.items.length).toEqual(sample.length);
    expect(tA.items[0].timelineTitle).toEqual(sample[0].myTitle);
  });

  test("accepts multiple arrays of new items", () => {
    const tA = new TimelineArray();
    tA.addStandardizedItems(sample, sampleFunctions).addStandardizedItems(
      sample,
      sampleFunctions
    );
    expect(tA.items.length).toEqual(2 * sample.length);
  });

  test("throws an error if insufficent arguments added", () => {
    const tA = new TimelineArray();
    let exception;
    try {
      tA.addStandardizedItems(sample);
    } catch (e) {
      exception = e;
    }
    expect(exception).not.toBeUndefined();
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
      new Date("2020-04-15T04:00:00.000Z").valueOf()
    );
  });

  test("calculates the timeline duration", () => {
    const tA = new TimelineArray().addStandardizedItems(
      sample,
      sampleFunctions
    );
    expect(tA.duration().valueOf()).toEqual(126255600001);
  });
});
