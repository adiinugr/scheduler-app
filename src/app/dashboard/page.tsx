"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Calendar, Search, Settings, LogOut } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Task, TaskFilter } from "@/types/task"
import TaskCard from "@/components/TaskCard"
import TaskForm from "@/components/TaskForm"
import HorizontalDatePicker from "@/components/HorizontalDatePicker"
import HashtagFilter from "@/components/HashtagFilter"
import EmptyState from "@/components/EmptyState"
import TaskStats from "@/components/TaskStats"

// Create stable dates to prevent hydration mismatches

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [filter, setFilter] = useState<TaskFilter>("all")
  const [dateFilter, setDateFilter] = useState<Date | null>(null)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  // Fetch tasks from API
  useEffect(() => {
    if (status === "authenticated") {
      fetchTasks()
    }
  }, [status])

  const fetchTasks = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch("/api/tasks")
      if (response.ok) {
        const data = await response.json()
        // Convert date strings back to Date objects
        const tasksWithDates = data.map(
          (
            task: Task & { date: string; createdAt: string; updatedAt: string }
          ) => ({
            ...task,
            date: new Date(task.date),
            createdAt: new Date(task.createdAt),
            updatedAt: new Date(task.updatedAt)
          })
        )
        setTasks(tasksWithDates)
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Failed to fetch tasks")
      }
    } catch (error) {
      console.error("Error fetching tasks:", error)
      setError("Failed to connect to server")
    } finally {
      setIsLoading(false)
    }
  }

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

  const addTask = async (
    taskData: Omit<Task, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      setIsSubmitting(true)
      setError(null)
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: taskData.title,
          description: taskData.description,
          date: taskData.date.toISOString(),
          time: taskData.time,
          icon: taskData.icon,
          hashtags: taskData.hashtags,
          priority: taskData.priority
        })
      })

      if (response.ok) {
        const newTask = await response.json()
        // Convert date strings back to Date objects
        const taskWithDates = {
          ...newTask,
          date: new Date(newTask.date),
          createdAt: new Date(newTask.createdAt),
          updatedAt: new Date(newTask.updatedAt)
        }
        setTasks((prev) => [...prev, taskWithDates])
        setShowTaskForm(false)
        setSuccess("Task created successfully!")
        setTimeout(() => setSuccess(null), 3000)
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Failed to create task")
      }
    } catch (error) {
      console.error("Error creating task:", error)
      setError("Failed to connect to server")
    } finally {
      setIsSubmitting(false)
    }
  }

  const editTask = async (
    taskData: Omit<Task, "id" | "createdAt" | "updatedAt">
  ) => {
    if (!editingTask) return

    try {
      setIsSubmitting(true)
      setError(null)
      const response = await fetch(`/api/tasks/${editingTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: taskData.title,
          description: taskData.description,
          date: taskData.date.toISOString(),
          time: taskData.time,
          icon: taskData.icon,
          hashtags: taskData.hashtags,
          priority: taskData.priority
        })
      })

      if (response.ok) {
        const updatedTask = await response.json()
        // Convert date strings back to Date objects
        const taskWithDates = {
          ...updatedTask,
          date: new Date(updatedTask.date),
          createdAt: new Date(updatedTask.createdAt),
          updatedAt: new Date(updatedTask.updatedAt)
        }
        setTasks((prev) =>
          prev.map((task) =>
            task.id === editingTask.id ? taskWithDates : task
          )
        )
        setEditingTask(null)
        setSuccess("Task updated successfully!")
        setTimeout(() => setSuccess(null), 3000)
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Failed to update task")
      }
    } catch (error) {
      console.error("Error updating task:", error)
      setError("Failed to connect to server")
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      setError(null)
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updates)
      })

      if (response.ok) {
        const updatedTask = await response.json()
        // Convert date strings back to Date objects
        const taskWithDates = {
          ...updatedTask,
          date: new Date(updatedTask.date),
          createdAt: new Date(updatedTask.createdAt),
          updatedAt: new Date(updatedTask.updatedAt)
        }
        setTasks((prev) =>
          prev.map((task) => (task.id === id ? taskWithDates : task))
        )
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Failed to update task")
      }
    } catch (error) {
      console.error("Error updating task:", error)
      setError("Failed to connect to server")
    }
  }

  const deleteTask = async (id: string) => {
    try {
      setError(null)
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE"
      })

      if (response.ok) {
        setTasks((prev) => prev.filter((task) => task.id !== id))
        setSuccess("Task deleted successfully!")
        setTimeout(() => setSuccess(null), 3000)
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Failed to delete task")
      }
    } catch (error) {
      console.error("Error deleting task:", error)
      setError("Failed to connect to server")
    }
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setDateFilter(date)
    // Clear other filters when selecting a specific date
    setFilter("all")
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return null // Will redirect via useEffect
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
              <span className="text-sm text-gray-600">
                Welcome, {session?.user?.name || session?.user?.email}
              </span>
              <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="p-2 text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-600 cursor-pointer"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Success Display */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span>{success}</span>
              <button
                onClick={() => setSuccess(null)}
                className="text-green-400 hover:text-green-600 cursor-pointer"
              >
                ×
              </button>
            </div>
          </div>
        )}

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
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
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
                      className="w-64 pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm placeholder:text-gray-400"
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
            isLoading={isSubmitting}
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
            isLoading={isSubmitting}
          />
        )}
      </AnimatePresence>

      {/* Floating Add Task Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowTaskForm(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50 hover:bg-orange-600 cursor-pointer"
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </div>
  )
}
