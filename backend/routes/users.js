import express from "express";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// GET /api/users/profile
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json(user);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Failed to get profile." });
  }
});

// PUT /api/users/bio
router.put("/bio", auth, async (req, res) => {
  try {
    const { bio } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { bio },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error("Update bio error:", error);
    res.status(500).json({ error: "Failed to update bio." });
  }
});

// PUT /api/users/theme
router.put("/theme", auth, async (req, res) => {
  try {
    const { chatTheme } = req.body;
    if (!["light", "dark", "custom"].includes(chatTheme)) {
      return res.status(400).json({ error: "Invalid theme." });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { chatTheme },
      { new: true }
    );
    res.json({ success: true, user });
  } catch (error) {
    console.error("Update theme error:", error);
    res.status(500).json({ error: "Failed to update theme." });
  }
});

// GET /api/users/:id
router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("firstName lastName email bio");
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json(user);
  } catch (error) {
    console.error("Get user by id error:", error);
    res.status(500).json({ error: "Failed to get user." });
  }
});

export default router;
