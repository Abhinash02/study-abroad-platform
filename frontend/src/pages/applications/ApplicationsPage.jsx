import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { getApplicationsApi } from "../../api/applicationApi";
import { useAuth } from "../../hooks/useAuth";
import ApplicationProgressCard from "../../components/cards/ApplicationProgressCard";

export default function ApplicationsPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      const { data } = await getApplicationsApi({
        studentId: user?.id,
        ...(status ? { status } : {}),
      });
      setApplications(data.data);
    };

    if (user?.id) fetchApplications();
  }, [user, status]);

  return (
    <AppShell>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Application Progress</h2>
          <p className="text-sm text-slate-500">
            Track the full journey of each application through professional status timelines.
          </p>
        </div>

        <div className="w-full md:w-64">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Filter by status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
          >
            <option value="">All statuses</option>
            <option value="draft">Draft</option>
            <option value="submitted">Submitted</option>
            <option value="under-review">Under review</option>
            <option value="offer-received">Offer received</option>
            <option value="visa-processing">Visa processing</option>
            <option value="enrolled">Enrolled</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow-soft">
          <h3 className="text-lg font-semibold text-slate-900">No applications found</h3>
          <p className="mt-2 text-sm text-slate-500">
            Start applying to programs and your progress timeline will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {applications.map((application) => (
            <ApplicationProgressCard
              key={application._id}
              application={application}
            />
          ))}
        </div>
      )}
    </AppShell>
  );
}