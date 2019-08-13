import mongoose from "mongoose";

const WordsSchema = new mongoose.Schema({
  words: {
    type: String,
    required: "Word is required"
  }
});

const model = mongoose.model("Words", WordsSchema);
export default model;
