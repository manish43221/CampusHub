import { useState } from "react";
import { Link } from "react-router-dom";

export default function FloatingHelpButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-2">

      {/* Tooltip */}
      {hovered && (
        <div className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm px-3 py-2 rounded-xl shadow-lg">
          Need Help? 🤖
        </div>
      )}

      <Link to="/help">
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl cursor-pointer hover:scale-110 transition"
        >
          {/* Robot Face */}
          <div className="w-10 h-10 bg-white rounded-xl flex flex-col items-center justify-center gap-1">

            {/* Eyes */}
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
            </div>

            {/* Mouth */}
            <div className="w-4 h-1 bg-black rounded-full"></div>

          </div>

          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-indigo-400 opacity-30 blur-xl animate-pulse"></div>
        </div>
      </Link>

    </div>
  );
}