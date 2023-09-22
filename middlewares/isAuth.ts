import { Request, Response, NextFunction } from "express";
import { UserRequest } from "../types/user";
// authMiddleware.js
const jwt = require("jsonwebtoken");

// Secret key used for JWT signing and verification
const secretKey = 'quiz-app'; // Replace with your actual secret key

export const isAuth = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  let token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  token = token.split(' ')[1]
console.log(token)


  jwt.verify(token, secretKey, (err: Error, user: any) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden"+err });
    }
    console.log(user)
    req.user = user; // Attach the authenticated user's information to the request object
    next();
  });
};
