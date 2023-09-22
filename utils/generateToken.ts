import jwt from "jsonwebtoken";


const key=process.env.JWT_SECRET || 'quiz-app'

const generateToken = (id: string) :string => {
  const token = jwt.sign({ id }, key as string, {
    expiresIn: "30d",
  });
  return token;
};

export default generateToken;