import jwt from "jsonwebtoken";

export const generateAuth = (email: string) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
  return token;
};
