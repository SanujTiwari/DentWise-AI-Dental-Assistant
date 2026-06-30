import express from "express";
import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Helper to transform appointment data
function transformAppointment(appointment) {
  const doc = appointment.doctor;
  const usr = appointment.user;

  const doctorLocation = doc?.bio?.match(/practices at (.+?), Ranchi/)?.[1]
    ? `${doc.bio.match(/practices at (.+?), Ranchi/)?.[1]}, Ranchi, Jharkhand`
    : "DentWise Dental, Ranchi, Jharkhand";

  return {
    ...appointment.toObject(),
    patientName: `${usr?.firstName || ""} ${usr?.lastName || ""}`.trim(),
    patientEmail: usr?.email,
    doctorName: doc?.name,
    doctorImageUrl: doc?.imageUrl || "",
    doctorLocation,
    date: appointment.date.toISOString().split("T")[0],
  };
}

// GET /api/appointments - Get all appointments (admin)
router.get("/", auth, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("user", "firstName lastName email")
      .populate("doctor", "name imageUrl bio")
      .sort({ createdAt: -1 });

    const transformed = appointments.map(transformAppointment);
    res.json(transformed);
  } catch (error) {
    console.error("Get appointments error:", error);
    res.status(500).json({ error: "Failed to fetch appointments." });
  }
});

// GET /api/appointments/user - Get current user's appointments
router.get("/user", auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id })
      .populate("user", "firstName lastName email")
      .populate("doctor", "name imageUrl bio")
      .sort({ date: 1, time: 1 });

    const transformed = appointments.map(transformAppointment);
    res.json(transformed);
  } catch (error) {
    console.error("Get user appointments error:", error);
    res.json([]);
  }
});

// GET /api/appointments/stats - Get user appointment stats
router.get("/stats", auth, async (req, res) => {
  try {
    const [totalCount, completedCount] = await Promise.all([
      Appointment.countDocuments({ user: req.user._id }),
      Appointment.countDocuments({ user: req.user._id, status: "COMPLETED" }),
    ]);

    res.json({
      totalAppointments: totalCount,
      completedAppointments: completedCount,
    });
  } catch (error) {
    console.error("Get stats error:", error);
    res.json({ totalAppointments: 0, completedAppointments: 0 });
  }
});

// GET /api/appointments/booked-slots?doctorId=...&date=...
router.get("/booked-slots", auth, async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
      return res.status(400).json({ error: "doctorId and date are required." });
    }

    const appointments = await Appointment.find({
      doctor: doctorId,
      date: new Date(date),
      status: { $in: ["CONFIRMED", "COMPLETED"] },
    }).select("time");

    const bookedSlots = appointments.map((a) => a.time);
    res.json(bookedSlots);
  } catch (error) {
    console.error("Get booked slots error:", error);
    res.json([]);
  }
});

// POST /api/appointments - Book appointment
router.post("/", auth, async (req, res) => {
  try {
    const { doctorId, date, time, reason } = req.body;

    if (!doctorId || !date || !time) {
      return res.status(400).json({ error: "Doctor, date, and time are required." });
    }

    const appointment = await Appointment.create({
      user: req.user._id,
      doctor: doctorId,
      date: new Date(date),
      time,
      reason: reason || "General consultation",
      status: "CONFIRMED",
    });

    // Populate user and doctor for the response
    const populated = await Appointment.findById(appointment._id)
      .populate("user", "firstName lastName email")
      .populate("doctor", "name imageUrl bio");

    const transformed = transformAppointment(populated);
    res.status(201).json(transformed);
  } catch (error) {
    console.error("Book appointment error:", error);
    res.status(500).json({ error: "Failed to book appointment. Please try again later." });
  }
});

// PUT /api/appointments/:id/status - Update appointment status
router.put("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["CONFIRMED", "COMPLETED"].includes(status)) {
      return res.status(400).json({ error: "Invalid status." });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    res.json(appointment);
  } catch (error) {
    console.error("Update appointment status error:", error);
    res.status(500).json({ error: "Failed to update appointment." });
  }
});

export default router;
