import mongoose from "mongoose";

const { Schema } = mongoose;

const NodeSchema = new Schema({
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
  random_node_id: String,
  type: String,
  width: Number,
  zIndex: Number,
});

const ObjectSchema = new Schema({
  edges: [String],
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
