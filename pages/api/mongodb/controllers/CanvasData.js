import Canvas from "@/pages/api/mongodb/models/Canvas.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { newNode } = req.body;
      const canvasNode = new Canvas(newNode);
      await canvasNode.save();
      res.status(200).json({ message: "node created successfully" });
    } catch (error) {
      console.log(error, "error in post method");
      res.status(500).json({ message: "Failed to update or create node." });
    }
  } else if (req.method === "PUT") {
    try {
      const updatedData  = req.body;
      console.log(updatedData, ": updatedData here");
      const { id } = req.query;
      const CanvasData = await Canvas.findOne({ file_id: id });
      const existingData = CanvasData.data.toolbarPosition;

      if (!CanvasData) {
        console.log(`No document found for file_id: ${id}`);
        return res.status(400).json({ message: "file not found" });
      }

      const updatedDataServer = {
        data: {
          value: updatedData.data.value,
          toolbarPosition: existingData,
        },
        content: updatedData.content,
      };

      const textContext = await Canvas.findOneAndUpdate(
        { file_id: id },
        { $set: updatedDataServer },
        { new: true }
      );

      res.status(200).json(textContext);
    } catch (error) {
      console.error("Error inserting node:", error);
    }
  } else if (req.method === "GET") {
    try {
      const { id } = req.query;
      const canvas = await Canvas.findOne({ file_id: id });
      if (!canvas) {
        res.status(404).json({ error: "Canvas not found" });
        return;
      }
      res.status(200).json(canvas);
    } catch (error) {
      console.error(error);
      req.status(500).json({ error: "Internal server error" });
    }
  } else {
    console.log("error in canvasData handler");
  }
}
