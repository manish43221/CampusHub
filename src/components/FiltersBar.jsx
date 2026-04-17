export default function FiltersBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
}) {
  return (
    <div className="flex flex-col items-center mb-8">

      {/* 🔍 SEARCH BOX */}
      <div className="relative w-full max-w-xl mb-4">

        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search events or venues..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-10 py-3 rounded-2xl
          bg-white/70 backdrop-blur-lg dark:bg-slate-800/70
          border border-slate-300 dark:border-slate-600
          shadow-md
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          transition-all duration-300
          dark:text-white"
        />

        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500"
          >
            ✖
          </button>
        )}
      </div>

      {/* 🎯 CATEGORY FILTER (NOW BELOW + CENTERED) */}
      <div className="flex flex-wrap justify-center gap-3">

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all
            ${
              selectedCategory === category
                ? "bg-indigo-600 text-white"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            {category}
          </button>
        ))}

      </div>
    </div>
  );
}