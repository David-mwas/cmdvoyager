# 🚀 CmdVoyager

> Your personal command galaxy — store, search, and reuse terminal commands across tech stacks.

CmdVoyager is a gamified developer tool that helps you save frequently used CLI commands (Git, Docker, Linux, Laravel, etc.) so you never have to Google the same thing twice.

---

## ✨ Features

* 🧠 Save and organize terminal commands
* 🔎 Fast search and tag-based filtering
* ⭐ Favorite frequently used commands
* 📊 Usage tracking (most used, recent)
<!-- * 🎮 XP system (gamified experience) -->
* 🛑 Duplicate command prevention
* 🔐 API key-based backend protection
* 🌌 Modern space-themed UI (React + Tailwind)

---

## 🧱 Tech Stack

### Frontend

* React (Vite)
* TanStack Query
* TanStack Router
* TailwindCSS

### Backend

* Node.js + Express
* MongoDB + Mongoose
* API Key Authentication

---

## 📁 Project Structure

```
cmdvoyager/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── lib/
│   │   └── pages/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── middleware/
│
└── README.md
```

---

## ⚙️ Setup

### 1. Clone repo

```bash
git clone https://github.com/your-username/cmdvoyager.git
cd cmdvoyager
```

---

## 🔌 Backend Setup

```bash
cd backend
npm install
```

### Create `.env`

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/cmdvoyager
API_KEY=
```

### Run backend

```bash
npm run dev
```

---

## 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌱 Seed Database

```bash
npm run seed
```

Seeds commands for:

* Git
* Docker
* Linux
* NPM
* Laravel
* Database tools

---

## 🔐 API Authentication

All requests require an API key.

### Header:

```
x-api-key: cmdvoyager-secret-key
```

---

## 📡 API Endpoints

### Commands

```
GET    /api/commands
POST   /api/commands
GET    /api/commands/:id
PATCH  /api/commands/:id
DELETE /api/commands/:id
```

### Interactions

```
POST /api/commands/:id/interact
```

#### Body:

```json
{
  "type": "copy" | "favorite"
}
```

<!-- ---

## 🎮 XP System

* +2 XP → Copy command
* +1 XP → Favorite toggle
* XP stored in database
* Used for gamification (levels, progress) -->

---

## 🚫 Duplicate Prevention

Commands are unique by `command` field.

* Backend enforces uniqueness
* Prevents redundant entries

---

## 🧪 Example Request

```bash
curl -X POST http://localhost:5000/api/commands \
  -H "Content-Type: application/json" \
  -H "x-api-key: cmdvoyager-secret-key" \
  -d '{
    "title": "Run dev server",
    "command": "npm run dev",
    "tags": ["npm"],
    "category": "NPM"
  }'
```

---

## 📊 Roadmap

<!-- * [ ] User authentication (JWT) -->
* [ ] Command sharing (public library)
* [ ] AI command explanation
* [ ] Command versioning/history
* [ ] Import/export commands
* [ ] Mobile support

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first.

---

## 📄 License

MIT License

---

## 🧠 Author

Built by a developer tired of Googling the same commands 😄

---

## 🌌 Inspiration

> “Every developer has a command history. CmdVoyager makes it permanent.”
