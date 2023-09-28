import bcryptjs from 'bcryptjs';
import User from '../mongodb/models/User';
import nodemailer from 'nodemailer'; 
import {v4 as uuidv4} from "uuid";

const handleSignup = async (req, res) => {
  try {
    const { name, email, password, verificationToken} = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    // const verificationTokenGen = uuidv4();


    const newUser = new User({ name, email, password: hashedPassword, verificationToken });
    await newUser.save();

    sendVerificationEmail(email, verificationToken);
    
    return res.status(201).json({ message: 'User registered successfully', userId: newUser._id});
    
  } catch (err) {
    console.error('Error during signup:', err);
    return res.status(500).json({ message: 'here is the error shiva' });
  }
};

const sendVerificationEmail = (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });
    
  const generateVerificationLink = () => {
    const verificationLink = `${process.env.BASE_URL}?token=${verificationToken}`;
    return verificationLink;
  }

  const mailOptions = {
    from: process.env.email,
    to: email,
    subject: 'Account Verification',
    text: `Please click on the following link to verify your account: ${generateVerificationLink(verificationToken)}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending verification email:', error);
    } else {
      console.log('Verification email sent:', info.response);
    }
  });
};


export default handleSignup;



