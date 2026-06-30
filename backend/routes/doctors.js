import express from "express";
import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import { generateAvatar } from "../utils/helpers.js";

const router = express.Router();

// GET /api/doctors - Get all doctors (with appointment count)
router.get("/", auth, async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });

    // Get appointment counts for each doctor
    const doctorsWithCounts = await Promise.all(
      doctors.map(async (doctor) => {
        const appointmentCount = await Appointment.countDocuments({
          doctor: doctor._id,
        });
        return {
          ...doctor.toObject(),
          appointmentCount,
        };
      })
    );

    res.json(doctorsWithCounts);
  } catch (error) {
    console.error("Get doctors error:", error);
    res.status(500).json({ error: "Failed to fetch doctors." });
  }
});

// GET /api/doctors/available - Get active doctors
router.get("/available", auth, async (req, res) => {
  try {
    const doctors = await Doctor.find({ isActive: true }).sort({ name: 1 });

    const doctorsWithCounts = await Promise.all(
      doctors.map(async (doctor) => {
        const appointmentCount = await Appointment.countDocuments({
          doctor: doctor._id,
        });
        return {
          ...doctor.toObject(),
          appointmentCount,
        };
      })
    );

    res.json(doctorsWithCounts);
  } catch (error) {
    console.error("Get available doctors error:", error);
    res.status(500).json({ error: "Failed to fetch available doctors." });
  }
});

// POST /api/doctors - Create doctor (admin only)
router.post("/", auth, admin, async (req, res) => {
  try {
    const { name, email, phone, speciality, gender, isActive } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required." });
    }

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ error: "A doctor with this email already exists." });
    }

    const doctor = await Doctor.create({
      name,
      email,
      phone,
      speciality,
      gender,
      isActive: isActive !== undefined ? isActive : true,
      imageUrl: generateAvatar(name, gender),
    });

    res.status(201).json(doctor);
  } catch (error) {
    console.error("Create doctor error:", error);
    res.status(500).json({ error: "Failed to create doctor." });
  }
});

// PUT /api/doctors/:id - Update doctor (admin only)
router.put("/:id", auth, admin, async (req, res) => {
  try {
    const { name, email, phone, speciality, gender, isActive } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required." });
    }

    const currentDoctor = await Doctor.findById(req.params.id);
    if (!currentDoctor) {
      return res.status(404).json({ error: "Doctor not found." });
    }

    // If email is changing, check for duplicates
    if (email !== currentDoctor.email) {
      const existingDoctor = await Doctor.findOne({ email });
      if (existingDoctor) {
        return res.status(400).json({ error: "A doctor with this email already exists." });
      }
    }

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, speciality, gender, isActive },
      { new: true }
    );

    res.json(doctor);
  } catch (error) {
    console.error("Update doctor error:", error);
    res.status(500).json({ error: "Failed to update doctor." });
  }
});

export default router;
