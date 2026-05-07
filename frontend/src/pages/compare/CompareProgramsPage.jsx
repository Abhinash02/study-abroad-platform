import { useEffect, useMemo, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { getProgramsApi } from "../../api/programApi";

export default function CompareProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const { data } = await getProgramsApi({ page: 1, limit: 20 });
      setPrograms(data.data);
    };
    fetchPrograms();
  }, []);

  const selectedPrograms = useMemo(
    () => programs.filter((item) => selectedIds.includes(item._id)),
    [programs, selectedIds]
  );

  const toggleSelection = (programId) => {
    setSelectedIds((prev) => {
      if (prev.includes(programId)) {
        return prev.filter((id) => id !== programId);
      }
      if (prev.length >= 3) return prev;
      return [...prev, programId];
    });
  };

  return (
    <AppShell>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Compare Programs</h2>
        <p className="text-sm text-slate-500">
          Select up to 3 programs and compare cost, intake, IELTS, and scholarships.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-soft">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {programs.map((program) => {
            const checked = selectedIds.includes(program._id);

            return (
              <label
                key={program._id}
                className={`cursor-pointer rounded-2xl border p-4 transition ${
                  checked
                    ? "border-primary bg-teal-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">{program.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {program.universityName} • {program.country}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleSelection(program._id)}
                    className="mt-1 h-4 w-4"
                  />
                </div>
              </label>
            );
          })}
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-slate-900">Comparison Table</h3>

        {selectedPrograms.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">
            Select programs above to compare them side by side.
          </p>
        ) : (
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2 text-sm">
              <thead>
                <tr>
                  <th className="rounded-l-xl bg-slate-100 px-4 py-3 text-left font-semibold text-slate-700">
                    Feature
                  </th>
                  {selectedPrograms.map((program, index) => (
                    <th
                      key={program._id}
                      className={`bg-slate-100 px-4 py-3 text-left font-semibold text-slate-700 ${
                        index === selectedPrograms.length - 1 ? "rounded-r-xl" : ""
                      }`}
                    >
                      {program.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["University", "universityName"],
                  ["Country", "country"],
                  ["Field", "field"],
                  ["Degree", "degreeLevel"],
                  ["Tuition Fee", "tuitionFeeUsd"],
                  ["IELTS", "minimumIelts"],
                  ["Duration", "durationMonths"],
                  ["Scholarship", "scholarshipAvailable"],
                  ["Intakes", "intakes"],
                ].map(([label, key]) => (
                  <tr key={key}>
                    <td className="rounded-l-xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-700">
                      {label}
                    </td>
                    {selectedPrograms.map((program, index) => (
                      <td
                        key={program._id + key}
                        className={`border border-slate-200 bg-white px-4 py-3 text-slate-600 ${
                          index === selectedPrograms.length - 1 ? "rounded-r-xl" : ""
                        }`}
                      >
                        {key === "scholarshipAvailable"
                          ? program[key]
                            ? "Yes"
                            : "No"
                          : Array.isArray(program[key])
                          ? program[key].join(", ")
                          : key === "tuitionFeeUsd"
                          ? `$${program[key]}`
                          : program[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppShell>
  );
}