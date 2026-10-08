export type User = {
  _id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  profilePic: string;
  skills: string[];
  age: number;
  gender: string;
  bio: string;
};

export type ConnectionsResponse = {
  connectionData: User[];
};
