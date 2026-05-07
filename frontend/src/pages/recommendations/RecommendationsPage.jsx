// import { useEffect, useState } from "react";
// import AppShell from "../../components/layout/AppShell";
// import { useAuth } from "../../hooks/useAuth";
// import { getRecommendationsApi } from "../../api/recommendationApi";
// import RecommendationCard from "../../components/cards/RecommendationCard";
// import Loader from "../../components/common/Loader";
// import EmptyState from "../../components/common/EmptyState";
// import { Sparkles } from "lucide-react";

// export default function RecommendationsPage() {
//   const { user } = useAuth();
//   const [recommendations, setRecommendations] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRecommendations = async () => {
//       try {
//         const studentId = user?.id || user?._id;
//         if (!studentId) return;

//         const { data } = await getRecommendationsApi(studentId);
//         setRecommendations(data.data.recommendations || []);
//       } catch (error) {
//         console.error("Recommendations fetch failed:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecommendations();
//   }, [user]);

//   return (
//     <AppShell>
//       <div className="mb-8 flex items-end justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight text-slate-900">
//             Recommendations
//           </h1>
//           <p className="mt-2 text-slate-600">
//             Personalized program suggestions based on your profile.
//           </p>
//         </div>
//       </div>

//       {loading ? (
//         <Loader />
//       ) : recommendations.length ? (
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
//           {recommendations.map((item) => (
//             <RecommendationCard key={item._id} item={item} />
//           ))}
//         </div>
//       ) : (
//         <EmptyState
//           icon={Sparkles}
//           title="No recommendations yet"
//           subtitle="Complete your profile with country, field, budget, and intake preferences to unlock personalized recommendations."
//           action={() => (window.location.href = "/profile")}
//           actionText="Complete Profile"
//         />
//       )}
//     </AppShell>
//   );
// }


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { useAuth } from "../../hooks/useAuth";
import { getRecommendationsApi } from "../../api/recommendationApi";
import RecommendationCard from "../../components/cards/RecommendationCard";

export default function RecommendationsPage() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const isProfileReady =
    user?.targetCountries?.length &&
    user?.interestedFields?.length &&
    user?.preferredIntake &&
    Number(user?.maxBudgetUsd) > 0;

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user?.id || !isProfileReady) {
        setRecommendations([]);
        setLoading(false);
        return;
      }

      try {
        const { data } = await getRecommendationsApi(user.id);
        setRecommendations(data.data.recommendations || []);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user, isProfileReady]);

  return (
    <AppShell>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Recommended Programs</h2>
        <p className="text-sm text-slate-500">
          Personalized suggestions based on your profile preferences.
        </p>
      </div>

      {!isProfileReady ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow-soft">
          <h3 className="text-xl font-semibold text-slate-900">No recommendations yet</h3>
          <p className="mt-3 text-sm text-slate-500">
            Complete your profile with country, field, budget, and intake preferences to unlock personalized recommendations.
          </p>
          <Link
            to="/profile"
            className="mt-5 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Edit Profile
          </Link>
        </div>
      ) : loading ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow-soft">
          <p className="text-sm text-slate-500">Loading recommendations...</p>
        </div>
      ) : recommendations.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow-soft">
          <h3 className="text-xl font-semibold text-slate-900">No matching recommendations found</h3>
          <p className="mt-3 text-sm text-slate-500">
            Try adjusting your budget, countries, fields, or intake preferences from your profile.
          </p>
        <Link
  to="/profile"
  className="mt-5 inline-flex items-center justify-center rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-teal-700"
>
  Update Preferences
</Link>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {recommendations.map((item) => (
            <RecommendationCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </AppShell>
  );
}