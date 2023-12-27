import UserRoles from "@/constants/UserRoles";

export type RegistrationUserModel = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRoles.USER;
};

export default RegistrationUserModel;
