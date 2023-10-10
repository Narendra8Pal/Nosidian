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
    }
  } else if (req.method === "PUT") {
    const { requestData } = req.body;
    const nodesArray = requestData.nodes;
    // for (const node of nodesArray) {
      try {
        const file_id = requestData.nodes[0].file_id;
        const updatedCanvas = await Canvas.findOneAndUpdate(
          { file_id: file_id },
          {
            $push: { nodes: { $each: nodesArray } }, 
          },
          { new: true }
        );
        if (!updatedCanvas) {
          console.log(`No document found for file_id: ${file_id}`);
        } else {
          console.log(updatedCanvas, "updatedCanvas in server");
        }
      } catch (error) {
        console.error("Error inserting node:", error);
      }
    // }
  } else if (req.method === "GET") {
    try {
      // const canvasId = req.params.id;
      // const canvas = await Canvas.findById(canvasId);
      // const canvasState = Canvas.schema;
      const canvasId = req.params.id;
      const canvas = await Canvas.findById(canvasId);
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
