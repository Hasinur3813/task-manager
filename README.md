# 📌 TaskFlow - Task Management App

TaskFlow is a modern task management app designed to help users organize their tasks efficiently. It features an intuitive **drag-and-drop** interface, **real-time synchronization**, **dark mode support**, and **Google authentication**.

## 🔗 Live Demo

[Live Site](https://task-manager-38.web.app)

---

## 🚀 Key Features

✅ **Google Authentication** - Secure login using Firebase Authentication.  
✅ **Drag and Drop** - Easily rearrange tasks using `@hello-pangea/dnd`.  
✅ **Task Management** - Organize tasks with categories, deadlines, and statuses.  
✅ **Real-time Updates** - Sync tasks across multiple devices with `socket.io-client`.  
✅ **Dark Mode Support** - Toggle between light and dark themes, stored in local storage.  
✅ **Form Handling** - Efficient form validation using `react-hook-form`.  
✅ **Optimized Performance** - API caching and state management with `@tanstack/react-query`.  
✅ **Responsive UI** - Built with Tailwind CSS and Framer Motion for smooth animations.

---

## 📦 Dependencies

Before running the project, ensure you have **Node.js** and **npm** installed.

### Main Dependencies:

- **`@hello-pangea/dnd`** - Drag-and-drop functionality
- **`@tanstack/react-query`** - Efficient API data fetching and caching
- **`axios`** - For making API requests
- **`firebase`** - Authentication and database services
- **`framer-motion`** - Animations
- **`react-hook-form`** - Form validation and handling
- **`react-hot-toast`** - Notifications
- **`react-icons`** - Icon library
- **`react-router-dom`** - Client-side routing
- **`socket.io-client`** - Real-time updates
- **`tailwindcss`** - Utility-first CSS framework

---

## 🛠️ Technologies Used

### Frontend:

- **React 19** - Component-based UI framework
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Router** - Navigation system
- **React Hook Form** - Form validation
- **React Query** - State management and API caching
- **Socket.io Client** - Real-time data synchronization

### Backend (If applicable):

- **Node.js** - JavaScript runtime
- **Express.js** - Backend framework
- **MongoDB Atlas** - Cloud database
- **Firebase Authentication** - Secure user authentication

---

## 🛠️ Installation

To set up the project locally, follow these steps:

```sh
# 1️⃣ Clone the Repository
git clone https://github.com/Hasinur3813/task-manager.git

# 2️⃣ Navigate to the Project Directory
cd task-manager

# 3️⃣ Install Dependencies
npm install

# 4️⃣ Set Up Firebase Authentication
# Create a Firebase Project at https://console.firebase.google.com/
# Enable Google Authentication under Firebase Authentication settings
# Add Firebase Credentials to a .env file at the root of the project

# Create a .env file and add the following:
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=your_api_base_url

# 5️⃣ Run the Project
npm run dev

# 6️⃣ Open in Browser
# Visit: http://localhost:5173/
```
