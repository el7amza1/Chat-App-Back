import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { RequestAuth } from "../typies";


export const auth = async (req: RequestAuth, res: Response, next: NextFunction) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).send({ message: "please add authentication" });
  }
  const { email } = jwt.verify(token as string, process.env.JWT_SECRET!) as {
    email: string;
  };
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).send({ message: "User Not Found" });
  }
  req.user = user;
  next();
};
