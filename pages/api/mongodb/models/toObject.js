import mongoose from "mongoose";

const { Schema } = mongoose;

const EdgesSchema = new Schema({
  id: String,
  source: String,
  sourceHandle: String,
  target: String,
  targetHandle: String,
});

const NodeSchema = new Schema({
  data: {
    toolbarPosition: String,
    value: String,
  },
  file_id: String,
  height: Number,
  id: String,
  isConnectable: Boolean,
  content: String,
  position: {
    x: Number,
    y: Number,
  },
  positionAbsolute: {
    x: Number,
    y: Number,
  },
  random_node_id: String,
  textarea_id: String,
  type: String,
  width: Number,
  zIndex: Number,
});

const ObjectSchema = new Schema({
  file_id: String,
  edges: [EdgesSchema],
  nodes: [NodeSchema],
  viewport: {
    x: Number,
    y: Number,
    zoom: Number,
  },
});

const toObject =
  mongoose.models.toObject || mongoose.model("toObject", ObjectSchema);

export default toObject;
