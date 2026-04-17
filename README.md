# EventConnect Hub

## Live Demo
https://outtacouch.vercel.app

---

## 1. Project Overview

EventConnect Hub is an event-first social connection platform designed to transform online discovery into real-world relationships. Unlike traditional social platforms that prioritize engagement metrics such as likes and feeds, EventConnect Hub uses event participation as the primary signal of identity and trust.

The platform enables users to discover events, commit to attending, and build meaningful connections based on shared experiences rather than superficial interactions.

### Problem Statement
- Existing social platforms focus on digital engagement rather than real-world interaction
- Users lack reliable ways to meet people with shared interests
- Event hosts lack integrated tools for publishing, managing, and validating attendance

### Solution
EventConnect Hub provides a unified platform where:
- Event discovery is personalized by relevance (location, timing, interests)
- Attendance becomes a trust signal for building connections
- Users move from browsing to real participation

### Use Cases
- Discover and attend local events, then connect with attendees
- Create and manage paid or free events with ticket validation
- Build a profile based on attended and hosted events

### Target Users
- Attendees seeking meaningful real-world interactions
- Event hosts managing events, tickets, and analytics
- Communities that value real-world engagement over follower counts

---

## 2. System Architecture

### High-Level Design
The system is implemented as a monolithic Next.js application combining both frontend and backend.

- Frontend: Next.js App Router with route groups  
  - `(auth)` for authentication flows  
  - `(main)` for core features (events, chat, profile)

- Backend: Next.js API routes (`/app/api`)
- Realtime: Socket.io server (`/pages/api/socketio.ts`)

### Core Services
- PostgreSQL (via Prisma ORM)
- Supabase Storage (media handling)
- Stripe (payments)
- Twilio Verify / SMTP (OTP verification)

### Data Flow
Client → API Route → JWT Validation → Prisma Query → Response → UI Update

### Realtime Flow
Client ↔ Socket.io server (connection-based messaging)

---

## 3. Tech Stack

### Frontend
- Next.js (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form
- Zustand
- Leaflet (maps)
- Recharts (analytics)

### Backend
- Next.js API Routes
- NextAuth (JWT-based authentication)
- Prisma ORM
- PostgreSQL

### Integrations
- Stripe (payments & webhooks)
- Supabase Storage
- Twilio Verify (OTP)
- Nodemailer (email OTP)
- Socket.io (realtime communication)

---

## 4. Database Design

### Core Entities
- User
- Event
- EventAttendee
- Ticket
- Connection
- Message
- Notification
- Memory

### Key Relationships
- Users host and attend events
- Events manage attendees and tickets
- Connections link users based on interactions
- Messages are tied to connections

### Key Constraints
- One attendance per user per event
- Unique ticket QR codes
- Indexed queries for performance

---

## 5. Backend Overview

### API Structure
REST-based endpoints under `/app/api`

#### Example Endpoints
- Authentication: OTP, register, reset
- Events: create, fetch, commit
- Tickets: payment intent, confirm, validate
- Chat: messaging and read status

### Security
- JWT-based authentication
- Ownership checks for protected actions
- Rate limiting for OTP requests
- Stripe webhook verification

---

## 6. Frontend Architecture

### Structure
- Reusable UI components
- Feature-based modular design

### State Management
- Local state for UI
- Zustand for global state

### UX Decisions
- Swipe-based event discovery
- Calendar-first profile design
- Simplified event participation flow

---

## 7. End-to-End Flow

Example: User commits to an event

1. User action triggers API request  
2. Server validates token and event capacity  
3. Attendance record is created  
4. Response is returned  
5. UI updates accordingly  

---

## 8. Deployment

### Hosting
- Frontend & API: Vercel
- Database: PostgreSQL (Supabase)
- Storage: Supabase Storage

### Environment Variables
- Database configuration
- Authentication secrets
- Stripe keys
- Supabase credentials
- Email/OTP services

---

## 9. Performance Optimization

- Event feed limited to 50 results
- Optimized queries using indexing
- Media stored externally
- Dynamic imports for heavy components

---
