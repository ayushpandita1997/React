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
  connectionRequestId: string;
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

export type ChatApiMessage = {
  _id: string;
  message: string;
  senderUserId: string;
  receiverUserId: string;
  createdAt: string;
  updatedAt: string;
};

export type ChatResponse = {
  _id: string;
  participants: string[];
  messages: ChatApiMessage[];
};

export type RazorpayOptions = {
  key: string;
  amount: number | string;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  handler?: () => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

export type ChatLocationState = {
  user?: User;
};

export type ChatMessage = {
  senderId: string;
  text: string;
  createdAt: string;
};
