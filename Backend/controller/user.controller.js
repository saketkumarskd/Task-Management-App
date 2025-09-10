import User from "../model/user.model.js";
import { z } from "zod";
import bcrypt from "bcryptjs";

const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  username: z.string().min(3, { message: "username atleast be 3 characters long" }).max(20),
  password: z.string().min(6, { message: "username atleast be 3 characters long" }),
});

export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    //const email=req.body.email;
    //const password=req.body.password;
    //const username=req.body.username;
    //console.log(email, username, password);

    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const validation = userSchema.safeParse({ email, username, password });
    if (!validation.success) {
      // return res.status(400).json({errors:validation.error.errors});
      const errorMessage = validation.error.errors.map((err) => err.message);
      return res.status(400).json({ message: "user already registered" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User aready registered" });
    }

    const hasPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, username, password: hasPassword });
    await newUser.save();
    if (newUser) {
    const token=await generateTokenAndSaveInCookies(newUser._id,res);
      res.status(201).json({ message: "user registered successfully", newUser,token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registring user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(500).json({ message: "All field are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });

    }
    const token=await generateTokenAndSaveInCookies(user._id,res);


    res.status(200).json({ message: "User logged in successfully", user,token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error loggin user" });
  }
};

export const logout = (req, res) => {
try {
      res.clearCookies("jwt",{
        path:"/"
      })
      res.status(200).json({ message: "User logged out successfully"});

} catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error loggin out user" });
}};
