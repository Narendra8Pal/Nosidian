import toObject from "@/pages/api/mongodb/models/toObject.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { requestData, file_id } = req.body;
      const filter = { file_id };
      // const toObjectData = new toObject({ ...requestData, file_id});
      // await toObjectData.save();

      const update = { ...requestData, file_id };
      const options = { upsert: true };

      const result = await toObject.findOneAndUpdate(filter, update, options);

      if (result) {
        res.status(200).json({ message: "Node updated or created successfully" });
      }
      // else {
      //   console.error("Failed to update or create node.");
      //   res.status(500).json({ message: "Failed to update or create node." });
      // }
      // res.status(200).json({ message: "node created successfully" });
    } catch (error) {
      console.log(error, "error in post method");
    }
  } else if (req.method === "GET") {
    try {
      const file_id = req.params.id;
      const query = {file_id};
      const canvas = await toObject.findOne(query);
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
    console.log("eror in toObjectData handler");
  }
}
