import mongoose from "mongoose";

const { Schema } = mongoose;

const EditorSchema = new Schema({
  id: String,
  type: String,
  data: mongoose.Schema.Types.Mixed,
});

const documentSchema = new Schema({
  id: String,
  filename: String,
  time: Number,
  blocks: [EditorSchema],
});

const Editor  = mongoose.models.Document || mongoose.model('Document', documentSchema);

export default Editor;
