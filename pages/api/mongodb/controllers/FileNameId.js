import FileList from "../models/FileList";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query; 
      const fileData = await FileList.findOne({ _id: id }, 'userId fileName');

      if (!fileData) {
        return res.status(404).json({ message: 'File not found' });
      }

      return res.status(200).json({ userId: fileData.userId, fileName: fileData.fileName });
    } catch (err) {
      console.error('Error retrieving user data:', err);
      return res.status(500).json({ message: 'Error in retrieving user data' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
