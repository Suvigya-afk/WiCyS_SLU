import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    flyers: {
      type: [String], // Store file path for flyer image
    },
    location: {
      type: String,
    },
    type: {
      type: String, // Event type like "Workshop", "Seminar"
    },
    registrationLink: {
      type: String,
    },
    photos: [String], // For storing uploaded event photos
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
