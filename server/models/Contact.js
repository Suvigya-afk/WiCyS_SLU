import mongoose from "mongoose";

// Define the contact schema
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Ensure the model is created only once
const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
