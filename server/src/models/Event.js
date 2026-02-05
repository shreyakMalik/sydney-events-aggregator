import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    dateTime: { type: Date, required: true },

    venue: String,
    address: String,

    city: {
      type: String,
      default: "Sydney",
      index: true,
    },

    description: String,
    category: [String],

    imageUrl: String,

    sourceName: String,
    sourceUrl: { type: String, unique: true },

    status: {
      type: String,
      enum: ["new", "updated", "inactive", "imported"],
      default: "new",
    },

    lastScrapedAt: Date,

    importedAt: Date,
    importedBy: String,
    importNotes: String,
  },
  { timestamps: true }
);

export default mongoose.model("Event", EventSchema);
