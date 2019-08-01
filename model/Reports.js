import mongoose from "mongoose";

const ReportsSchema = new mongoose.Schema({
  words: {
    type: String,
    required: "Word is required"
  }
});

const model = mongoose.model("Report", ReportsSchema);
export default model;
