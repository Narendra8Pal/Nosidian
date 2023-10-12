import toObject from "@/pages/api/mongodb/models/toObject.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { requestData, file_id } = req.body;
      const filter = { file_id };
      const update = { ...requestData, file_id };
      const options = { upsert: true };

      const result = await toObject.findOneAndUpdate(filter, update, options);

      if (result) {
        res
          .status(200)
          .json({ message: "Node updated or created successfully" });
      } else {
        res.status(200).json({ message: "Node created successfully" });
      }
    } catch (error) {
      console.error("Error while updating or creating node:", error);
      res.status(500).json({ message: "Failed to update or create node." });
    }
  } else if (req.method === "GET") {
    try {
      const { id } = req.query;
      const canvas = await toObject.findOne({file_id: id });
      if (!canvas) {
        res.status(404).json({ error: "Canvas not found" });
        return;
      }
      return res.status(200).json(canvas);
    } catch (error) {
      console.error(error);
      req.status(500).json({ error: "Internal server error" });
    }
  } else {
    console.log("eror in toObjectData handler");
  }
}
