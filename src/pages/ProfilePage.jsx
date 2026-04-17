import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import events from "../data/events.json";

export default function ProfilePage({ user, setUser, registeredEvents = [] }) {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(user);
  const [activeTab, setActiveTab] = useState("details");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(form);
    localStorage.setItem("user", JSON.stringify(form));
    setEdit(false);
  };

  const today = new Date().toISOString().split("T")[0];

  // Get registered events (upcoming) - Only events user registered for + haven't happened yet
  const upcomingRegisteredEvents = events.filter(event => 
    registeredEvents.includes(event.id) && event.date >= today
  );

  // Get completed events (past) - Only events user registered for + have already happened
  const pastRegisteredEvents = events.filter(event => 
    registeredEvents.includes(event.id) && event.date < today
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4">

        {/* Tabs Navigation */}
        <div className="flex gap-4 mb-8 justify-center flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("details")}
            className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
              activeTab === "details"
                ? "bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-lg shadow-indigo-500/50"
                : "bg-white/10 text-slate-300 border border-white/20 hover:bg-white/20"
            }`}
          >
            👤 Profile Details
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("registered")}
            className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
              activeTab === "registered"
                ? "bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-lg shadow-indigo-500/50"
                : "bg-white/10 text-slate-300 border border-white/20 hover:bg-white/20"
            }`}
          >
            📅 Registered Events ({upcomingRegisteredEvents.length})
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("completed")}
            className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
              activeTab === "completed"
                ? "bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-lg shadow-indigo-500/50"
                : "bg-white/10 text-slate-300 border border-white/20 hover:bg-white/20"
            }`}
          >
            🎉 Completed Events ({pastRegisteredEvents.length})
          </motion.button>
        </div>

        {/* TAB 1: Profile Details */}
        {activeTab === "details" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-indigo-500/10 to-pink-500/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full text-white border border-indigo-400/30"
          >

            <h2 className="text-4xl font-black mb-8 text-center bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
              My Profile
            </h2>

            {/* Name */}
            <div className="mb-5">
              <label className="block text-sm font-bold text-indigo-300 mb-2">👤 Name</label>
              <input
                name="name"
                value={form.name}
                disabled={!edit}
                onChange={handleChange}
                className={`w-full p-4 rounded-xl text-white font-semibold transition-all duration-300 border-2 ${
                  !edit
                    ? "bg-white/10 border-indigo-400/30 cursor-not-allowed"
                    : "bg-indigo-500/30 border-indigo-400/60 focus:ring-2 focus:ring-indigo-400 outline-none"
                }`}
              />
            </div>

            {/* Roll */}
            <div className="mb-5">
              <label className="block text-sm font-bold text-indigo-300 mb-2">🎓 Roll Number</label>
              <input
                name="roll"
                value={form.roll}
                disabled={!edit}
                onChange={handleChange}
                className={`w-full p-4 rounded-xl text-white font-semibold transition-all duration-300 border-2 ${
                  !edit
                    ? "bg-white/10 border-purple-400/30 cursor-not-allowed"
                    : "bg-purple-500/30 border-purple-400/60 focus:ring-2 focus:ring-purple-400 outline-none"
                }`}
              />
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm font-bold text-pink-300 mb-2">📧 Email</label>
              <input
                name="email"
                value={form.email}
                disabled={!edit}
                onChange={handleChange}
                className={`w-full p-4 rounded-xl text-white font-semibold transition-all duration-300 border-2 ${
                  !edit
                    ? "bg-white/10 border-pink-400/30 cursor-not-allowed"
                    : "bg-pink-500/30 border-pink-400/60 focus:ring-2 focus:ring-pink-400 outline-none"
                }`}
              />
            </div>

            {/* Branch */}
            <div className="mb-5">
              <label className="block text-sm font-bold text-cyan-300 mb-2">🏢 Branch</label>
              <input
                name="branch"
                value={form.branch}
                disabled={!edit}
                onChange={handleChange}
                className={`w-full p-4 rounded-xl text-white font-semibold transition-all duration-300 border-2 ${
                  !edit
                    ? "bg-white/10 border-cyan-400/30 cursor-not-allowed"
                    : "bg-cyan-500/30 border-cyan-400/60 focus:ring-2 focus:ring-cyan-400 outline-none"
                }`}
              />
            </div>

            {/* Year */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-orange-300 mb-2">📅 Year</label>
              <input
                name="year"
                value={form.year}
                disabled={!edit}
                onChange={handleChange}
                className={`w-full p-4 rounded-xl text-white font-semibold transition-all duration-300 border-2 ${
                  !edit
                    ? "bg-white/10 border-orange-400/30 cursor-not-allowed"
                    : "bg-orange-500/30 border-orange-400/60 focus:ring-2 focus:ring-orange-400 outline-none"
                }`}
              />
            </div>

            {/* Buttons */}
            {!edit ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setEdit(true)}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
              >
                ✏️ Edit Profile
              </motion.button>
            ) : (
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="flex-1 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
                >
                  ✅ Save Changes
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setEdit(false);
                    setForm(user);
                  }}
                  className="flex-1 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300"
                >
                  ❌ Cancel
                </motion.button>
              </div>
            )}

          </motion.div>
        )}

        {/* TAB 2: Registered Events */}
        {activeTab === "registered" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">📅 Currently Registered Events</h2>

            {upcomingRegisteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingRegisteredEvents.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden hover:border-indigo-400/50 transition-all hover:shadow-xl hover:shadow-indigo-500/20"
                  >
                    {/* Event Image */}
                    <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />

                    {/* Event Info */}
                    <div className="p-5">
                      <h3 className="text-white font-bold text-lg mb-2">{event.title}</h3>
                      <p className="text-slate-400 text-sm mb-4">{event.description.slice(0, 80)}...</p>

                      <div className="space-y-2 mb-4">
                        <p className="text-slate-300 text-sm">📅 {event.date}</p>
                        <p className="text-slate-300 text-sm">⏰ {event.time}</p>
                        <p className="text-slate-300 text-sm">📍 {event.venue}</p>
                        <p className="text-slate-300 text-sm">🏷️ {event.category}</p>
                      </div>

                      <Link
                        to={`/events/${event.id}`}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition text-center block"
                      >
                        View Details
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-8 text-center">
                <p className="text-slate-400 text-lg">No upcoming registered events yet.</p>
                <Link to="/" className="text-indigo-400 hover:text-indigo-300 font-semibold mt-3 inline-block">
                  Explore Events →
                </Link>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 3: Completed Events */}
        {activeTab === "completed" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">🎉 Previously Completed Events</h2>

            {pastRegisteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastRegisteredEvents.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-green-400/50 transition-all hover:shadow-xl hover:shadow-green-500/20 opacity-75 hover:opacity-100"
                  >
                    {/* Event Image */}
                    <img src={event.image} alt={event.title} className="w-full h-40 object-cover opacity-70" />

                    {/* Event Info */}
                    <div className="p-5">
                      <h3 className="text-white font-bold text-lg mb-2">{event.title}</h3>
                      <p className="text-slate-400 text-sm mb-4">{event.description.slice(0, 80)}...</p>

                      <div className="space-y-2 mb-4">
                        <p className="text-slate-400 text-sm">📅 {event.date}</p>
                        <p className="text-slate-400 text-sm">⏰ {event.time}</p>
                        <p className="text-slate-400 text-sm">📍 {event.venue}</p>
                        <p className="text-slate-400 text-sm">🏷️ {event.category}</p>
                      </div>

                      <div className="bg-green-500/20 border border-green-400/50 py-2 rounded-lg text-center">
                        <p className="text-green-400 font-semibold text-sm">✅ Completed</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-8 text-center">
                <p className="text-slate-400 text-lg">No completed events yet.</p>
              </div>
            )}
          </motion.div>
        )}

      </div>
    </div>
  );
}