import DaySchedule from "@/models/DaySchedule";

export type LawyerResult = {
  id: number;
  firstName: string;
  lastName: string;
  specialization: string;
  hourlyRate: number;
  address: string;
  postalCode: string;
  city: string;
  availabilities: DaySchedule[];
};

export default LawyerResult;
