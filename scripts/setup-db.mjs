#!/usr/bin/env node

import { execSync } from "child_process"
import fs from "fs"
import path from "path"

console.log("🚀 Setting up Scheduler App database...\n")

// Check if .env file exists
const envPath = path.join(process.cwd(), ".env")
if (!fs.existsSync(envPath)) {
  console.log("❌ .env file not found!")
  console.log("Please create a .env file with your database credentials.")
  console.log("See SETUP.md for instructions.\n")
  process.exit(1)
}

try {
  console.log("📦 Generating Prisma client...")
  execSync("npx prisma generate", { stdio: "inherit" })

  console.log("\n🗄️  Pushing database schema...")
  execSync("npx prisma db push", { stdio: "inherit" })

  console.log("\n✅ Database setup complete!")
  console.log("\n🎉 You can now start the development server with:")
  console.log("   npm run dev")
  console.log("\n📊 To view your database, run:")
  console.log("   npx prisma studio")
} catch (error) {
  console.error("\n❌ Database setup failed:", error.message)
  console.log("\nPlease check your DATABASE_URL in the .env file.")
  process.exit(1)
}
