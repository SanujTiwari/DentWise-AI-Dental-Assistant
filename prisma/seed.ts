import { PrismaClient, Gender } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding doctors...");

  // Clear existing doctors first
  await prisma.doctor.deleteMany();

  const doctors = await prisma.doctor.createMany({
    data: [
      {
        name: "Dr. Ananya Sharma",
        email: "ananya.sharma@dentwise.com",
        phone: "+91-98100-10101",
        speciality: "General Dentistry",
        bio: "Dr. Sharma has 12 years of experience in general dentistry, specializing in preventive care and patient comfort. She practices at Smile Care Dental Clinic, Lalpur, Ranchi.",
        imageUrl: "/doctors/ananya.png",
        gender: Gender.FEMALE,
        isActive: true,
      },
      {
        name: "Dr. Arjun Mehta",
        email: "arjun.mehta@dentwise.com",
        phone: "+91-98100-10102",
        speciality: "Orthodontics",
        bio: "Dr. Mehta is a board-certified orthodontist with expertise in Invisalign and traditional braces for all ages. He practices at OrthoZone Dental Hospital, Main Road, Ranchi.",
        imageUrl: "/doctors/arjun.png",
        gender: Gender.MALE,
        isActive: true,
      },
      {
        name: "Dr. Priya Patel",
        email: "priya.patel@dentwise.com",
        phone: "+91-98100-10103",
        speciality: "Cosmetic Dentistry",
        bio: "Dr. Patel specializes in smile makeovers including teeth whitening, veneers, and dental bonding. She practices at Pearl Dental Studio, Harmu Road, Ranchi.",
        imageUrl: "/doctors/priya.png",
        gender: Gender.FEMALE,
        isActive: true,
      },
      {
        name: "Dr. Vikram Reddy",
        email: "vikram.reddy@dentwise.com",
        phone: "+91-98100-10104",
        speciality: "Oral Surgery",
        bio: "Dr. Reddy has over 15 years of experience in oral and maxillofacial surgery including wisdom tooth extraction. He practices at City Dental & Maxillofacial Centre, Kanke Road, Ranchi.",
        imageUrl: "/doctors/vikram.png",
        gender: Gender.MALE,
        isActive: true,
      },
      {
        name: "Dr. Kavita Desai",
        email: "kavita.desai@dentwise.com",
        phone: "+91-98100-10105",
        speciality: "Pediatric Dentistry",
        bio: "Dr. Desai is passionate about making dental visits fun and stress-free for children of all ages. She practices at Little Smiles Children's Dental Clinic, Ashok Nagar, Ranchi.",
        imageUrl: "/doctors/kavita.png",
        gender: Gender.FEMALE,
        isActive: true,
      },
      {
        name: "Dr. Rohit Gupta",
        email: "rohit.gupta@dentwise.com",
        phone: "+91-98100-10106",
        speciality: "Endodontics",
        bio: "Dr. Gupta specializes in root canal therapy and saving teeth that would otherwise need extraction. He practices at Apex Dental Care, Doranda, Ranchi.",
        imageUrl: "/doctors/rohit.png",
        gender: Gender.MALE,
        isActive: true,
      },
    ],
  });

  console.log(`✅ Seeded ${doctors.count} doctors successfully!`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
