import { useState } from "react";
import { Search, Filter, X } from "lucide-react";

export default function ProgramFilters({ onFilterChange, filters = {} }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(localFilters);
  };

  const clearFilters = () => {
    const cleared = { page: 1 };
    setLocalFilters(cleared);
    onFilterChange(cleared);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          type="text"
          name="q"
          placeholder="Search programs..."
          value={localFilters.q || ""}
          onChange={(e) => setLocalFilters({ ...localFilters, q: e.target.value })}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-12 py-4 pl-12 text-sm placeholder-slate-500 focus:border-teal-300 focus:ring-2 focus:ring-teal-200 focus:ring-offset-0"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <select
          name="country"
          value={localFilters.country || ""}
          onChange={(e) => setLocalFilters({ ...localFilters, country: e.target.value })}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-teal-300 focus:ring-2 focus:ring-teal-200"
        >
          <option value="">All Countries</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
          <option value="UK">UK</option>
          <option value="USA">USA</option>
        </select>

        <select
          name="degreeLevel"
          value={localFilters.degreeLevel || ""}
          onChange={(e) => setLocalFilters({ ...localFilters, degreeLevel: e.target.value })}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-teal-300 focus:ring-2 focus:ring-teal-200"
        >
          <option value="">All Levels</option>
          <option value="bachelor">Bachelor</option>
          <option value="master">Master</option>
          <option value="diploma">Diploma</option>
        </select>

        <input
          type="number"
          name="maxTuition"
          placeholder="Max Budget"
          value={localFilters.maxTuition || ""}
          onChange={(e) => setLocalFilters({ ...localFilters, maxTuition: e.target.value })}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-teal-300 focus:ring-2 focus:ring-teal-200"
        />

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-700">Scholarships</label>
          <input
            type="checkbox"
            checked={localFilters.scholarshipAvailable}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, scholarshipAvailable: e.target.checked })
            }
            className="h-5 w-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={clearFilters}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all"
        >
          <X className="h-4 w-4" />
          Clear Filters
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 px-8 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:shadow-teal-500/25 transition-all"
        >
          <Filter className="h-4 w-4" />
          Apply Filters
        </button>
      </div>
    </form>
  );
}