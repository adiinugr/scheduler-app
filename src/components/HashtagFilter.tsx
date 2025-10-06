"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Tag, X } from "lucide-react"
import { Task } from "@/types/task"
import clsx from "clsx"

interface HashtagFilterProps {
  tasks: Task[]
  selectedHashtags: string[]
  onHashtagToggle: (hashtags: string[]) => void
}

const hashtagColors = [
  "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300"
]

export default function HashtagFilter({
  tasks,
  selectedHashtags,
  onHashtagToggle
}: HashtagFilterProps) {
  const hashtags = useMemo(() => {
    const hashtagMap = new Map<string, { count: number; lastUsed: number }>()

    tasks.forEach((task) => {
      task.hashtags.forEach((hashtag) => {
        const existing = hashtagMap.get(hashtag)
        const taskTime = task.updatedAt.getTime()
        if (existing) {
          existing.count += 1
          // Update last used timestamp if this task is more recent
          if (taskTime > existing.lastUsed) {
            existing.lastUsed = taskTime
          }
        } else {
          hashtagMap.set(hashtag, { count: 1, lastUsed: taskTime })
        }
      })
    })

    return Array.from(hashtagMap.entries())
      .map(([name, data]) => ({
        name,
        count: data.count,
        lastUsed: data.lastUsed
      }))
      .sort((a, b) => b.lastUsed - a.lastUsed)
      .slice(0, 5) // Only show 5 latest hashtags
  }, [tasks])

  const toggleHashtag = (hashtag: string) => {
    if (selectedHashtags.includes(hashtag)) {
      onHashtagToggle(selectedHashtags.filter((tag) => tag !== hashtag))
    } else {
      onHashtagToggle([...selectedHashtags, hashtag])
    }
  }

  const clearAllHashtags = () => {
    onHashtagToggle([])
  }

  const getHashtagColor = (index: number) => {
    return hashtagColors[index % hashtagColors.length]
  }

  if (hashtags.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Tag className="w-5 h-5 mr-2" />
          Hashtags
        </h3>
        <p className="text-sm text-gray-500">
          No hashtags yet. Add hashtags to your tasks to see them here!
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <Tag className="w-5 h-5 mr-2" />
          Hashtags
        </h3>
        {selectedHashtags.length > 0 && (
          <button
            onClick={clearAllHashtags}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="max-h-48 overflow-y-auto space-y-2 scrollbar-hide">
        {hashtags.map((hashtag, index) => {
          const isSelected = selectedHashtags.includes(hashtag.name)

          return (
            <motion.button
              key={hashtag.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleHashtag(hashtag.name)}
              className={clsx(
                "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                isSelected
                  ? getHashtagColor(index)
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <div className="flex items-center space-x-2">
                <span>#{hashtag.name}</span>
                <span
                  className={clsx(
                    "text-xs px-2 py-0.5 rounded-full",
                    isSelected ? "bg-white/50" : "bg-gray-200 text-gray-600"
                  )}
                >
                  {hashtag.count}
                </span>
              </div>
              {isSelected && <X className="w-3 h-3" />}
            </motion.button>
          )
        })}
      </div>

      {selectedHashtags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-blue-50 rounded-lg"
        >
          <p className="text-xs text-blue-700">
            Filtering by: {selectedHashtags.map((tag) => `#${tag}`).join(", ")}
          </p>
        </motion.div>
      )}
    </div>
  )
}
