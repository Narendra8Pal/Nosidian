import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../mongodb/models/User';
import { serialize } from 'cookie';

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email not found' });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.setHeader('Set-Cookie', serialize('token', token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    }));

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const userData = await User.findById(userId);

    return res.status(200).json({ message: 'Login successful', token, userId, userData});
  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default handleLogin


