import mongoose from "mongoose";

const { Schema } = mongoose;

const CanvasSchema = new Schema({
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
});


const Canvas  = mongoose.models.Canvas || mongoose.model('Canvas', CanvasSchema);

export default Canvas;