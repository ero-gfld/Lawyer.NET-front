export type UserModel = {
  id: string;
  salutation: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  role: string;
  appointments: string[];
  photoBucket: string;
  photoName: string;
  password: string;
  passwordConfirmation: string;
  isLocked: boolean;
};

export default UserModel;
