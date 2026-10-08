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

export type ReceivedRequest = {
  _id: string;
  fromUserId: User;
  toUserId: string;
  status: string;
};

export type ReceivedRequestsResponse = {
  data: ReceivedRequest[];
};

export type SentRequest = {
  _id: string;
  fromUserId: User;
  toUserId: User;
  status: string;
};

export type sentRequestsResponse = {
  data: SentRequest[];
};
