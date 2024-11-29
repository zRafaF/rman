export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
  COMPANY = "company",
}

interface UsersCollection {
  uid: string;
  role: UserRoles;
}

export default UsersCollection;
