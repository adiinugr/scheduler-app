"use client"

import { useMemo, useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  CheckCircle,
  Clock,
  Calendar,
  TrendingUp,
  Target,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Minus
} from "lucide-react"
import { Task } from "@/types/task"

interface TaskStatsProps {
  tasks: Task[]
}

export default function TaskStats({ tasks }: TaskStatsProps) {
  const [today, setToday] = useState<Date | null>(null)
  const [now, setNow] = useState<Date | null>(null)

  // Initialize dates on client side only
  useEffect(() => {
    setToday(new Date())
    setNow(new Date())
  }, [])

  const stats = useMemo(() => {
    if (!today || !now)
      return {
        total: 0,
        completed: 0,
        today: 0,
        upcoming: 0,
        completionRate: 0
      }

    const total = tasks.length
    const completed = tasks.filter((task) => task.completed).length
    const todayTasks = tasks.filter((task) => {
      return task.date.toDateString() === today.toDateString()
    }).length
    const upcoming = tasks.filter(
      (task) => task.date > now && !task.completed
    ).length
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

    return { total, completed, today: todayTasks, upcoming, completionRate }
  }, [tasks, today, now])

  const statItems = [
    {
      label: "Total Tasks",
      value: stats.total,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      label: "Today",
      value: stats.today,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      label: "Upcoming",
      value: stats.upcoming,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ]

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-section-header">Task Overview</h3>
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-gray-400" />
          <span className="text-small text-gray-500">Progress</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg border ${item.bgColor} ${item.borderColor} hover:shadow-sm transition-all duration-200`}
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className={`w-8 h-8 rounded-lg ${item.bgColor} border ${item.borderColor} flex items-center justify-center`}
              >
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {item.value}
              </span>
            </div>
            <p className="text-small text-gray-600">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Progress Section */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">
              Completion Rate
            </span>
          </div>
          <span className="text-lg font-bold text-gray-900">
            {stats.completionRate}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${stats.completionRate}%` }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full relative"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </motion.div>
        </div>

        {/* Progress Text */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500">
            {stats.completed} of {stats.total} tasks completed
          </span>
          <span className="text-xs text-gray-500">
            {stats.total - stats.completed} remaining
          </span>
        </div>
      </div>

      {/* Priority Overview */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-center gap-6">
          {/* High Priority */}
          <div className="relative group">
            <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <ArrowUp className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-semibold text-gray-700">
                {tasks.filter((t) => t.priority === "high").length}
              </span>
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              High Priority Tasks
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>

          {/* Medium Priority */}
          <div className="relative group">
            <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <Minus className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-gray-700">
                {tasks.filter((t) => t.priority === "medium").length}
              </span>
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              Medium Priority Tasks
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>

          {/* Low Priority */}
          <div className="relative group">
            <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <ArrowDown className="w-4 h-4 text-green-500" />
              <span className="text-sm font-semibold text-gray-700">
                {tasks.filter((t) => t.priority === "low").length}
              </span>
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              Low Priority Tasks
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
