"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Circle, Flag, MoreVertical } from "lucide-react"
import { Task } from "@/types/task"
import clsx from "clsx"

interface TaskCardProps {
  task: Task
  onUpdate: (id: string, updates: Partial<Task>) => void
  onDelete: (id: string) => void
  onEdit: (task: Task) => void
}

const priorityColors = {
  low: "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30",
  medium:
    "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30",
  high: "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30"
}

const hashtagColors = [
  "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
]

export default function TaskCard({
  task,
  onUpdate,
  onDelete,
  onEdit
}: TaskCardProps) {
  const [showActions, setShowActions] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleToggleComplete = () => {
    onUpdate(task.id, { completed: !task.completed })
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    setTimeout(() => {
      onDelete(task.id)
    }, 200)
  }

  const handleEdit = () => {
    onEdit(task)
    setShowActions(false)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: isDeleting ? 0 : 1,
        y: isDeleting ? -50 : 0
      }}
      exit={{ opacity: 0, y: -50 }}
      transition={{
        duration: 0.4,
        ease: "easeOut"
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      className={clsx(
        "bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-200 mb-3 group relative",
        task.completed && "opacity-60"
      )}
    >
      {/* Header with title and actions */}
      <div className="flex items-start justify-between mb-3">
        {/* Checkbox, Icon, and Title */}
        <div className="flex items-start gap-3 flex-1">
          <motion.button
            onClick={handleToggleComplete}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200 mt-0.5"
          >
            {task.completed ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-300 hover:text-gray-400" />
            )}
          </motion.button>

          {/* Task Icon */}
          {task.icon && (
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-lg mt-0.5">
              {task.icon}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3
                className={clsx(
                  "text-card-title",
                  task.completed && "line-through"
                )}
              >
                {task.title}
              </h3>

              {/* Priority Flag */}
              {task.priority === "high" && (
                <Flag className="w-4 h-4 text-orange-500 flex-shrink-0" />
              )}
            </div>
          </div>
        </div>

        {/* Three Dots Menu */}
        <div className="relative">
          <motion.button
            onClick={() => setShowActions(!showActions)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </motion.button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {showActions && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-[120px]"
              >
                <button
                  onClick={handleEdit}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <span>Edit</span>
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <span>Delete</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-body line-clamp-2 ml-11">{task.description}</p>
      )}
    </motion.div>
  )
}
