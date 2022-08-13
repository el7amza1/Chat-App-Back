import { Request } from "express";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image?: string;
  token?: string;
}

export interface RequestAuth extends Request {
  user?: User;
}
