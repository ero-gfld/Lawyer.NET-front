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
      "Peintnerstrasse 64",
      "9103",
      "Diex",
      [
        new DaySchedule(1, "2021-05-01", ["10:00", "11:00", "12:00"]),
        new DaySchedule(1, "2021-05-02", ["10:00", "11:00", "12:00"]),
        new DaySchedule(1, "2021-05-03", ["10:00", "11:00", "12:00"]),
        new DaySchedule(1, "2021-05-04", ["10:00", "11:00", "12:00"]),
        new DaySchedule(1, "2021-05-05", ["10:00", "11:00", "12:00"]),
      ]
    ),
    new LawyerResult(
      2,
      "Jane",
      "Doe",
      "Social lawyer",
      300,
      "Untere Neugasse 71",
      "9872",
      "Lechnerschaft",
      [
        new DaySchedule(2, "2021-05-01", ["10:00", "11:00", "12:00"]),
        new DaySchedule(2, "2021-05-02", ["10:00", "11:00", "12:00"]),
        new DaySchedule(2, "2021-05-03", ["10:00", "11:00", "12:00"]),
        new DaySchedule(2, "2021-05-04", ["10:00", "11:00", "12:00"]),
        new DaySchedule(2, "2021-05-05", ["10:00", "11:00", "12:00"]),
      ]
    ),
    new LawyerResult(
      3,
      "John",
      "Smith",
      "Criminal lawyer",
      450,
      "Dieselstrasse 69",
      "8742",
      "Lavantegg",
      [
        new DaySchedule(3, "2021-05-01", ["10:00", "11:00", "12:00"]),
        new DaySchedule(3, "2021-05-02", ["10:00", "11:00", "12:00"]),
        new DaySchedule(3, "2021-05-03", ["10:00", "11:00", "12:00"]),
        new DaySchedule(3, "2021-05-04", ["10:00", "11:00", "12:00"]),
        new DaySchedule(3, "2021-05-05", ["10:00", "11:00", "12:00"]),
      ]
    ),
  ],
};
