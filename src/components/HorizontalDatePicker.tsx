"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react"
import {
  format,
  addDays,
  subDays,
  isSameDay,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval
} from "date-fns"
import { Task } from "@/types/task"
import clsx from "clsx"

interface HorizontalDatePickerProps {
  selectedDate: Date
  onDateChange: (date: Date) => void
  tasks: Task[]
}

export default function HorizontalDatePicker({
  selectedDate,
  onDateChange,
  tasks
}: HorizontalDatePickerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentWeek, setCurrentWeek] = useState(selectedDate)
  const [today, setToday] = useState<Date | null>(null)

  // Generate dates for the current week
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 }) // Monday
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 })
  const weekDates = eachDayOfInterval({ start: weekStart, end: weekEnd })

  // Get tasks for a specific date
  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => isSameDay(task.date, date))
  }

  // Get task indicators (colored dots) for a date
  const getTaskIndicators = (date: Date) => {
    const dateTasks = getTasksForDate(date)
    const indicators = []

    // Group tasks by priority for different colors
    const highPriority = dateTasks.filter((task) => task.priority === "high")
    const mediumPriority = dateTasks.filter(
      (task) => task.priority === "medium"
    )
    const lowPriority = dateTasks.filter((task) => task.priority === "low")

    // Add indicators based on priority with Zrbroder colors
    if (highPriority.length > 0) {
      indicators.push({ color: "bg-orange-500", count: highPriority.length })
    }
    if (mediumPriority.length > 0) {
      indicators.push({ color: "bg-blue-500", count: mediumPriority.length })
    }
    if (lowPriority.length > 0) {
      indicators.push({ color: "bg-green-500", count: lowPriority.length })
    }

    return indicators
  }

  const scrollToDate = (date: Date) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const dateElement = container.querySelector(
        `[data-date="${format(date, "yyyy-MM-dd")}"]`
      )
      if (dateElement) {
        dateElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        })
      }
    }
  }

  const goToPreviousWeek = () => {
    const newWeek = subDays(currentWeek, 7)
    setCurrentWeek(newWeek)
  }

  const goToNextWeek = () => {
    const newWeek = addDays(currentWeek, 7)
    setCurrentWeek(newWeek)
  }

  const goToToday = () => {
    if (today) {
      setCurrentWeek(today)
      onDateChange(today)
      scrollToDate(today)
    }
  }

  // Initialize today on client side only
  useEffect(() => {
    setToday(new Date())
  }, [])

  // Auto-scroll to selected date when it changes
  useEffect(() => {
    scrollToDate(selectedDate)
  }, [selectedDate])

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <h3 className="text-section-header">
              {format(currentWeek, "MMMM yyyy")}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousWeek}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goToToday}
            className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
          >
            Today
          </button>
          <button
            onClick={goToNextWeek}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-3 mb-3">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="text-center">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* Date Grid */}
      <div className="relative">
        <div ref={scrollContainerRef} className="grid grid-cols-7 gap-3">
          {weekDates.map((date) => {
            const isSelected = isSameDay(date, selectedDate)
            const isTodayDate = today ? isSameDay(date, today) : false
            const taskIndicators = getTaskIndicators(date)
            const hasTasks = taskIndicators.length > 0
            const taskCount = getTasksForDate(date).length

            return (
              <motion.button
                key={date.toISOString()}
                data-date={format(date, "yyyy-MM-dd")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onDateChange(date)}
                className={clsx(
                  "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all duration-200 w-full min-h-[80px]",
                  isSelected
                    ? "border-orange-500 bg-orange-50 shadow-md"
                    : isTodayDate
                    ? "border-orange-200 bg-orange-50/50 hover:border-orange-300"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                )}
              >
                {/* Date Number */}
                <span
                  className={clsx(
                    "text-lg font-bold",
                    isSelected
                      ? "text-orange-700"
                      : isTodayDate
                      ? "text-orange-600"
                      : "text-gray-900"
                  )}
                >
                  {format(date, "d")}
                </span>

                {/* Task Indicators */}
                {hasTasks && (
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex space-x-1">
                      {taskIndicators.slice(0, 3).map((indicator, index) => (
                        <div
                          key={index}
                          className={clsx(
                            "w-2 h-2 rounded-full",
                            indicator.color
                          )}
                          title={`${indicator.count} ${
                            indicator.color.includes("orange")
                              ? "high"
                              : indicator.color.includes("blue")
                              ? "medium"
                              : "low"
                          } priority tasks`}
                        />
                      ))}
                      {taskIndicators.length > 3 && (
                        <div className="w-2 h-2 rounded-full bg-gray-400" />
                      )}
                    </div>
                    <span className="text-xs font-medium text-gray-600">
                      {taskCount} task{taskCount !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Selected Date Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-gray-500" />
            <div>
              <span className="text-sm text-gray-600">Selected Date:</span>
              <span className="ml-2 font-medium text-gray-900">
                {format(selectedDate, "EEEE, MMMM d, yyyy")}
              </span>
            </div>
          </div>

          {getTasksForDate(selectedDate).length > 0 && (
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                {getTasksForDate(selectedDate).length} task
                {getTasksForDate(selectedDate).length !== 1 ? "s" : ""}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
