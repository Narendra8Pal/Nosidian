import FileList from "../models/FileList";
import Editor from "@/pages/api/mongodb/models/Editor";


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
  }
  else if(req.method === "PUT"){
    try {
      const { filename, updatedFileName } = req.body;
      const fileToUpdate = await Editor.findOne({ filename });

      if (!fileToUpdate) {
        return res.status(404).json({ message: "File not found" });
      }

      fileToUpdate.filename = updatedFileName;
      await fileToUpdate.save();

      return res.status(200).json(fileToUpdate);
    } catch (error) {
      console.log("Error in updating file name:", error);
      return res
        .status(500)
        .json({ message: "Error in updating the file name" });
    }
  }
  else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}