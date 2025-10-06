# TaskFlow - Beautiful Task Management App

A modern, elegant task management application inspired by Todoist, Structured, and Tweek. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

### Core Functionality

- ✅ **Add Tasks** - Create tasks with title, description, date, and time
- ✅ **Edit & Delete** - Full CRUD operations for task management
- ✅ **Mark Complete** - Toggle task completion with smooth animations
- ✅ **Date & Time** - Schedule tasks with specific dates and times
- ✅ **Calendar View** - Beautiful date picker with month navigation

### Organization & Productivity

- 🏷️ **Hashtags** - Color-coded hashtags for task categorization
- 🎯 **Priority Levels** - Low, medium, and high priority indicators
- 🔍 **Search & Filter** - Find tasks by title, description, or hashtags
- 📊 **Task Stats** - Overview of completion rates and task counts
- 📅 **Smart Filtering** - Filter by today, upcoming, completed, or all tasks

### Design & Experience

- 🎨 **Modern UI** - Clean, minimalist design with glass morphism effects
- 🌈 **Beautiful Animations** - Smooth transitions and micro-interactions
- 🌙 **Dark Mode** - Full dark/light theme support
- 📱 **Responsive** - Works perfectly on desktop, tablet, and mobile
- 🎭 **Icons** - Emoji icons for visual task identification

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd scheduler
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Fonts**: Geist Sans & Geist Mono

## 📁 Project Structure

```
src/
├── app/
│   ├── dashboard/          # Main dashboard page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page (redirects to dashboard)
├── components/
│   ├── TaskCard.tsx        # Individual task display
│   ├── TaskForm.tsx        # Task creation/editing modal
│   ├── DatePicker.tsx      # Calendar component
│   ├── HashtagFilter.tsx   # Hashtag filtering
│   ├── TaskStats.tsx       # Task statistics
│   ├── EmptyState.tsx      # Empty state component
│   └── LoadingSpinner.tsx  # Loading animation
└── types/
    └── task.ts             # TypeScript type definitions
```

## 🎨 Design Philosophy

TaskFlow combines the best elements from popular task management apps:

- **Todoist's** clean interface and powerful filtering
- **Structured's** beautiful calendar integration
- **Tweek's** modern design and smooth animations

The app focuses on:

- **Simplicity** - Intuitive interface that doesn't overwhelm
- **Beauty** - Every interaction is carefully crafted
- **Efficiency** - Quick task creation and management
- **Flexibility** - Multiple ways to organize and view tasks

## 🔮 Future Enhancements

- [ ] Database persistence (currently uses local state)
- [ ] User authentication and multi-user support
- [ ] Task templates and recurring tasks
- [ ] Team collaboration features
- [ ] Mobile app (React Native)
- [ ] Advanced analytics and reporting
- [ ] Integration with external calendars
- [ ] Voice input for task creation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
