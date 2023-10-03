import mongoose from "mongoose";

const { Schema } = mongoose;

const CanvasSchema = new Schema({
  id: String,
  postition:String,
//   data:
  type: String,
  isConnectable:bool
});


const Canvas  = mongoose.models.Canvas || mongoose.model('Canvas', CanvasSchema);

export default Canvas;