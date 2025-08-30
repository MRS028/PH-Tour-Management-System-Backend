import jwt, { SignOptions } from "jsonwebtoken";

export const generateToken = (payload: object, secret: string, expiresIn: string) => {
  const token = jwt.sign(payload, secret, { expiresIn } as SignOptions);
  return token;
};

export const verifyToken = (token: string, secret: string) => {
 const verifiedToken = jwt.verify(token, secret);
    return verifiedToken;
};
