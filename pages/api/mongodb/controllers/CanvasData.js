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
  } 
  else if (req.method === 'PUT'){
    try {
      // const canvasId = requestData.nodes.file_id;
      // const canvasNode = new Canvas(requestData);
      // await canvasNode.save();
      const { requestData } = req.body;
      const file_id = req.params.id;

      const updatedCanvas = await Canvas.findByIdAndUpdate(
        file_id,
        requestData,
        { new: true }
      );
      if (!updatedCanvas) {
        res.status(404).json({ error: 'Canvas not found' });
        return;
      }
      res.status(200).json({ message: 'Canvas state updatedd successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  else if (req.method === "GET"){
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
      req.status(500).json({error: 'Internal server error'});
    }
  }
  else {
    console.log("eror in canvasData handler");
  }
}
