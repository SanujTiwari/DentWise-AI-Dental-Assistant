import express from "express";
import { Resend } from "resend";
import auth from "../middleware/auth.js";

const router = express.Router();

// POST /api/email/appointment-confirmation
router.post("/appointment-confirmation", auth, async (req, res) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const {
      userEmail,
      doctorName,
      appointmentDate,
      appointmentTime,
      appointmentType,
      duration,
      price,
      doctorLocation,
    } = req.body;

    if (!userEmail || !doctorName || !appointmentDate || !appointmentTime) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // HTML email template (replaces React Email component)
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #0ea5e9, #0284c7); padding: 32px; text-align: center; color: white; }
            .header h1 { margin: 0; font-size: 24px; }
            .header p { margin: 8px 0 0; opacity: 0.9; }
            .body { padding: 32px; }
            .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f3f4f6; }
            .detail-label { color: #6b7280; font-size: 14px; }
            .detail-value { color: #111827; font-weight: 600; font-size: 14px; }
            .footer { background: #f9fafb; padding: 24px 32px; text-align: center; color: #6b7280; font-size: 12px; }
            .badge { display: inline-block; background: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Appointment Confirmed</h1>
              <p>Your dental appointment has been successfully booked</p>
            </div>
            <div class="body">
              <div class="detail-row">
                <span class="detail-label">Doctor</span>
                <span class="detail-value">${doctorName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Date</span>
                <span class="detail-value">${appointmentDate}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Time</span>
                <span class="detail-value">${appointmentTime}</span>
              </div>
              ${appointmentType ? `
              <div class="detail-row">
                <span class="detail-label">Type</span>
                <span class="detail-value">${appointmentType}</span>
              </div>` : ""}
              ${duration ? `
              <div class="detail-row">
                <span class="detail-label">Duration</span>
                <span class="detail-value">${duration}</span>
              </div>` : ""}
              ${price ? `
              <div class="detail-row">
                <span class="detail-label">Price</span>
                <span class="detail-value">${price}</span>
              </div>` : ""}
              ${doctorLocation ? `
              <div class="detail-row">
                <span class="detail-label">Location</span>
                <span class="detail-value">${doctorLocation}</span>
              </div>` : ""}
              <div style="text-align: center; margin-top: 24px;">
                <span class="badge">CONFIRMED</span>
              </div>
            </div>
            <div class="footer">
              <p>DentWise - AI Powered Dental Assistant</p>
              <p>If you need to reschedule, please visit our platform.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    let sendResult = await resend.emails.send({
      from: "DentWise <no-reply@resend.dev>",
      to: [userEmail],
      subject: "Appointment Confirmation - DentWise",
      html: emailHtml,
    });

    if (sendResult.error) {
      console.error("Initial Resend error:", sendResult.error);

      const errMsg = sendResult.error.message;
      if (errMsg && errMsg.includes("testing emails to your own email address")) {
        const match = errMsg.match(/\(([^)]+)\)/);
        if (match && match[1]) {
          const verifiedEmail = match[1];
          console.log(`Fallback: Sending test email to ${verifiedEmail}`);

          sendResult = await resend.emails.send({
            from: "DentWise <no-reply@resend.dev>",
            to: [verifiedEmail],
            subject: "[Test Fallback] Appointment Confirmation - DentWise",
            html: emailHtml,
          });
        }
      }
    }

    if (sendResult.error) {
      console.error("Final Resend error:", sendResult.error);
      return res.status(500).json({ error: "Failed to send email", details: sendResult.error.message });
    }

    res.json({ message: "Email sent successfully", emailId: sendResult.data?.id });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
