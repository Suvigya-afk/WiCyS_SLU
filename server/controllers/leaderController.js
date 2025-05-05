import Leader from "../models/Leader.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Set up storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the destination folder for images
    const uploadPath = "./uploads/";
    // Ensure the directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath); // Save to 'uploads' folder
  },
  filename: (req, file, cb) => {
    // Save with a timestamp and the original file extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    // Only accept image files
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("File type not supported"), false);
  },
});

// Get all leaders
export const getAllLeaders = async (req, res) => {
  try {
    const leaders = await Leader.find();
    res.json(leaders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch leaders", error });
  }
};

// Add a new leader
export const addLeader = async (req, res) => {
  upload.single("picture")(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Failed to upload image", error: err.message });
    }

    try {
      const pictureUrl = req.file ? `/uploads/${req.file.filename}` : null;

      // Create a new leader with form data
      const newLeader = new Leader({
        name: req.body.name,
        bio: req.body.bio,
        role: req.body.role,
        year: req.body.year,
        isCurrent: req.body.isCurrent,
        picture: pictureUrl, // Save the image URL in the database
      });

      await newLeader.save();
      res
        .status(201)
        .json({ message: "Leader added successfully", leader: newLeader });
    } catch (error) {
      res.status(400).json({ message: "Failed to add leader", error });
    }
  });
};

// Delete a leader
export const deleteLeader = async (req, res) => {
  try {
    const leaderId = req.params.id;
    const leader = await Leader.findByIdAndDelete(leaderId);

    if (!leader) {
      return res.status(404).json({ message: "Leader not found" });
    }

    // Delete the image file from the server
    if (leader.picture) {
      const filePath = path.join(__dirname, "..", leader.picture);
      fs.unlinkSync(filePath); // Delete the file from the uploads directory
    }

    return res.status(200).json({ message: "Leader deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while deleting leader" });
  }
};
