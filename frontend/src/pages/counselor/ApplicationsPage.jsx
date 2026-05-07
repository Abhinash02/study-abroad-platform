import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { getApplicationsApi, updateApplicationApi } from "../../api/applicationApi";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchApplications = async () => {
    const { data } = await getApplicationsApi();
    setApplications(data.data || []);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (applicationId, status) => {
    try {
      setUpdatingId(applicationId);
      await updateApplicationApi(applicationId, { status });
      await fetchApplications();
      alert("Application status updated successfully");
    } catch (error) {
      alert(error?.response?.data?.message || "Unable to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <AppShell>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Student Applications</h2>

        {applications.map((application) => (
          <div
            key={application._id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h3 className="text-lg font-semibold">
              {application.program?.title || "Program not available"}
            </h3>

            <p className="mt-1 text-sm text-slate-600">
              • {application.program?.country || "Country not available"} • Intake{" "}
              {application.intake || "N/A"}
            </p>

            <div className="mt-3 space-y-1 text-sm text-slate-700">
              <p>
                <span className="font-semibold">Student:</span>{" "}
                {application.student?.fullName || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {application.student?.email || "N/A"}
              </p>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700">Status</span>
              <select
                value={application.status || "submitted"}
                onChange={(e) => handleStatusChange(application._id, e.target.value)}
                disabled={updatingId === application._id}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none disabled:opacity-60"
              >
                <option value="submitted">submitted</option>
                <option value="pending">pending</option>
                <option value="completed">completed</option>
                <option value="rejected">rejected</option>
              </select>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              {application.createdAt
                ? new Date(application.createdAt).toLocaleString()
                : "No date available"}
            </p>

            {application.note ? (
              <p className="mt-3 text-sm text-slate-700">{application.note}</p>
            ) : null}

            <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
              {application.timeline?.map((item, index) => (
                <div key={index} className="text-sm">
                  <p className="font-medium text-slate-700">{item.status}</p>
                  <p className="text-slate-600">{item.message}</p>
                  <p className="text-xs text-slate-400">
                    {item.createdAt ? new Date(item.createdAt).toLocaleString() : ""}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}