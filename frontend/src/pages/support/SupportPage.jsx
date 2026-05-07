import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { useAuth } from "../../hooks/useAuth";
import SupportRequestCard from "../../components/cards/SupportRequestCard";
import Pagination from "../../components/common/Pagination";
import {
  addSupportMessageApi,
  createSupportRequestApi,
  deleteSupportRequestApi,
  getSupportRequestsApi,
  updateSupportFeedbackApi,
  updateSupportRequestApi,
} from "../../api/supportApi";

export default function SupportPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [meta, setMeta] = useState({
    page: 1,
    limit: 2,
    total: 0,
    totalPages: 1,
  });
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    category: "general",
    message: "",
  });

  const fetchRequests = async (pageNumber = page) => {
    const { data } = await getSupportRequestsApi({
      page: pageNumber,
      limit: 2,
    });
    setRequests(data.data);
    setMeta(data.meta);
  };

  useEffect(() => {
    fetchRequests(page);
  }, [page]);

  const handleCreate = async (e) => {
    e.preventDefault();
    await createSupportRequestApi(formData);
    setFormData({
      subject: "",
      description: "",
      category: "general",
      message: "",
    });
    setPage(1);
    fetchRequests(1);
  };

  const handleReply = async (id, message) => {
    if (!message.trim()) return;
    await addSupportMessageApi(id, { message });
    fetchRequests(page);
  };

  const handleCounselorUpdate = async (id, payload) => {
    await updateSupportFeedbackApi(id, payload);
    fetchRequests(page);
  };

  const handleStudentUpdate = async (id, payload) => {
    await updateSupportRequestApi(id, payload);
    fetchRequests(page);
  };

  const handleStudentDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this support request?"
    );
    if (!confirmed) return;

    await deleteSupportRequestApi(id);

    const nextPage =
      requests.length === 1 && page > 1 ? page - 1 : page;

    setPage(nextPage);
    fetchRequests(nextPage);
  };

  return (
    <AppShell>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Counselor Support</h2>
        <p className="text-sm text-slate-500">
          Students can create, update, delete, and track support requests with pagination.
        </p>
      </div>

      {user?.role === "student" ? (
        <form
          onSubmit={handleCreate}
          className="mb-8 rounded-2xl bg-white p-6 shadow-soft"
        >
          <h3 className="text-lg font-semibold">Create Support Request</h3>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input
              value={formData.subject}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, subject: e.target.value }))
              }
              placeholder="Subject"
              className="rounded-xl border border-slate-200 px-4 py-3"
            />
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              className="rounded-xl border border-slate-200 px-4 py-3"
            >
              <option value="general">general</option>
              <option value="admission">admission</option>
              <option value="visa">visa</option>
              <option value="documents">documents</option>
              <option value="finance">finance</option>
            </select>
          </div>

          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Describe your issue"
            className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3"
            rows={4}
          />

          {/* <textarea
            value={formData.message}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, message: e.target.value }))
            }
            placeholder="Initial message"
            className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3"
            rows={3}
          /> */}

          <button className="rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-teal-700">
  Submit Request
</button>
        </form>
      ) : null}

      <div className="space-y-5">
        {requests.map((request) => (
          <SupportRequestCard
            key={request._id}
            request={request}
            user={user}
            onReply={handleReply}
            onCounselorUpdate={handleCounselorUpdate}
            onStudentUpdate={handleStudentUpdate}
            onStudentDelete={handleStudentDelete}
          />
        ))}
      </div>

      <Pagination
        page={meta.page}
        totalPages={meta.totalPages}
        onPageChange={setPage}
      />
    </AppShell>
  );
}