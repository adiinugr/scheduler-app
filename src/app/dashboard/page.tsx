"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Calendar, Filter, Search, Settings } from "lucide-react"
import { Task, TaskFilter } from "@/types/task"
import TaskCard from "@/components/TaskCard"
import TaskForm from "@/components/TaskForm"
import HorizontalDatePicker from "@/components/HorizontalDatePicker"
import HashtagFilter from "@/components/HashtagFilter"
import EmptyState from "@/components/EmptyState"
import TaskStats from "@/components/TaskStats"

// Create stable dates to prevent hydration mismatches
const createStableDate = (timestamp: number) => new Date(timestamp)

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [filter, setFilter] = useState<TaskFilter>("all")
  const [dateFilter, setDateFilter] = useState<Date | null>(null)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])

  // Initialize tasks on client side only to prevent hydration mismatch
  useEffect(() => {
    if (!isInitialized) {
      const baseTime = Date.now()
      setTasks([
        {
          id: "1",
          title: "Design new landing page",
          description:
            "Create a modern, responsive landing page for the new product launch",
          date: createStableDate(baseTime),
          time: "10:00",
          completed: false,
          icon: "🎨",
          hashtags: ["work", "design", "urgent"],
          priority: "high",
          createdAt: createStableDate(baseTime),
          updatedAt: createStableDate(baseTime)
        },
        {
          id: "2",
          title: "Grocery shopping",
          description: "Buy ingredients for weekend dinner party",
          date: createStableDate(baseTime + 24 * 60 * 60 * 1000),
          time: "14:30",
          completed: false,
          icon: "🛒",
          hashtags: ["personal", "shopping"],
          priority: "medium",
          createdAt: createStableDate(baseTime),
          updatedAt: createStableDate(baseTime)
        },
        {
          id: "3",
          title: "Team meeting",
          description: "Weekly standup with the development team",
          date: createStableDate(baseTime),
          time: "09:00",
          completed: true,
          icon: "💼",
          hashtags: ["work", "meeting"],
          priority: "medium",
          createdAt: createStableDate(baseTime),
          updatedAt: createStableDate(baseTime)
        },
        {
          id: "4",
          title: "Read new book",
          description: 'Continue reading "Atomic Habits" - aim for 30 pages',
          date: createStableDate(baseTime + 2 * 24 * 60 * 60 * 1000),
          completed: false,
          icon: "📚",
          hashtags: ["personal", "learning"],
          priority: "low",
          createdAt: createStableDate(baseTime),
          updatedAt: createStableDate(baseTime)
        }
      ])
      setIsInitialized(true)
    }
  }, [isInitialized])

  const [today, setToday] = useState<Date | null>(null)

  // Initialize today on client side only
  useEffect(() => {
    setToday(new Date())
  }, [])

  const isToday = (date: Date) => {
    if (!today) return false
    return date.toDateString() === today.toDateString()
  }

  // Filter tasks based on current filters
  const filteredTasks = tasks.filter((task) => {
    // Date filter (from calendar selection)
    const matchesDateFilter =
      !dateFilter || task.date.toDateString() === dateFilter.toDateString()

    // Category filter (all, today, upcoming, completed)
    const matchesCategoryFilter =
      filter === "all" ||
      (filter === "today" && isToday(task.date)) ||
      (filter === "upcoming" && today && task.date > today) ||
      (filter === "completed" && task.completed)

    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesHashtags =
      selectedHashtags.length === 0 ||
      selectedHashtags.some((tag) => task.hashtags.includes(tag))

    return (
      matchesDateFilter &&
      matchesCategoryFilter &&
      matchesSearch &&
      matchesHashtags
    )
  })

  const addTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const now = Date.now()
    const newTask: Task = {
      ...taskData,
      id: now.toString(),
      createdAt: createStableDate(now),
      updatedAt: createStableDate(now)
    }
    setTasks((prev) => [...prev, newTask])
  }

  const editTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    if (!editingTask) return

    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingTask.id
          ? { ...task, ...taskData, updatedAt: createStableDate(Date.now()) }
          : task
      )
    )
    setEditingTask(null)
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: createStableDate(Date.now()) }
          : task
      )
    )
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setDateFilter(date)
    // Clear other filters when selecting a specific date
    setFilter("all")
  }

  const clearDateFilter = () => {
    setDateFilter(null)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-800">
                Scheduler App
              </h1>
              <div className="hidden md:flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Filters
              </h3>
              <div className="space-y-2">
                {(
                  ["all", "today", "upcoming", "completed"] as TaskFilter[]
                ).map((filterOption) => {
                  // Check if we should highlight "today" when date filter is active and it's today
                  const shouldHighlightToday =
                    filterOption === "today" &&
                    dateFilter &&
                    isToday(dateFilter)

                  const isActive = filter === filterOption && !dateFilter

                  return (
                    <button
                      key={filterOption}
                      onClick={() => {
                        setFilter(filterOption)
                        setDateFilter(null)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive || shouldHighlightToday
                          ? "bg-orange-100 text-orange-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {filterOption.charAt(0).toUpperCase() +
                        filterOption.slice(1)}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Task Stats */}
            <TaskStats tasks={tasks} />

            {/* Hashtag Filter */}
            <HashtagFilter
              tasks={tasks}
              selectedHashtags={selectedHashtags}
              onHashtagToggle={setSelectedHashtags}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Date Picker and Search Bar */}
            <div className="mb-6 space-y-4">
              {/* Horizontal Date Picker */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <HorizontalDatePicker
                  selectedDate={selectedDate}
                  onDateChange={handleDateSelect}
                  tasks={tasks}
                />
              </div>

              {/* Compact Search Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-64 pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm"
                    />
                  </div>
                </div>

                {/* Task Count and Active Filters */}
                <div className="flex items-center space-x-4">
                  {selectedHashtags.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">Hashtags:</span>
                      <div className="flex space-x-1">
                        {selectedHashtags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="text-sm text-gray-500">
                    {filteredTasks.length}{" "}
                    {filteredTasks.length === 1 ? "task" : "tasks"}
                  </div>
                </div>
              </div>
            </div>

            {/* Task List */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredTasks.length === 0 ? (
                  <EmptyState
                    title="No tasks found"
                    description={
                      searchQuery || selectedHashtags.length > 0
                        ? "Try adjusting your search or filters to find what you're looking for."
                        : "Create your first task to get started with organizing your day!"
                    }
                    actionText="Add Your first Task"
                    onAction={() => setShowTaskForm(true)}
                  />
                ) : (
                  filteredTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onUpdate={updateTask}
                      onDelete={deleteTask}
                      onEdit={setEditingTask}
                    />
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Task Form Modal */}
      <AnimatePresence>
        {showTaskForm && (
          <TaskForm
            onClose={() => setShowTaskForm(false)}
            onSubmit={addTask}
            initialDate={selectedDate}
          />
        )}
      </AnimatePresence>

      {/* Edit Task Form Modal */}
      <AnimatePresence>
        {editingTask && (
          <TaskForm
            onClose={() => setEditingTask(null)}
            onSubmit={editTask}
            initialDate={editingTask.date}
            initialData={editingTask}
          />
        )}
      </AnimatePresence>

      {/* Floating Add Task Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowTaskForm(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50 hover:bg-orange-600"
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </div>
  )
}
