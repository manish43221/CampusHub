import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ADMIN_PASSWORD = "Admin@2026";

export default function AdminPage({ events, setEvents }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    venue: "",
    category: "",
    image: "",
    description: "",
    capacity: "",
  });

  const handleAuth = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPassword("");
      toast.success("Admin access granted. You can now add events.");
    } else {
      toast.error("Invalid admin password. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();

    const missingField = Object.entries(formData).find(
      ([key, value]) => value.toString().trim() === "",
    );

    if (missingField) {
      toast.error(`Please fill in the ${missingField[0]} field.`);
      return;
    }

    const newEvent = {
      id: Date.now().toString(),
      ...formData,
      capacity: Number(formData.capacity),
    };

    setEvents([newEvent, ...events]);
    setFormData({
      title: "",
      date: "",
      time: "",
      venue: "",
      category: "",
      image: "",
      description: "",
      capacity: "",
    });
    toast.success("New event added successfully.");
  };

  const handleDeleteEvent = (eventId) => {
    const confirmed = window.confirm("Delete this event permanently?");
    if (!confirmed) return;

    setEvents(events.filter((event) => event.id !== eventId));
    toast.success("Event deleted.");
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3">
          Admin Event Manager
        </h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Enter the admin password to unlock the event creation form. Newly added events are saved locally and show up immediately in the student event listing.
        </p>
      </div>

      {!authenticated ? (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-xl">
          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition"
            >
              Unlock Admin Panel
            </button>
            <div className="text-center text-sm text-slate-500 dark:text-slate-400 space-y-2">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-indigo-600 hover:underline"
              >
                Return to student login
              </button>
              <Link to="/login" className="text-indigo-600 hover:underline block">
                Or click here if navigation is not working
              </Link>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 shadow-xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Add New Event
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">
                  Provide full details to create an event for the campus portal.
                </p>
              </div>
              <button
                onClick={() => setAuthenticated(false)}
                className="px-5 py-3 rounded-2xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Sign out of admin
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Title</span>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Category</span>
                  <input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Date</span>
                  <input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Time</span>
                  <input
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Capacity</span>
                  <input
                    name="capacity"
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Venue</span>
                  <input
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Image URL</span>
                  <input
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Description</span>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-4 outline-none focus:border-indigo-500 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </label>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition"
              >
                Add Event
              </button>
            </form>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Existing Events</h2>
            {events.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400">No events available.</p>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="rounded-3xl border border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-950/30">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{event.title}</h3>
                        <p className="text-slate-500 dark:text-slate-400">{event.date} · {event.time} · {event.category}</p>
                      </div>
                      <div className="flex flex-col md:items-end gap-2">
                        <p className="text-slate-600 dark:text-slate-300">Venue: {event.venue}</p>
                        <button
                          type="button"
                          onClick={() => handleDeleteEvent(event.id)}
                          className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}