import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import eventsData from "../data/events.json";
import Countdown from "../components/Countdown";

export default function EventDetailsPage({
  user,
  registeredEvents,
  setRegisteredEvents,
  eventRegistrations = {},
  setEventRegistrations,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    roll: user?.roll || "",
    email: user?.email || "",
    phone: "",
    branch: user?.branch || "",
    year: user?.year || "",
  });

  const event = eventsData.find((e) => e.id === id);

  if (!event)
    return <div className="text-center mt-20 font-bold">Event not found!</div>;

  const isRegistered = registeredEvents.includes(id);
  const registrationDetails = eventRegistrations[id];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.roll || !formData.email || !formData.phone) {
      toast.error("Please complete all required fields before submitting.");
      return;
    }

    if (!isRegistered) {
      setRegisteredEvents([...registeredEvents, id]);
    }

    setEventRegistrations({
      ...eventRegistrations,
      [id]: {
        ...formData,
      },
    });

    toast.success("Registration complete! Your ticket is ready in My Tickets.");
    setShowForm(false);
  };

  const handleCancel = () => {
    setRegisteredEvents(registeredEvents.filter((eventId) => eventId !== id));

    const nextRegistrations = { ...eventRegistrations };
    delete nextRegistrations[id];
    setEventRegistrations(nextRegistrations);

    toast.success("Registration cancelled.");
  };

  const handleEventEnded = () => {
    setHasEnded(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-indigo-600 font-bold"
      >
        Back
      </button>

      <div className={`rounded-3xl overflow-hidden shadow-lg border ${
        hasEnded 
          ? "bg-slate-700 dark:bg-slate-900 border-red-500/50" 
          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
      }`}>
        <img
          src={event.image}
          alt={event.title}
          className={`w-full h-64 object-cover ${hasEnded ? "opacity-50" : ""}`}
        />

        <div className="p-8">
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
            hasEnded
              ? "bg-red-500/20 text-red-600 dark:text-red-400"
              : "bg-indigo-100 text-indigo-600"
          }`}>
            {hasEnded ? "Event Ended" : event.category}
          </span>

          <h1 className={`text-3xl font-bold mt-4 mb-2 ${
            hasEnded 
              ? "text-slate-400 dark:text-slate-500" 
              : "dark:text-white"
          }`}>
            {event.title}
          </h1>

          <p className={`mb-6 ${
            hasEnded 
              ? "text-slate-400 dark:text-slate-500" 
              : "text-slate-600 dark:text-slate-300"
          }`}>
            {event.description}
          </p>

          <div className={`p-6 rounded-2xl mb-6 text-center ${
            hasEnded
              ? "bg-red-500/10 dark:bg-red-900/20 border border-red-500/30"
              : "bg-slate-50 dark:bg-slate-700"
          }`}>
            <h3 className={`font-bold mb-4 ${
              hasEnded 
                ? "text-red-600 dark:text-red-400" 
                : "dark:text-white"
            }`}>
              {hasEnded ? "This event has ended" : "Event Starts In:"}
            </h3>
            <Countdown date={event.date} time={event.time} onEnded={handleEventEnded} />
          </div>

          {isRegistered && registrationDetails ? (
            <div className="mb-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-200">
              <p className="font-bold">You are already registered for this event.</p>
              <p className="mt-2 text-sm">
                Ticket will appear in <span className="font-semibold">My Tickets</span>.
              </p>
              <p className="mt-3 text-sm">
                Registered as: {registrationDetails.name} ({registrationDetails.roll})
              </p>
            </div>
          ) : null}

          {showForm && !isRegistered && (
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Name</span>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Roll Number</span>
                  <input
                    name="roll"
                    value={formData.roll}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Phone</span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Branch</span>
                  <input
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Year</span>
                  <input
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </label>
              </div>

              <div className="flex flex-col gap-3 md:flex-row">
                <button
                  type="submit"
                  className="w-full md:w-auto bg-indigo-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-indigo-700 transition"
                >
                  Submit Registration
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="w-full md:w-auto border border-slate-300 text-slate-700 px-6 py-4 rounded-xl font-bold hover:bg-slate-100 transition dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <button
            onClick={isRegistered ? handleCancel : () => setShowForm(true)}
            disabled={hasEnded && !isRegistered}
            className={`w-full p-4 rounded-xl font-bold text-white transition-colors ${
              hasEnded && !isRegistered
                ? "bg-slate-400 cursor-not-allowed opacity-50"
                : isRegistered
                ? "bg-red-500 hover:bg-red-600"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {hasEnded && !isRegistered ? "Registration Closed" : isRegistered ? "Cancel Registration" : "Register Now"}
          </button>
        </div>
      </div>
    </div>
  );
}