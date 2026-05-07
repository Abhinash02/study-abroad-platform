import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { getUniversitiesApi } from "../../api/universityApi";
import UniversityCard from "../../components/cards/UniversityCard";

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState([]);
  const [filters, setFilters] = useState({
    q: "",
    country: "",
    scholarshipAvailable: "",
    sortBy: "popular",
  });

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        page: 1,
        limit: 12,
        ...filters,
      };

      if (params.scholarshipAvailable === "") {
        delete params.scholarshipAvailable;
      }

      const { data } = await getUniversitiesApi(params);
      setUniversities(data.data);
    };

    fetchData();
  }, [filters]);

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <AppShell>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Discover Universities</h2>
        <p className="text-sm text-slate-500">
          Search global institutions by country, scholarship support, and popularity.
        </p>
      </div>

      <div className="mb-6 grid gap-4 rounded-2xl bg-white p-5 shadow-soft md:grid-cols-4">
        <input
          name="q"
          value={filters.q}
          onChange={handleChange}
          placeholder="Search university, city..."
          className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
        />

        <select
          name="country"
          value={filters.country}
          onChange={handleChange}
          className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
        >
          <option value="">All countries</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
          <option value="UK">UK</option>
          <option value="USA">USA</option>
          <option value="Ireland">Ireland</option>
        </select>

        <select
          name="scholarshipAvailable"
          value={filters.scholarshipAvailable}
          onChange={handleChange}
          className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
        >
          <option value="">All scholarship options</option>
          <option value="true">Scholarship available</option>
          <option value="false">No scholarship</option>
        </select>

        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleChange}
          className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
        >
          <option value="popular">Most popular</option>
          <option value="ranking">Best ranking</option>
          <option value="name">Name</option>
        </select>
      </div>

      {universities.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow-soft">
          <h3 className="text-lg font-semibold text-slate-900">No universities found</h3>
          <p className="mt-2 text-sm text-slate-500">
            Try changing your filters or search keywords.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {universities.map((university) => (
            <UniversityCard key={university._id} university={university} />
          ))}
        </div>
      )}
    </AppShell>
  );
}