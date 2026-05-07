import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { getProgramsApi } from "../../api/programApi";
import { createApplicationApi, applyProgramApi } from "../../api/applicationApi"; // ← add applyProgramApi
import { compareProgramsApi } from "../../api/compareApi";
import ProgramCard from "../../components/cards/ProgramCard";
import CompareProgramsPanel from "../../components/compare/CompareProgramsPanel";
import { useAuth } from "../../hooks/useAuth";

export default function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [compareResult, setCompareResult] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPrograms = async () => {
      const { data } = await getProgramsApi({ page: 1, limit: 12 });
      setPrograms(data.data);
    };
    fetchPrograms();
  }, []);

  const handleApply = async (program) => {
    const selectedIntake = program.intakes?.[0];

    // ✅ Use the new /apply route for student‑panel apply
    await applyProgramApi({
      studentId: user.id,
      programId: program._id,
      intake: selectedIntake,
      note: "Application started from dashboard.",
    });

    alert("Application created successfully");
  };

  const toggleCompare = (programId) => {
    setSelectedPrograms((prev) => {
      if (prev.includes(programId)) {
        return prev.filter((id) => id !== programId);
      }
      if (prev.length >= 2) return prev;
      return [...prev, programId];
    });
  };

  const handleCompare = async () => {
    if (selectedPrograms.length < 2) return;
    const { data } = await compareProgramsApi({
      studentId: user.id,
      programIds: selectedPrograms,
    });
    setCompareResult(data.data);
  };

  return (
    <AppShell>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Explore Programs</h2>
          <p className="text-sm text-slate-500">
            Select two programs to compare with backend percentage scoring.
          </p>
        </div>
        <button
          onClick={handleCompare}
          disabled={selectedPrograms.length < 2}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Compare Selected
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {programs.map((program) => {
          const selected = selectedPrograms.includes(program._id);

          return (
            <div key={program._id}>
              <label className="mb-2 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleCompare(program._id)}
                />
                Compare
              </label>
              <ProgramCard program={program} onApply={handleApply} />
            </div>
          );
        })}
      </div>

      <CompareProgramsPanel result={compareResult} />
    </AppShell>
  );
}