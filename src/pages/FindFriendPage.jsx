import { useState } from "react";

// ✅ Same MOCK_USERS
const MOCK_USERS = [
  { roll: "202401100200100", password: "Ganga@123", name: "Ganga Tripathi" },
  { roll: "202401100200189", password: "Manish@123", name: "Manish Sharma" },
  { roll: "202401100200220", password: "Om@123", name: "Om Prakash Yadav" },
  { roll: "20240110020099", password: "Gagan@123", name: "Gagan Sharma" }
];

export default function FindFriendPage() {
  const [roll, setRoll] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    const data = JSON.parse(localStorage.getItem("registrations")) || [];

    // ✅ Combine both (localStorage priority first)
    const allUsers = [...data, ...MOCK_USERS];

    // ✅ Find user
    const found = allUsers.find((item) => item.roll === roll);

    if (found) {
      setResult(found);
    } else {
      setResult("not-found");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900">
      <div className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-[400px]">
        
        <h2 className="text-2xl text-white font-bold mb-6 text-center">
          Find Your Friend 🔍
        </h2>

        <input
          type="text"
          placeholder="Enter Roll Number"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          className="w-full p-3 rounded-lg mb-4"
        />

        <button
          onClick={handleSearch}
          className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Search
        </button>

        {/* Result */}
        {result && result !== "not-found" && (
          <div className="mt-6 text-white bg-white/20 p-4 rounded-lg">
            <p><strong>Name:</strong> {result.name}</p>
            <p><strong>Event:</strong> {result.event || "N/A"}</p>
            <p><strong>Roll:</strong> {result.roll}</p>
          </div>
        )}

        {result === "not-found" && (
          <p className="mt-6 text-red-400 text-center">
            No student found with this roll number ❌
          </p>
        )}
      </div>
    </div>
  );
}