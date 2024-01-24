import { LawyerAvailability } from "./LawyerAvailability";

export type LawyerSearchModel = {
  id: string;
  firstName: string;
  lastName: string;
  specialization: string;
  hourlyRate: number;
  address: string;
  postalCode: string;
  city: string;
  photoBucket: string;
  photoName: string;
  availableSlots: LawyerAvailability;
};

export default LawyerSearchModel;
