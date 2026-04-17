import { useState } from "react";

export default function HelpPage() {
  const [issue, setIssue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your request has been sent!");
    setIssue("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900">
      <div className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-[400px]">
        
        <h2 className="text-2xl text-white font-bold mb-6 text-center">
          Need Help?
        </h2>

        <form onSubmit={handleSubmit}>
          <textarea
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            placeholder="Describe your issue (e.g., can't find friend, entry issue...)"
            className="w-full p-3 rounded-lg mb-4"
            required
          />

          <button className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Submit Request
          </button>
        </form>

        {/* Quick Actions */}
        <div className="mt-6 text-white text-sm space-y-2">
          <p>📞 Call Support: 9876543210</p>
          <p>📍 Help Desk: Near Main Gate</p>
        </div>

      </div>
    </div>
  );
}