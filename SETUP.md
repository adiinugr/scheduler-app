# Scheduler App - Setup Guide

## 🚀 Quick Start

### 1. Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-here"

# Generate a secure secret with:
# openssl rand -base64 32
```

### 2. Database Setup (Neon)

1. **Create a Neon account** at [neon.tech](https://neon.tech)
2. **Create a new project** in your Neon dashboard
3. **Copy the connection string** from your project settings
4. **Update your `.env` file** with the DATABASE_URL

### 3. Install Dependencies

```bash
npm install
```

### 4. Database Migration

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) View your database in Prisma Studio
npx prisma studio
```

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app!

## 🔐 Authentication Features

- **User Registration**: Create new accounts with email/password
- **User Login**: Secure authentication with NextAuth.js
- **Protected Routes**: Dashboard requires authentication
- **User-specific Tasks**: Each user sees only their own tasks
- **Session Management**: Automatic session handling

## 📊 Database Schema

The app uses the following main models:

- **User**: User accounts with authentication
- **Task**: User tasks with full CRUD operations
- **Account/Session**: NextAuth.js authentication tables

## 🛠️ API Endpoints

- `POST /api/auth/register` - User registration
- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task

## 🎨 Features

- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Task Management**: Create, edit, delete, and organize tasks
- **Date Picker**: Visual date selection with task indicators
- **Priority System**: High, medium, low priority levels
- **Hashtags**: Tag and filter tasks
- **Icons**: Emoji icons for visual task identification
- **Real-time Updates**: Instant UI updates with API integration

## 🔧 Development

### Database Commands

```bash
# Reset database (careful!)
npx prisma db push --force-reset

# View database
npx prisma studio

# Generate new migration
npx prisma migrate dev --name your-migration-name
```

### Environment Variables

Make sure to set these in production:

- `NEXTAUTH_URL`: Your production domain
- `NEXTAUTH_SECRET`: A secure random string
- `DATABASE_URL`: Your production database connection string

## 🚀 Deployment

1. **Deploy to Vercel/Netlify**
2. **Set environment variables** in your deployment platform
3. **Run database migrations** in production
4. **Update NEXTAUTH_URL** to your production domain

## 📝 Notes

- The app uses PostgreSQL with Prisma ORM
- Authentication is handled by NextAuth.js
- All tasks are user-specific and isolated
- The database schema supports future features like team collaboration
