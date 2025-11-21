export interface tokenPayload {
  _id: string;
  email: string;
  roles: string[];
}

export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  roles: string[];
}
