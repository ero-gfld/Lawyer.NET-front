import UserRoles from "@/constants/UserRoles";

export type RegistrationUserModel = {
  salutation: string;
  countryCode: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role: UserRoles.USER;
};

export default RegistrationUserModel;
