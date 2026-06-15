import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface AppointmentConfirmationEmailProps {
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
  duration: string;
  price: string;
  doctorLocation?: string;
}

function AppointmentConfirmationEmail({
  doctorName,
  appointmentDate,
  appointmentTime,
  appointmentType,
  duration,
  price,
  doctorLocation = "DentWise Dental, Ranchi, Jharkhand",
}: AppointmentConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your dental appointment has been confirmed - DentWise</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={headerSection}>
            <Row>
              <Column align="center">
                <Img
                  src="https://i.ibb.co.com/tRy6cC2/logo.png"
                  width="48"
                  height="48"
                  alt="DentWise"
                  style={logoImg}
                />
              </Column>
            </Row>
            <Text style={brandName}>DentWise</Text>
            <Text style={brandTagline}>Dental Assistant Platform</Text>
          </Section>

          {/* Success Banner */}
          <Section style={successBanner}>
            <Text style={successIcon}>✅</Text>
            <Heading style={successHeading}>Appointment Confirmed!</Heading>
            <Text style={successSubtext}>
              Your dental appointment has been successfully scheduled. We look forward to seeing you!
            </Text>
          </Section>

          {/* Appointment Details Card */}
          <Section style={detailsCard}>
            <Text style={cardTitle}>Appointment Details</Text>
            <Hr style={cardDivider} />

            {/* Doctor */}
            <Row style={detailRow}>
              <Column style={detailIconCol}>
                <Text style={detailIconText}>👨‍⚕️</Text>
              </Column>
              <Column style={detailContentCol}>
                <Text style={detailLabel}>Doctor</Text>
                <Text style={detailValue}>{doctorName}</Text>
              </Column>
            </Row>

            {/* Appointment Type */}
            <Row style={detailRow}>
              <Column style={detailIconCol}>
                <Text style={detailIconText}>🦷</Text>
              </Column>
              <Column style={detailContentCol}>
                <Text style={detailLabel}>Appointment Type</Text>
                <Text style={detailValue}>{appointmentType}</Text>
              </Column>
            </Row>

            {/* Date */}
            <Row style={detailRow}>
              <Column style={detailIconCol}>
                <Text style={detailIconText}>📅</Text>
              </Column>
              <Column style={detailContentCol}>
                <Text style={detailLabel}>Date</Text>
                <Text style={detailValue}>{appointmentDate}</Text>
              </Column>
            </Row>

            {/* Time */}
            <Row style={detailRow}>
              <Column style={detailIconCol}>
                <Text style={detailIconText}>🕐</Text>
              </Column>
              <Column style={detailContentCol}>
                <Text style={detailLabel}>Time</Text>
                <Text style={detailValue}>{appointmentTime}</Text>
              </Column>
            </Row>

            {/* Duration */}
            <Row style={detailRow}>
              <Column style={detailIconCol}>
                <Text style={detailIconText}>⏱️</Text>
              </Column>
              <Column style={detailContentCol}>
                <Text style={detailLabel}>Duration</Text>
                <Text style={detailValue}>{duration}</Text>
              </Column>
            </Row>

            {/* Cost */}
            <Row style={detailRow}>
              <Column style={detailIconCol}>
                <Text style={detailIconText}>💰</Text>
              </Column>
              <Column style={detailContentCol}>
                <Text style={detailLabel}>Consultation Fee</Text>
                <Text style={detailValueHighlight}>{price}</Text>
              </Column>
            </Row>

            {/* Location */}
            <Row style={detailRow}>
              <Column style={detailIconCol}>
                <Text style={detailIconText}>📍</Text>
              </Column>
              <Column style={detailContentCol}>
                <Text style={detailLabel}>Location</Text>
                <Text style={detailValue}>{doctorLocation}</Text>
              </Column>
            </Row>
          </Section>

          {/* Important Notice */}
          <Section style={noticeSection}>
            <Text style={noticeTitle}>📋 Important Reminders</Text>
            <Text style={noticeItem}>• Please arrive 15 minutes before your scheduled time</Text>
            <Text style={noticeItem}>• Carry a valid photo ID and any previous dental records</Text>
            <Text style={noticeItem}>• To reschedule or cancel, please inform us at least 24 hours in advance</Text>
          </Section>

          {/* CTA Button */}
          <Section style={buttonContainer}>
            <Link style={button} href={process.env.NEXT_PUBLIC_APP_URL + "/appointments"}>
              View My Appointments →
            </Link>
          </Section>

          {/* Footer */}
          <Hr style={footerDivider} />

          <Section style={footerSection}>
            <Row>
              <Column align="center">
                <Img
                  src="https://i.ibb.co.com/tRy6cC2/logo.png"
                  width="32"
                  height="32"
                  alt="DentWise"
                  style={footerLogo}
                />
              </Column>
            </Row>
            <Text style={footerBrand}>DentWise</Text>
            <Text style={footerText}>
              Your trusted AI-powered dental assistant platform
            </Text>
            <Text style={footerContact}>
              Need help? Reach us at{" "}
              <Link href="mailto:support@dentwise.com" style={footerLink}>
                support@dentwise.com
              </Link>
            </Text>
            <Text style={footerCopyright}>
              © {new Date().getFullYear()} DentWise. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default AppointmentConfirmationEmail;

// ─── Styles ─────────────────────────────────────────────────────────────────

const main = {
  backgroundColor: "#f0f4f8",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
};

const headerSection = {
  textAlign: "center" as const,
  padding: "32px 0 16px",
};

const logoImg = {
  borderRadius: "12px",
};

const brandName = {
  fontSize: "22px",
  fontWeight: "700",
  color: "#1a7ab5",
  margin: "12px 0 0 0",
  letterSpacing: "-0.5px",
};

const brandTagline = {
  fontSize: "12px",
  color: "#6b7280",
  margin: "2px 0 0 0",
  textTransform: "uppercase" as const,
  letterSpacing: "1.5px",
};

const successBanner = {
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "32px 24px",
  textAlign: "center" as const,
  margin: "24px 0",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
};

const successIcon = {
  fontSize: "40px",
  margin: "0 0 8px 0",
};

const successHeading = {
  color: "#111827",
  fontSize: "26px",
  fontWeight: "700",
  margin: "8px 0",
  letterSpacing: "-0.5px",
};

const successSubtext = {
  color: "#6b7280",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "8px 0 0 0",
};

const detailsCard = {
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "24px",
  margin: "0 0 16px 0",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
};

const cardTitle = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#111827",
  margin: "0 0 8px 0",
};

const cardDivider = {
  borderColor: "#e5e7eb",
  margin: "12px 0 16px 0",
};

const detailRow = {
  marginBottom: "16px",
};

const detailIconCol = {
  width: "40px",
  verticalAlign: "top" as const,
};

const detailIconText = {
  fontSize: "18px",
  margin: "0",
  lineHeight: "1",
};

const detailContentCol = {
  verticalAlign: "top" as const,
};

const detailLabel = {
  color: "#9ca3af",
  fontSize: "12px",
  fontWeight: "500",
  margin: "0",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
};

const detailValue = {
  color: "#111827",
  fontSize: "15px",
  fontWeight: "600",
  margin: "2px 0 0 0",
};

const detailValueHighlight = {
  color: "#1a7ab5",
  fontSize: "16px",
  fontWeight: "700",
  margin: "2px 0 0 0",
};

const noticeSection = {
  backgroundColor: "#fffbeb",
  border: "1px solid #fde68a",
  borderRadius: "12px",
  padding: "20px 24px",
  margin: "0 0 24px 0",
};

const noticeTitle = {
  fontSize: "14px",
  fontWeight: "700",
  color: "#92400e",
  margin: "0 0 12px 0",
};

const noticeItem = {
  fontSize: "13px",
  color: "#78350f",
  lineHeight: "22px",
  margin: "0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "8px 0 32px 0",
};

const button = {
  backgroundColor: "#1a7ab5",
  borderRadius: "10px",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 32px",
  boxShadow: "0 2px 4px rgba(26, 122, 181, 0.3)",
};

const footerDivider = {
  borderColor: "#e5e7eb",
  margin: "0 0 24px 0",
};

const footerSection = {
  textAlign: "center" as const,
  padding: "0 0 16px 0",
};

const footerLogo = {
  borderRadius: "8px",
  opacity: "0.8",
};

const footerBrand = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#1a7ab5",
  margin: "8px 0 4px 0",
};

const footerText = {
  fontSize: "13px",
  color: "#9ca3af",
  margin: "0 0 12px 0",
};

const footerContact = {
  fontSize: "12px",
  color: "#9ca3af",
  margin: "0 0 8px 0",
};

const footerLink = {
  color: "#1a7ab5",
  textDecoration: "underline",
};

const footerCopyright = {
  fontSize: "11px",
  color: "#d1d5db",
  margin: "8px 0 0 0",
};
