"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckCircle,
  Circle,
  Flag,
  MoreVertical,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react"
import { Task } from "@/types/task"
import clsx from "clsx"

interface TaskCardProps {
  task: Task
  onUpdate: (id: string, updates: Partial<Task>) => void
  onDelete: (id: string) => void
  onEdit: (task: Task) => void
}

// const priorityColors = {
//   low: "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30",
//   medium:
//     "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30",
//   high: "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30"
// }

const hashtagColors = [
  "bg-blue-100 text-blue-900 border border-blue-200",
  "bg-purple-100 text-purple-900 border border-purple-200",
  "bg-pink-100 text-pink-900 border border-pink-200",
  "bg-green-100 text-green-900 border border-green-200",
  "bg-orange-100 text-orange-900 border border-orange-200",
  "bg-indigo-100 text-indigo-900 border border-indigo-200"
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
            className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200 mt-0.5 cursor-pointer"
          >
            {task.completed ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-500 hover:text-gray-600" />
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
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            <MoreVertical className="w-4 h-4 text-gray-700" />
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
                  className="w-full px-3 py-2 text-left text-sm text-gray-900 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                >
                  <span>Edit</span>
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full px-3 py-2 text-left text-sm text-red-700 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
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

      {/* Hashtags */}
      {task.hashtags && task.hashtags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3 ml-11">
          {task.hashtags.map((hashtag, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs rounded-full ${
                hashtagColors[index % hashtagColors.length]
              }`}
            >
              #{hashtag}
            </span>
          ))}
        </div>
      )}

      {/* Priority Icon */}
      {task.priority && (
        <div className="mt-3 ml-11">
          <div className="flex items-center gap-2">
            {task.priority === "high" && (
              <div className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full border border-red-200">
                <ArrowUp className="w-3 h-3" />
                <span className="text-xs font-medium">High</span>
              </div>
            )}
            {task.priority === "low" && (
              <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full border border-green-200">
                <ArrowDown className="w-3 h-3" />
                <span className="text-xs font-medium">Low</span>
              </div>
            )}
            {task.priority === "medium" && (
              <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full border border-blue-200">
                <Minus className="w-3 h-3" />
                <span className="text-xs font-medium">Medium</span>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  )
}
