import FileList from "../models/FileList";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { fileName, userId, layout } = req.body;
      const existingFile = await FileList.findOne({ fileName });
      if (existingFile) {
        return res
          .status(400)
          .json({ message: "Ooops! provided file title already exist" });
      }

      const newFile = new FileList({ fileName, userId, layout });
      await newFile.save();
      return res.status(201).json({
        _id: newFile._id,
        fileName: newFile.fileName,
        userId: newFile.userId,
        layout: newFile.layout,
        message: "File created successfully",
      });
    } catch (err) {
      console.log("error creating file:", err);
      return res.status(500).json({ message: "err in creating files" });
    }
  } else if (req.method === "GET") {
    try {
      const fileList = await FileList.find({}, "fileName userId layout");
      return res.status(200).json(fileList);
    } catch (err) {
      console.log("Error retrieving file list:", err);
      return res.status(500).json({ message: "Error in retrieving file list" });
    }
  } else if (req.method === "PUT") {
    try {
      const { fileName, updatedFileName } = req.body;
      const fileToUpdate = await FileList.findOne({ fileName });

      if (!fileToUpdate) {
        return res.status(404).json({ message: "File not found" });
      }

      fileToUpdate.fileName = updatedFileName;
      await fileToUpdate.save();

      return res.status(200).json(fileToUpdate);
    } catch (error) {
      console.log("Error in updating file name:", error);
      return res
        .status(500)
        .json({ message: "Error in updating the file name" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { _id } = req.body;
      const removeFile = await FileList.deleteOne({ _id: _id });
      return res.status(200).json(removeFile);
    } catch (err) {
      console.log("Error deleting file:", err);
      return res
        .status(500)
        .json({ message: "Error in deleting the file on the server" });
    }
  } else {
    res.status(405).json({ message: "Dash files http error" });
  }
}
