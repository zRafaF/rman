export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
}

interface UsersCollection {
  uid: string;
  role: UserRoles;
}

export default UsersCollection;
