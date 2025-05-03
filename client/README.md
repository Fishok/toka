# 🧩 Task & Project Dashboard (React + RTK Query + WebSocket)

This is a modern dashboard for managing **projects** and **tasks**, supporting real-time updates using **WebSockets** and **Redux Toolkit Query**.

✅ Built with Vite, Tailwind CSS, React 19, and RTK Query  
✅ Verified on **Node.js v20.12.0**, **npm v10.5.0**

---

## 📦 Tech Stack

| Tool              | Version      |
|-------------------|--------------|
| React             | ^19.0.0      |
| React Router DOM  | ^7.5.3       |
| Redux Toolkit     | ^2.7.0       |
| Tailwind CSS      | ^4.1.5       |
| Vite              | ^6.3.1       |
| ESLint (Airbnb)   | ^19.0.4      |
| Prettier          | ^3.5.3       |
| WebSocket (native)| -            |

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

Frontend will be available at:  
[http://localhost:5173](http://localhost:5173)

### 3. Start your WebSocket-compatible backend  
(e.g. Node.js + Express + express-ws at `localhost:3000/ws`)

---

## 💡 Features

✅ Create, update, and delete **Projects**  
✅ Manage **Tasks** tied to a specific project  
✅ Real-time WebSocket updates:
- `INSERT`, `UPDATE`, `DELETE` messages update the RTK Query cache instantly
✅ Dynamic routing via React Router v7:
- `/projects/:projectId` for task views
✅ Clean, responsive UI built with Tailwind CSS  
✅ Modal dialogs for form input  
✅ ESLint + Prettier + Airbnb config

---

## 🧠 Project Structure

```
src/
│
├── components/
│   └── dashboard/
│       ├── ProjectCard.jsx
│       ├── ProjectDialog.jsx
│       ├── Projects.jsx
│       ├── TaskCard.jsx
│       ├── TaskDialog.jsx
│       ├── Tasks.jsx
│
├── features/
│   └── api/
│       ├── projectsApi.js
│       └── tasksApi.js
│
├── hooks/
│   └── useWebSocket.js
│
├── routes/
│   └── index.jsx
│
├── App.jsx
└── main.jsx
```

---

## ✅ Scripts

| Script            | Description                |
|-------------------|--------------------------|
| `npm run dev`      | Start Vite dev server     |
| `npm run build`    | Build for production      |
| `npm run preview`  | Preview production build  |
| `npm run lint`     | Run ESLint                |
| `npm run lint:fix` | Auto-fix lint issues      |
| `npm run format`   | Run Prettier formatting   |

---

## 🧪 Compatibility

Tested on:

- **Node.js**: `v20.12.0`
- **npm**: `v10.5.0`
- **React**: `19.x`
- **React Router DOM**: `7.x`
- **Vite**: `6.x`
- **Tailwind**: `4.1.5`

---


