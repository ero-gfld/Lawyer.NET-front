export type UserModel = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export type ModifiedUserModel = {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
};
