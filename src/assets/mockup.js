import LawyerResult from "../models/lawyer-result.js";
import DaySchedule from "../models/day-schedule.js";

export const mockData = {
  lawyerResults: [
    new LawyerResult(
      1,
      "John",
      "Doe",
      "Tax lawyer",
      200,
      "Kaisermulenstrasse 14",
      "1220",
      "Wien",
      [
        new DaySchedule(1, "2021-05-01", ["10:00", "11:00", "12:00"]),
        new DaySchedule(1, "2021-05-02", ["10:00", "11:00", "12:00"]),
        new DaySchedule(1, "2021-05-03", ["10:00", "11:00", "12:00"]),
        new DaySchedule(1, "2021-05-04", ["10:00", "11:00", "12:00"]),
        new DaySchedule(1, "2021-05-05", ["10:00", "11:00", "12:00"]),
      ]
    ),
  ],
};
