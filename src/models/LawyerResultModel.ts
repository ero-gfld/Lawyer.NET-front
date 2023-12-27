import DayScheduleModel from "@/models/DayScheduleModel";

export type LawyerResultModel = {
  id: number;
  firstName: string;
  lastName: string;
  specialization: string;
  hourlyRate: number;
  address: string;
  postalCode: string;
  city: string;
  availabilities: DayScheduleModel[];
};

export default LawyerResultModel;
