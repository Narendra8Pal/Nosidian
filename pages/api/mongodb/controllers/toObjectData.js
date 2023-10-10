import toObject from "@/pages/api/mongodb/models/toObject.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { requestData } = req.body;
      const canvasData = new toObject(requestData);
      await canvasData.save();
      res.status(200).json({ message: "node created successfully" });
    } catch (error) {
      console.log(error, "error in post method");
    }
  }else if (req.method === "GET") {
    try {
      const file_id = req.params.id;
      const canvas = await toObject.findById(file_id);
      if (!canvas) {
        res.status(404).json({ error: "Canvas not found" });
        return;
      }
      res.status(200).json(canvasState);
    } catch (error) {
      console.error(error);
      req.status(500).json({ error: "Internal server error" });
    }
  } else {
    console.log("eror in canvasData handler");
  }
}
