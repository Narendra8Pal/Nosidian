import jwt from "jsonwebtoken";
import User from "@/pages/api/mongodb/models/User.js";

const secretKey = process.env.JWT_SECRET;

const fetchData = async (req, res) => {
  if (req.method == "GET") {
    const { cookies } = req;
    const jwtToken = cookies.token;
    if (!jwtToken) {
      return res.json({ message: "Invalid token!" });
    }
 try{
  const decodedToken = jwt.verify(jwtToken, secretKey);
  const userId = decodedToken.userId;
  return res.json({ data: "Top secret data!", userId});
 }
 catch(error){
  console.error("Error decoding token:", error);
  return res.json({ message: "err in try catch of server bro" });
 }

  } else {
    return res.status(405).end();
  }
};

export default fetchData;


