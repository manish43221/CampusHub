import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white mt-8 border-t border-slate-700 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] overflow-hidden">

      {/* subtle glow */}
      <div className="absolute inset-0 opacity-10 blur-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">

        {/* Branding */}
        <div>
          <h2 className="text-lg font-bold text-indigo-400 hover:text-pink-400 transition">
            KIET Events
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Discover and manage events easily.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-1 text-xs text-indigo-300">
            Quick Links
          </h3>

          <div className="flex flex-col gap-1 text-xs">
            <Link to="/" className="text-slate-400 hover:text-white transition">
              Discover
            </Link>
            <Link to="/my-registrations" className="text-slate-400 hover:text-white transition">
              My Tickets
            </Link>
            <Link to="/help" className="text-slate-400 hover:text-white transition">
              Help
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-1 text-xs text-indigo-300">
            Contact
          </h3>

          <div className="flex flex-col gap-1 text-xs text-slate-400">
            <p className="hover:text-white transition">📧 support@kietevents.com</p>
            <p className="hover:text-white transition">📞 +91 9876543210</p>
            <p className="hover:text-white transition">📍 KIET Campus</p>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-slate-700 text-center py-2 text-xs text-slate-400">
        © 2026 KIET Events
      </div>
    </footer>
  );
}