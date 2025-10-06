"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Calendar,
  Clock,
  Tag,
  Star,
  Plus,
  AlertTriangle,
  Minus,
  ArrowDown,
  ArrowUp
} from "lucide-react"
import { TaskFormData, Task } from "@/types/task"
import { format } from "date-fns"

interface TaskFormProps {
  onClose: () => void
  onSubmit: (task: Omit<TaskFormData, "id" | "createdAt" | "updatedAt">) => void
  initialDate?: Date
  initialData?: Task
}

const icons = [
  "📝",
  "💼",
  "🏠",
  "🎯",
  "📚",
  "💡",
  "🎨",
  "🏃",
  "🍽️",
  "🛒",
  "📞",
  "✈️",
  "🎉",
  "💊",
  "💰",
  "🔧",
  "📊",
  "🎮",
  "🎵",
  "📱",
  "💻",
  "📷",
  "🎬",
  "🏆",
  "🌟",
  "❤️",
  "⚡",
  "🔒",
  "📈",
  "🎭",
  "🍕",
  "☕"
]

const hashtagColors = [
  "bg-blue-50 text-blue-700 border-blue-200",
  "bg-purple-50 text-purple-700 border-purple-200",
  "bg-pink-50 text-pink-700 border-pink-200",
  "bg-green-50 text-green-700 border-green-200",
  "bg-orange-50 text-orange-700 border-orange-200",
  "bg-indigo-50 text-indigo-700 border-indigo-200"
]

const priorityOptions = [
  {
    value: "low" as const,
    label: "Low Priority",
    icon: ArrowDown,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  {
    value: "medium" as const,
    label: "Medium Priority",
    icon: Minus,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    value: "high" as const,
    label: "High Priority",
    icon: ArrowUp,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200"
  }
]

export default function TaskForm({
  onClose,
  onSubmit,
  initialDate = new Date(),
  initialData
}: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    date: initialData?.date || initialDate,
    time: initialData?.time || "",
    icon: initialData?.icon || "",
    hashtags: initialData?.hashtags || [],
    priority: initialData?.priority || "medium"
  })

  const [newHashtag, setNewHashtag] = useState("")
  const [showIconPicker, setShowIconPicker] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    onSubmit({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      hashtags: formData.hashtags.filter((tag) => tag.trim())
    })

    onClose()
  }

  const addHashtag = () => {
    if (newHashtag.trim() && !formData.hashtags.includes(newHashtag.trim())) {
      setFormData((prev) => ({
        ...prev,
        hashtags: [...prev.hashtags, newHashtag.trim()]
      }))
      setNewHashtag("")
    }
  }

  const removeHashtag = (hashtag: string) => {
    setFormData((prev) => ({
      ...prev,
      hashtags: prev.hashtags.filter((tag) => tag !== hashtag)
    }))
  }

  const getHashtagColor = (index: number) => {
    return hashtagColors[index % hashtagColors.length]
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-section-header">
                {initialData ? "Edit Task" : "Create New Task"}
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Task Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="What needs to be done?"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value
                    }))
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 resize-none text-gray-900 placeholder-gray-500"
                  rows={3}
                  placeholder="Add more details about this task..."
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Date
                  </label>
                  <input
                    type="date"
                    value={format(formData.date, "yyyy-MM-dd")}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        date: new Date(e.target.value)
                      }))
                    }
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Time (optional)
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, time: e.target.value }))
                    }
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-900"
                  />
                </div>
              </div>

              {/* Icon Picker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Task Icon
                </label>

                <div className="flex items-center gap-4">
                  {/* Current Icon Display */}
                  {formData.icon && (
                    <div className="w-12 h-12 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-2xl">
                      {formData.icon}
                    </div>
                  )}

                  {/* Icon Picker Button */}
                  <button
                    type="button"
                    onClick={() => setShowIconPicker(!showIconPicker)}
                    className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium"
                  >
                    {formData.icon ? "Change Icon" : "Choose Icon"}
                  </button>

                  {/* Remove Icon Button */}
                  {formData.icon && (
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, icon: "" }))
                      }
                      className="px-3 py-2 text-gray-500 hover:text-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {/* Icon Picker Grid */}
                <AnimatePresence>
                  {showIconPicker && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="grid grid-cols-8 gap-2">
                        {icons.map((icon) => (
                          <button
                            key={icon}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, icon }))
                              setShowIconPicker(false)
                            }}
                            className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-xl transition-all duration-200 ${
                              formData.icon === icon
                                ? "border-orange-500 bg-orange-50"
                                : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {icon}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Priority Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {priorityOptions.map((option) => {
                    const isSelected = formData.priority === option.value
                    const Icon = option.icon

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            priority: option.value
                          }))
                        }
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                          isSelected
                            ? `${option.bgColor} ${option.borderColor} border-opacity-100`
                            : "bg-white border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Icon
                            className={`w-5 h-5 ${
                              isSelected ? option.color : "text-gray-400"
                            }`}
                          />
                          <span
                            className={`text-sm font-medium ${
                              isSelected ? option.color : "text-gray-600"
                            }`}
                          >
                            {option.label}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Hashtags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Tag className="w-4 h-4 inline mr-2" />
                  Tags
                </label>

                {/* Selected Hashtags */}
                {formData.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.hashtags.map((hashtag, index) => (
                      <span
                        key={hashtag}
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${getHashtagColor(
                          index
                        )} flex items-center space-x-2`}
                      >
                        <span>#{hashtag}</span>
                        <button
                          type="button"
                          onClick={() => removeHashtag(hashtag)}
                          className="text-xs hover:text-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Add Hashtag Input */}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newHashtag}
                    onChange={(e) => setNewHashtag(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addHashtag())
                    }
                    className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Add a tag..."
                  />
                  <button
                    type="button"
                    onClick={addHashtag}
                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 border border-gray-200 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {initialData ? "Update Task" : "Create Task"}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
