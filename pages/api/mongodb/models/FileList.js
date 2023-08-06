import mongoose from "mongoose"

const { Schema } = mongoose;

const fileListSchema = new Schema({
    fileName: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User", 
        required: true,
      },
    layout:{
        type: String,
        required: true,
    }
})

const FileList = mongoose.models.FileList || mongoose.model("FileList", fileListSchema);

export default FileList;