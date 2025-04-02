import { describe, it, expect } from "vitest";
import {
  transformData,
  filterWeekdays,
  type TransformedData,
  getDaysInMonth,
} from "./date";

const generateMockData = (days: number): TransformedData => {
  const startDate = new Date("2024-01-01");
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(startDate.getTime() + i * 86400000), // Increment days
    userId: 1,
    subjectId: 2,
    status: "absent",
  }));
};

describe("transformData", () => {
  it("should return an empty array when input data is empty", () => {
    expect(transformData([])).toEqual([]);
  });

  it("should fill missing dates with absent status", () => {
    const input = [
      { date: new Date("2024-03-04"), userId: 1, subjectId: 2 }, // Monday
      { date: new Date("2024-03-06"), userId: 1, subjectId: 2 }, // Wednesday
    ];

    const result = transformData(input);
    expect(result).toHaveLength(3); // Should include March 5 (Tuesday)
    expect(result[1]?.status).toBe("absent"); // Missing day (Tuesday)
  });

  it("should mark existing entries as present", () => {
    const input = [
      { date: new Date("2024-03-04"), userId: 1, subjectId: 2 }, // Monday
      { date: new Date("2024-03-05"), userId: 1, subjectId: 2 }, // Tuesday
    ];

    const result = transformData(input);
    expect(result[0]?.status).toBe("present");
    expect(result[1]?.status).toBe("present");
  });

  it("should process 1000+ records efficiently", () => {
    const input = generateMockData(1000);
    const start = performance.now();
    const result = transformData(input);
    const end = performance.now();

    expect(result).toHaveLength(1000);
    console.log(`transformData executed in ${(end - start).toFixed(2)} ms`);
  });
});

describe("filterWeekdays", () => {
  it("should keep only specified weekdays and mark others as 'off' (except present entries)", () => {
    const input: TransformedData = [
      { date: new Date("2024-03-04"), status: "present" }, // Monday
      { date: new Date("2024-03-05"), status: "absent" }, // Tuesday
      { date: new Date("2024-03-06"), status: "present" }, // Wednesday
      { date: new Date("2024-03-07"), status: "absent" }, // Thursday
    ];
    const result = filterWeekdays(input, ["mon", "tue", "wed"]);

    expect(result[0]?.status).toBe("present"); // Monday is included
    expect(result[1]?.status).toBe("absent"); // Tuesday is included
    expect(result[2]?.status).toBe("present"); // Wednesday is included
    expect(result[3]?.status).toBe("off"); // Thursday is not in the list, marked "off"
  });

  it("should not modify 'present' statuses even if the day is missing from weekdays", () => {
    const input: TransformedData = [
      { date: new Date("2024-03-08"), status: "present" }, // Friday
    ];
    const result = filterWeekdays(input, ["mon", "tue", "wed"]);

    expect(result[0]?.status).toBe("present"); // Even though Friday is missing, "present" is unchanged
  });

  it("should process 1000+ records efficiently", () => {
    const input = generateMockData(1000).map(
      (entry, index) =>
        ({
          ...entry,
          status: index % 5 === 0 ? "present" : "absent", // Some entries are "present"
        }) as TransformedData[0],
    );

    const start = performance.now();
    const result = filterWeekdays(input, ["mon", "tue", "wed", "thu", "fri"]);
    const end = performance.now();

    expect(result).toHaveLength(1000);
    console.log(`filterWeekdays executed in ${(end - start).toFixed(2)} ms`);
  });
});

describe("getDaysInMonthExcluding", () => {
  it("should return the correct number of days in April 2025 including every week day", () => {
    expect(
      getDaysInMonth(2025, 2, [
        "sun",
        "mon",
        "tue",
        "wed",
        "thu",
        "fri",
        "sat",
      ]),
    ).toBe(31);
  });

  it("should return the total days in a month excluding every day", () => {
    expect(getDaysInMonth(2025, 2, [])).toBe(0);
  });

  it("should return correct days when including  only weekdays", () => {
    expect(
      getDaysInMonth(2025, 2, ["mon", "tue", "wed", "thu", "fri", "sat"]),
    ).toBe(26);
  });
});
