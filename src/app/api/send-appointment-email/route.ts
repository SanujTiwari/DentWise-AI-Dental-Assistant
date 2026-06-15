import AppointmentConfirmationEmail from "@/components/emails/AppointmentConfirmationEmail";
import resend from "@/lib/resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      userEmail,
      doctorName,
      appointmentDate,
      appointmentTime,
      appointmentType,
      duration,
      price,
      doctorLocation,
    } = body;

    // validate required fields
    if (!userEmail || !doctorName || !appointmentDate || !appointmentTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // send the email
    // do not use this in prod, only for testing purposes
    let sendResult = await resend.emails.send({
      from: "DentWise <no-reply@resend.dev>",
      to: [userEmail],
      subject: "Appointment Confirmation - DentWise",
      react: AppointmentConfirmationEmail({
        doctorName,
        appointmentDate,
        appointmentTime,
        appointmentType,
        duration,
        price,
        doctorLocation,
      }),
    });

    if (sendResult.error) {
      console.error("Initial Resend error:", sendResult.error);
      
      const errMsg = sendResult.error.message;
      if (errMsg && errMsg.includes("testing emails to your own email address")) {
        const match = errMsg.match(/\(([^)]+)\)/);
        if (match && match[1]) {
          const verifiedEmail = match[1];
          console.log(`Fallback: Sending test email to Resend verified owner address: ${verifiedEmail}`);
          
          sendResult = await resend.emails.send({
            from: "DentWise <no-reply@resend.dev>",
            to: [verifiedEmail],
            subject: "[Test Fallback] Appointment Confirmation - DentWise",
            react: AppointmentConfirmationEmail({
              doctorName,
              appointmentDate,
              appointmentTime,
              appointmentType,
              duration,
              price,
              doctorLocation,
            }),
          });
        }
      }
    }

    if (sendResult.error) {
      console.error("Final Resend error:", sendResult.error);
      return NextResponse.json({ error: "Failed to send email", details: sendResult.error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Email sent successfully", emailId: sendResult.data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
