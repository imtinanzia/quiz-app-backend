import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/User";
import generateToken from "../utils/generateToken";
import axios from "axios";

const countryListApi=process.env.listCountriesApi || "https://countriesnow.space/api/v0.1/countries/capital"
// @Desc Get all users
// @Route /api/auth
// @Method GET
export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({}).select("-password");
  res.status(201).json({ success: true, count: users.length, users });
});

// @Desc Get all countries
// @Route /api/auth
// @Method GET
export const getAllCountries = asyncHandler(
  async (req: Request, res: Response) => {
    try {
    //   const token = req.header("Authorization");

    //   if (!token) {
    //     // return res.status(401).json({ message: "Unauthorized" });
    //     res.status(401).json({ success: false, message: "Unauthorized" });
    //   }

      // Fetch data from the API
      const response = await axios.get(
        countryListApi
      );
      const countries = response.data.data;

      // Respond with the fetched data
      res
        .status(200)
        .json({ success: true, count: countries.length, countries });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

// @Desc Login
// @Route /api/auth/
// @Method POST
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (await user.comparePassword(password)) {
    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(401);
    throw new Error("Email or password incorrect");
  }
});

// @Desc Register
// @Route /api/auth/register
// @Method POST
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, fullName, password } = req.body;

  const user = new User({
    email,
    fullName,
    password,
  });

  await user.save();

  res.status(201).json({
    success: true,
    user: {
      email: user.email,
      fullName: user.fullName,
      token: generateToken(user._id),
    },
  });
});
