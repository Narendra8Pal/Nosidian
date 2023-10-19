import mongoose from "mongoose";

const { Schema } = mongoose;

const CanvasSchema = new Schema({
  file_id: String,
  random_node_id: String,
  textarea_id: String,
  id: String,
  position: {
    x: Number,
    y: Number,
  },
  data: {
    value: String,
    toolbarPosition: String,
  },
  type: String,
  zIndex: Number,
  isConnectable: Boolean,
  content: String,
},
);

const Canvas = mongoose.models.Canvas || mongoose.model("Canvas", CanvasSchema);

export default Canvas;
