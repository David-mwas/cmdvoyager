import mongoose from "mongoose";


import dotenv from "dotenv";
import { Command } from '../models/command.model.js';
dotenv.config();

const commands = [
  // ========================
  // 🟢 GIT
  // ========================
  {
    title: "Undo last commit (keep changes)",
    command: "git reset --soft HEAD~1",
    description: "Undo last commit but keep changes staged.",
    tags: ["git", "undo"],
    category: "Git",
  },
  {
    title: "Undo last commit (discard changes)",
    command: "git reset --hard HEAD~1",
    description: "Undo last commit and discard changes.",
    tags: ["git", "danger"],
    category: "Git",
  },
  {
    title: "Amend last commit",
    command: "git commit --amend",
    description: "Modify last commit message or add changes.",
    tags: ["git"],
    category: "Git",
  },
  {
    title: "View commit graph",
    command: "git log --oneline --graph --decorate --all",
    tags: ["git", "log"],
    category: "Git",
  },

  // ========================
  // 🐳 DOCKER
  // ========================
  {
    title: "List containers",
    command: "docker ps -a",
    tags: ["docker"],
    category: "Docker",
  },
  {
    title: "Remove stopped containers",
    command: "docker container prune -f",
    tags: ["docker", "cleanup"],
    category: "Docker",
  },
  {
    title: "Build docker image",
    command: "docker build -t myapp .",
    tags: ["docker", "build"],
    category: "Docker",
  },
  {
    title: "Run container",
    command: "docker run -p 3000:3000 myapp",
    tags: ["docker", "run"],
    category: "Docker",
  },

  // ========================
  // 🐧 LINUX
  // ========================
  {
    title: "Find files by name",
    command: 'find . -type f -name "*.log"',
    tags: ["linux", "search"],
    category: "Linux",
  },
  {
    title: "Kill process on port",
    command: "lsof -ti:3000 | xargs kill -9",
    tags: ["linux", "process"],
    category: "Linux",
  },
  {
    title: "Disk usage",
    command: "du -sh */ | sort -h",
    tags: ["linux", "disk"],
    category: "Linux",
  },
  {
    title: "Check running processes",
    command: "ps aux | grep node",
    tags: ["linux"],
    category: "Linux",
  },

  // ========================
  // 🟡 NODE / NPM
  // ========================
  {
    title: "Install dependencies",
    command: "npm install",
    tags: ["npm"],
    category: "NPM",
  },
  {
    title: "Run dev server",
    command: "npm run dev",
    tags: ["npm"],
    category: "NPM",
  },
  {
    title: "Clean npm cache",
    command: "npm cache clean --force",
    tags: ["npm", "cache"],
    category: "NPM",
  },
  {
    title: "Install global package",
    command: "npm install -g <package>",
    tags: ["npm"],
    category: "NPM",
  },

  // ========================
  // 🐘 PHP / LARAVEL
  // ========================
  {
    title: "Serve Laravel app",
    command: "php artisan serve",
    tags: ["laravel", "php"],
    category: "Laravel",
  },
  {
    title: "Run migrations",
    command: "php artisan migrate",
    tags: ["laravel", "db"],
    category: "Laravel",
  },
  {
    title: "Fresh migration with seed",
    command: "php artisan migrate:fresh --seed",
    tags: ["laravel", "db"],
    category: "Laravel",
  },
  {
    title: "Create controller",
    command: "php artisan make:controller UserController",
    tags: ["laravel"],
    category: "Laravel",
  },
  {
    title: "Create model with migration",
    command: "php artisan make:model Post -m",
    tags: ["laravel"],
    category: "Laravel",
  },
  {
    title: "Clear cache",
    command: "php artisan optimize:clear",
    tags: ["laravel", "cache"],
    category: "Laravel",
  },

  // ========================
  // 🗄 DATABASE
  // ========================
  {
    title: "MongoDB shell",
    command: "mongosh",
    tags: ["mongodb"],
    category: "Database",
  },
  {
    title: "Export MongoDB",
    command: "mongodump --db mydb",
    tags: ["mongodb"],
    category: "Database",
  },
  {
    title: "Import MongoDB",
    command: "mongorestore --db mydb dump/",
    tags: ["mongodb"],
    category: "Database",
  },

  // ========================
  // ⚡ GENERAL DEV
  // ========================
  {
    title: "Check port usage",
    command: "netstat -tulnp | grep 3000",
    tags: ["network"],
    category: "General",
  },
  {
    title: "Generate SSH key",
    command: 'ssh-keygen -t rsa -b 4096 -C "your_email@example.com"',
    tags: ["ssh"],
    category: "General",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("🧹 Clearing old commands...");
    await Command.deleteMany();

    const enriched = commands.map((cmd) => ({
      ...cmd,
      usageCount: Math.floor(Math.random() * 50),
      isFavorite: Math.random() > 0.7,
      difficulty: ["beginner", "intermediate", "advanced"][
        Math.floor(Math.random() * 3)
      ],
      lastUsedAt: new Date(),
    }));

    await Command.insertMany(enriched);

    console.log("🌱 Commands seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
