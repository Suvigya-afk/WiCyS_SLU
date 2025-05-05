// routes/leaderRoutes.js
import express from "express";
import {
  getAllLeaders,
  addLeader,
  deleteLeader,
} from "../controllers/leaderController.js";

const router = express.Router();

router.get("/", getAllLeaders); // GET /AboutUs
router.post("/", addLeader); // POST /AboutUs
router.delete("/:id", deleteLeader); // DELETE /AboutUs/:id

export default router;
