import mongoose from "mongoose";

const AddedSchema = new mongoose.Schema({
  words: {
    type: String,
    required: "Word is required"
  }
});

const model = mongoose.model("Added", AddedSchema);
export default model;
