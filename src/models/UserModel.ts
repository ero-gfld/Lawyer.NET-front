export type UserModel = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  appointments: string[];
};

export default UserModel;