import React, { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import StatCard from "../../components/common/StatCard";
import RecommendationCard from "../../components/cards/RecommendationCard";
import { getDashboardOverviewApi } from "../../api/dashboardApi";
import { getRecommendationsApi } from "../../api/recommendationApi";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

import { 
  Users, 
  BookOpen, 
  FileText, 
  MapPin, 
  TrendingUp, 
  Star 
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const [overview, setOverview] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [overviewRes, recsRes] = await Promise.all([
          getDashboardOverviewApi(),
          user?.id ? getRecommendationsApi(user.id) : Promise.resolve({ data: { data: { recommendations: [] } } }),
        ]);
        setOverview(overviewRes.data.data);
        setRecommendations(recsRes.data.data.recommendations || []);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <AppShell>
        <div className="flex min-h-[60vh] items-center justify-center p-8">
          <div className="space-y-4 text-center">
            <div className="mx-auto h-16 w-16 animate-spin rounded-2xl bg-gradient-to-r from-teal-500 to-blue-600 shadow-xl" />
            <div>
              <h3 className="text-xl font-semibold text-slate-700">Loading dashboard...</h3>
              <p className="text-sm text-slate-500">Fetching your latest data</p>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      {/* 🎯 HERO SECTION - Key Metrics */}
      <section className="mb-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Dashboard
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            Welcome back, <span className="font-semibold text-teal-600">{user?.fullName}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Users}
            title="Total Students"
            value={overview?.totalStudents?.toLocaleString() || "0"}
            subtitle="Active platform users"
            trend="+12% from last month"
            color="teal"
          />
          <StatCard
            icon={BookOpen}
            title="Programs Available"
            value={overview?.totalPrograms?.toLocaleString() || "0"}
            subtitle="Global study options"
            trend="+8%"
            color="blue"
          />
          <StatCard
            icon={FileText}
            title="Your Applications"
            value={overview?.totalApplications?.toLocaleString() || "0"}
            subtitle="Tracked applications"
            trend="+3"
            color="indigo"
          />
          <StatCard
            icon={TrendingUp}
            title="Top Match Score"
            value={recommendations[0]?.matchScore || "0"}
            subtitle="Recommendation quality"
            trend="+15%"
            color="emerald"
          />
        </div>
      </section>

      {/* 📊 INSIGHTS SECTION - Status & Destinations */}
      <section className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        {/* Status Breakdown */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200/50 backdrop-blur-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Application Status</h2>
                <p className="text-slate-600">Current pipeline breakdown</p>
              </div>
            </div>

            <div className="space-y-4">
              {overview?.statusBreakdown?.map((item, index) => (
                <div
                  key={item._id}
                  className="group flex cursor-pointer items-center justify-between rounded-2xl p-4 transition-all hover:bg-slate-50 hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-slate-500 to-slate-600 flex items-center justify-center group-hover:from-slate-600 group-hover:to-slate-700 transition-all">
                      <span className="text-sm font-bold text-white">{item.count}</span>
                    </div>
                    <div>
                      <p className="font-semibold capitalize text-slate-900">{item._id}</p>
                      <p className="text-sm text-slate-500">
                        {Math.round((item.count / overview?.totalApplications) * 100)}% of total
                      </p>
                    </div>
                  </div>
                  <div className="h-2 w-24 rounded-full bg-slate-200 group-hover:bg-slate-300">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-slate-500 to-slate-600"
                      style={{ width: `${Math.min((item.count / overview?.totalApplications) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Destinations */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-emerald-100 to-blue-50 p-8 shadow-xl ring-1 ring-emerald-200/50">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-emerald-900">Top Destinations</h2>
                <p className="text-emerald-700">Most popular choices</p>
              </div>
            </div>

            <div className="space-y-4">
              {overview?.topCountries?.map((country, index) => (
                <div key={country._id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white shadow-md flex items-center justify-center">
                      <span className="text-lg font-bold text-emerald-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{country._id}</p>
                      <p className="text-sm text-slate-500">Most applications</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-600">{country.count}</p>
                    <p className="text-xs text-emerald-600 font-medium">apps</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ⚡ QUICK ACTIONS */}
      <section className="mt-10">
        <h2 className="mb-8 text-2xl font-bold text-slate-900">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <a
            href="/programs"
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500 to-teal-600 p-8 text-center text-white shadow-2xl transition-all hover:-translate-y-2 hover:shadow-3xl hover:shadow-teal-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="relative">
              <div className="mx-auto mb-4 h-16 w-16 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Explore Programs</h3>
              <p className="text-teal-100">Find your perfect study option</p>
            </div>
          </a>

          <a
            href="/universities"
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-8 text-center text-white shadow-2xl transition-all hover:-translate-y-2 hover:shadow-3xl hover:shadow-blue-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="relative">
              <div className="mx-auto mb-4 h-16 w-16 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold">View Universities</h3>
              <p className="text-blue-100">Discover global institutions</p>
            </div>
          </a>

          <a
            href="/applications"
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-center text-white shadow-2xl transition-all hover:-translate-y-2 hover:shadow-3xl hover:shadow-purple-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="relative">
              <div className="mx-auto mb-4 h-16 w-16 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Track Applications</h3>
              <p className="text-indigo-100">Monitor your progress</p>
            </div>
          </a>
        </div>
      </section>

      {/* ⭐ RECOMMENDATIONS SECTION */}
      <section className="mt-16">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              🎯 Top Recommendations
            </h2>
            <p className="mt-2 text-lg text-slate-600">
              Personalized matches based on your profile
            </p>
          </div>
          <a
            href="/recommendations"
            className="rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 px-8 py-4 text-lg font-semibold text-white shadow-xl hover:shadow-2xl hover:shadow-teal-500/25 transition-all"
          >
            View All Recommendations →
          </a>
        </div>

        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.slice(0, 6).map((item) => (
              <RecommendationCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="grid place-items-center rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 p-20 text-center shadow-xl xl:grid-cols-2">
            <div className="mx-auto h-32 w-32 rounded-3xl bg-gradient-to-br from-teal-400 via-blue-400 to-purple-400 p-8 shadow-2xl">
              <svg
                className="h-20 w-20 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div className="max-w-md space-y-6 pt-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Complete your profile first
                </h3>
                <p className="mt-3 text-xl text-slate-600">
                  Add your preferred countries, budget range, fields of study, and IELTS score to unlock personalized recommendations.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="/profile"
                  className="flex-1 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 px-8 py-4 text-lg font-semibold text-white shadow-xl hover:shadow-2xl hover:shadow-teal-500/25 transition-all"
                >
                  Update Profile
                </a>
                <a
                  href="/programs"
                  className="rounded-2xl border-2 border-slate-200 px-8 py-4 text-lg font-semibold text-slate-700 hover:bg-slate-50 hover:shadow-md transition-all"
                >
                  Browse Programs
                </a>
              </div>
            </div>
          </div>
        )}
      </section>
    </AppShell>
  );
}