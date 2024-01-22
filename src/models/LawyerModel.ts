import DayScheduleModel from "@/models/DayScheduleModel";

export type LawyerModel = {
  id: string;
  firstName: string;
  lastName: string;
  specialization: string;
  hourlyRate: number;
  address: string;
  postalCode: string;
  city: string;
  availabilities: DayScheduleModel[];
  photoBucket: string;
  photoName: string;
};

export default LawyerModel;
