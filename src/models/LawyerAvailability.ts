import { AvailabilityTimetable } from "./AvailabilityTimetable";

export type LawyerAvailability = {
    from: string;
    to: string;
    timeslotsByDate: AvailabilityTimetable;
};