import User from '../mongodb/models/User.js'

export default async function handler(req, res) {
  const { token } = req.query;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (user) {
      user.isVerified = true;
      await user.save();

      return res.status(200).json({ message: 'Account verified successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid verification token' });
    }
  } catch (error) {
    console.error('Error verifying account:', error);
    return res.status(500).json({ message: 'Error verifying account' });
  }
}
