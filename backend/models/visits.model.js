import mongoose from "mongoose";

const visitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      index: true,
    },
    name: {
      type: String,
      required: false,
      trim: true,
    },
    session: [String],
    views: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Visit = mongoose.model("Visit", visitSchema);

export default Visit;
