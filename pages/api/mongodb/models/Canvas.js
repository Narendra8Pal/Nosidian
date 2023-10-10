import mongoose from "mongoose";

const { Schema } = mongoose;

const EdgesSchema = new Schema({
  id: String,
  source: String,
  sourceHandle: String,
  target: String,
  targetHandle: String,
});

const NodesSchema = new Schema({
  data: {
    toolbarPosition: String,
    value: String,
  },
  file_id: String,
  height: Number,
  id: String,
  isConnectable: Boolean,
  position: {
    x: Number,
    y: Number,
  },
  positionAbsolute: {
    x: Number,
    y: Number,
  },
  type: String,
  width: Number,
  zIndex: Number,
});

const CanvasSchema = new Schema({
  file_id: String,
  random_node_id: String,
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
  viewport: {
    x: Number,
    y: Number,
    zoom: Number,
  },
  nodes: [NodesSchema],
  edges: [EdgesSchema],
},
);

const Canvas = mongoose.models.Canvas || mongoose.model("Canvas", CanvasSchema);

export default Canvas;
