export interface Task {
  id: string
  title: string
  description?: string
  date: Date
  time?: string
  completed: boolean
  icon?: string
  hashtags: string[]
  priority: "low" | "medium" | "high"
  createdAt: Date
  updatedAt: Date
}

export interface Hashtag {
  name: string
  color: string
  count: number
}

export type TaskFilter = "all" | "today" | "upcoming" | "completed"

export interface TaskFormData {
  title: string
  description: string
  date: Date
  time: string
  icon: string
  hashtags: string[]
  priority: "low" | "medium" | "high"
}
