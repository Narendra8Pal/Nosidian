import mongoose from "mongoose";

const {Schema} = mongoose;

const unsplashSchema = new Schema({

})

const unsplash = mongoose.model.unsplashSchema || mongoose.model("unsplash", unsplashSchema)

export default unsplash
