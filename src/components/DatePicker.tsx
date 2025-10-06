"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths
} from "date-fns"
import clsx from "clsx"

interface DatePickerProps {
  selectedDate: Date
  onDateChange: (date: Date) => void
}

export default function DatePicker({
  selectedDate,
  onDateChange
}: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Get days from previous month to fill the grid
  const startDate = new Date(monthStart)
  startDate.setDate(startDate.getDate() - monthStart.getDay())

  const endDate = new Date(monthEnd)
  endDate.setDate(endDate.getDate() + (6 - monthEnd.getDay()))

  const allDays = eachDayOfInterval({ start: startDate, end: endDate })

  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentMonth(today)
    onDateChange(today)
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-slate-500" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {format(currentMonth, "MMMM yyyy")}
          </h3>
        </div>

        <button
          onClick={goToNextMonth}
          className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Today Button */}
      <button
        onClick={goToToday}
        className="w-full mb-4 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
      >
        Today
      </button>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-slate-500 dark:text-slate-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {allDays.map((day) => {
          const isCurrentMonth = isSameMonth(day, currentMonth)
          const isSelected = isSameDay(day, selectedDate)
          const isToday = isSameDay(day, new Date())

          return (
            <motion.button
              key={day.toISOString()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDateChange(day)}
              className={clsx(
                "w-8 h-8 text-sm rounded-lg transition-all duration-200 flex items-center justify-center",
                isCurrentMonth
                  ? "text-slate-900 dark:text-slate-100"
                  : "text-slate-400 dark:text-slate-500",
                isSelected
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : isToday
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold"
                  : "hover:bg-slate-100 dark:hover:bg-slate-700"
              )}
            >
              {format(day, "d")}
            </motion.button>
          )
        })}
      </div>

      {/* Selected Date Info */}
      <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Selected:{" "}
          <span className="font-medium text-slate-900 dark:text-slate-100">
            {format(selectedDate, "EEEE, MMMM d, yyyy")}
          </span>
        </div>
      </div>
    </div>
  )
}
