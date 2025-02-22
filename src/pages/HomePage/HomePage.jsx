import { motion } from "framer-motion";
import { FaSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa6";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);

  const features = [
    {
      title: "Drag and Drop",
      description: "Easily manage tasks with a simple drag-and-drop interface.",
      icon: "🖱️",
    },
    {
      title: "Categorized Tasks",
      description: "Organize your tasks efficiently into different categories.",
      icon: "📂",
    },
    {
      title: "Responsive Design",
      description: "Enjoy a seamless experience across all devices.",
      icon: "📱",
    },
    {
      title: "Real-time Sync",
      description: "Stay updated with real-time task synchronization.",
      icon: "🔄",
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Header with Dark Mode Toggle */}
      <header className="p-4 flex justify-between items-center mx-auto">
        <h1 className="text-2xl font-bold">TaskFlow</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? (
            <FaSun className="text-xl" />
          ) : (
            <FaMoon className="text-xl" />
          )}
        </button>
      </header>

      {/* Banner Section */}
      <section className="text-center py-42 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <motion.h1
          className="text-4xl md:text-5xl max-w-4xl mx-auto font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Supercharge Your Productivity with TaskFlow
        </motion.h1>
        <p className="text-lg mb-6 max-w-4xl mx-auto">
          Effortlessly manage, organize, and track your tasks in real-time.
          Simplify your workflow with intuitive drag-and-drop, smart
          categorization, and seamless synchronization. Get started today
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link to={"/login"}>
            <button className="px-6 py-2 text-lg font-semibold bg-white text-gray-900 hover:bg-gray-200">
              Get Started
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20  mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-10">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div
                className={`p-6 shadow-xl h-full rounded-2xl transition-transform hover:scale-105 ${
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <span className="text-5xl mb-4">{feature.icon}</span>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
