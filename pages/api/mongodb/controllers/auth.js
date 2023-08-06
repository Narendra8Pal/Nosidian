import connectDB from "../connect.js";
import handleLogin from "../../components/LogIn.js";
import handleSignup from "../../components/SignUp.js";

connectDB();

export default async function handler(req, res) {
  if (req.method === "POST") {
    handleSignup(req, res);
  } else if (req.method === "PUT") {
    handleLogin(req, res);
  }
  else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

