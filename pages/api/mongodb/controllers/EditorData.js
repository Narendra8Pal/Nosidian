import Editor from '@/pages/api/mongodb/models/Editor'

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const jsonData = req.body; // JSON data from frontend
  
     // Create a new document using your Mongoose model and save it
     const newDocument = new Editor({
        // Populate the fields of your Document model here based on jsonData
        time: Date.now(), // Example: Set the time to the current timestamp
        blocks: jsonData.blocks // Example: Save blocks from jsonData
      });

      await newDocument.save(); 
        res.status(200).json({ message: 'Document saved successfully' });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while saving the document' });
      }
    } else if(req.method === 'GET') {
      if (req.method === "GET") {
        try {
          const documents = await Editor.find().exec();
          res.status(200).json(documents);
        } catch (error) {
          res.status(500).json({ error: "An error occurred while fetching the data" });
        }
      } else {
        res.status(405).json({ error: "Method not allowed" });
      }
    }
  }
  