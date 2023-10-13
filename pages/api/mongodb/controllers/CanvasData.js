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
    // const { requestData } = req.body;
    // const nodesArray = requestData.nodes;
    // const edgesArray = requestData.edges;
    // const viewportObj = requestData.viewport;
    // // for (const node of nodesArray) {
    //   try {
    //     const file_id = requestData.nodes[0].file_id;
    //     const updatedCanvas = await Canvas.findOneAndUpdate(
    //       { file_id: file_id },
    //       {
    //         $push: { nodes: { $each: nodesArray } },
    //         // $push: { edges: { $each: edgesArray} },
    //         // $set: { viewport: { viewportObj }},
    //       },
    //       { new: true }
    //     );

    try {
      const { data } = req.body;
      const value = data ? data.value : undefined;

      const { id } = req.query;
      const CanvasData = await Canvas.findOne({ file_id: id });

      if (!CanvasData) {
        console.log(`No document found for file_id: ${id}`);
        return res.status(400).json({ message: "file not found" });
      } else {
        // const textContext = await Canvas.findOne({value: value});
        // console.log(textContext, "updatedCanvas in server");

        CanvasData.data.value = value; 
        const updatedCanvas = await CanvasData.save(); 
        res.json(updatedCanvas);
      }
    } catch (error) {
      console.error("Error inserting node:", error);
    }
    // }
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
