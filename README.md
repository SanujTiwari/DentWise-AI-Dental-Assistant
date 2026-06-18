# DentWise - Dental Appointment Booking System

A modern, intelligent dental appointment booking platform built with Next.js, featuring AI-powered chat assistance, doctor management, and seamless appointment scheduling.

## 🎯 Features

- **User Authentication**: Secure authentication powered by Clerk
- **Appointment Booking**: Intuitive multi-step appointment scheduling with doctor selection, date/time selection, and confirmation
- **AI Chat Assistant**: Google Gemini integration for dental health questions and appointment guidance
- **Doctor Management**: Admin panel for managing doctors and viewing appointments
- **Dashboard**: Personalized user dashboard with appointment history and upcoming appointments
- **Email Notifications**: Automated appointment confirmations via Resend
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS and Radix UI components
- **Admin Dashboard**: Comprehensive admin tools for managing doctors and viewing statistics

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) 15.5.0
- **UI Library**: [React](https://react.dev/) 19.1.0
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 4.x
- **Component Library**: [Radix UI](https://www.radix-ui.com/) primitives
- **Form Management**: [React Hook Form](https://react-hook-form.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend & Services
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [Clerk](https://clerk.com/)
- **AI Integration**: [Google Generative AI](https://ai.google.dev/)
- **Email Service**: [Resend](https://resend.com/)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)

### Development Tools
- **Linting & Formatting**: [Biome](https://biomejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 📦 Prerequisites

- Node.js 18+ 
- npm or yarn
- Database (PostgreSQL recommended for Prisma)
- API keys for:
  - Google Generative AI
  - Clerk
  - Resend (for email)

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dentwise
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="your_database_url"
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_key"
   CLERK_SECRET_KEY="your_clerk_secret"
   
   # Google Generative AI
   GOOGLE_API_KEY="your_google_api_key"
   
   # Resend Email Service
   RESEND_API_KEY="your_resend_api_key"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npm run seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome
- `npm run seed` - Seed the database with initial data

## 📁 Project Structure

```
src/
├── app/
│   ├── api/              # API routes (chat, appointments, user)
│   ├── admin/            # Admin dashboard
│   ├── appointments/     # Appointment booking flow
│   ├── dashboard/        # User dashboard
│   ├── profile/          # User profile
│   ├── voice/            # Voice/AI features
│   └── layout.tsx        # Root layout
├── components/
│   ├── admin/            # Admin-specific components
│   ├── appointments/     # Appointment booking components
│   ├── dashboard/        # Dashboard components
│   ├── landing/          # Landing page components
│   ├── providers/        # Context providers
│   ├── ui/               # Reusable UI components (Radix UI based)
│   └── voice/            # Voice/AI components
├── hooks/                # Custom React hooks
├── lib/
│   ├── actions/          # Server actions
│   ├── gemini.ts         # Google Gemini integration
│   ├── prisma.ts         # Prisma client
│   ├── resend.ts         # Email service
│   └── utils.ts          # Utility functions
└── middleware.ts         # Next.js middleware

prisma/
├── schema.prisma         # Database schema
└── seed.ts              # Database seed script
```

## 🔑 Key Features Breakdown

### Appointment Booking
- Multi-step booking wizard with progress tracking
- Doctor selection with detailed information
- Available time slot selection
- Booking confirmation and email notification

### Admin Dashboard
- View all doctors and appointments
- Add/edit doctors
- View appointment statistics and recent bookings

### User Dashboard
- View upcoming appointments
- Dental health overview
- Quick actions for common tasks
- Activity timeline

### AI Chat Assistant
- Google Gemini-powered dental health Q&A
- Real-time chat interface
- Context-aware responses

## 🔐 Authentication

DentWise uses Clerk for authentication. Users can:
- Sign up with email
- Sign in securely
- Manage their profile
- View their appointment history

## 🗄️ Database

The application uses Prisma ORM with PostgreSQL. Key models include:
- User
- Doctor
- Appointment
- Availability

## 📧 Email Service

Appointment confirmations are sent via Resend with HTML email templates built using React Email.

## 🎨 Styling

The project uses:
- Tailwind CSS for utility-first styling
- CSS animations via `tw-animate-css`
- Dark mode support via `next-themes`

## 📱 Responsive Design

The UI is fully responsive and mobile-optimized using:
- Tailwind CSS responsive utilities
- Mobile-specific hooks (`use-mobile`)
- Responsive components from Radix UI

## 🧪 Code Quality

- **Linting**: Biome for fast linting and formatting
- **Type Safety**: Full TypeScript coverage
- **Form Validation**: Zod schema validation with React Hook Form

## 🚀 Deployment

Build the application:
```bash
npm run build
```

The build output can be deployed to any platform that supports Node.js (Vercel, Netlify, etc.).

## 📄 License

This project is private. All rights reserved.

## 🤝 Contributing

For contribution guidelines, please contact the development team.

## 📞 Support

For issues and questions, please contact the development team or create an issue in the repository.
📞: +91 7366891704 (Whatsapp Only)


