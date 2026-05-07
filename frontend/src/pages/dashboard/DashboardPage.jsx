import React, { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import StatCard from "../../components/common/StatCard";
import RecommendationCard from "../../components/cards/RecommendationCard";
import { getDashboardOverviewApi } from "../../api/dashboardApi";
import { getRecommendationsApi } from "../../api/recommendationApi";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import {
  Users,
  BookOpen,
  FileText,
  MapPin,
  TrendingUp,
  Star,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  Home,
  GraduationCap,
  Building2,
  ArrowLeft,
} from "lucide-react";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [overview, setOverview] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check if came from mobile menu (not dashboard or root)
  const showBackButton = location.pathname !== '/dashboard' && location.pathname !== '/' && window.innerWidth < 1024;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [overviewRes, recsRes] = await Promise.all([
          getDashboardOverviewApi(),
          user?.id
            ? getRecommendationsApi(user.id)
            : Promise.resolve({ data: { data: { recommendations: [] } } }),
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navigationItems = [
    { name: "Dashboard", icon: Home, href: "/dashboard", current: true },
    { name: "Programs", icon: GraduationCap, href: "/programs" },
    { name: "Universities", icon: Building2, href: "/universities" },
    { name: "Applications", icon: FileText, href: "/applications" },
    { name: "Recommendations", icon: Star, href: "/recommendations" },
  ];

  if (loading) {
    return (
      <AppShell>
        <div className="flex min-h-[60vh] items-center justify-center p-6 sm:p-8">
          <div className="space-y-4 text-center">
            <div className="mx-auto h-14 w-14 animate-spin rounded-2xl bg-gradient-to-r from-teal-500 to-blue-600 shadow-xl sm:h-16 sm:w-16" />
            <div>
              <h3 className="text-lg font-semibold text-slate-700 sm:text-xl">
                Loading dashboard...
              </h3>
              <p className="text-sm text-slate-500">Fetching your latest data</p>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      {/* Mobile Hamburger Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={closeMenu}
        />
      )}
      
      {/* Mobile Sidebar Menu */}
      <div 
        className={`fixed left-0 top-0 z-50 h-full w-80 transform bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex h-20 items-center border-b border-slate-200 px-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-teal-500 to-blue-600" />
            <div>
              <p className="font-semibold text-slate-900">Welcome</p>
              <p className="text-sm text-slate-600 truncate max-w-[140px]">
                {user?.fullName}
              </p>
            </div>
          </div>
          <button
            onClick={closeMenu}
            className="ml-auto p-2"
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-slate-500" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={closeMenu}
                  className="group flex w-full items-center gap-3 rounded-xl p-4 text-base font-medium text-slate-700 transition-all hover:bg-teal-50 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <item.icon className="h-6 w-6 flex-shrink-0 text-slate-500 group-hover:text-teal-600" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* User Actions */}
          <div className="mt-8 border-t border-slate-200 pt-6">
            <ul className="space-y-2">
              <Link
                to="/profile"
                onClick={closeMenu}
                className="group flex w-full items-center gap-3 rounded-xl p-4 text-base font-medium text-slate-700 transition-all hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <User className="h-6 w-6 flex-shrink-0 text-slate-500 group-hover:text-blue-600" />
                <span>Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="group flex w-full items-center gap-3 rounded-xl p-4 text-base font-medium text-slate-700 transition-all hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <LogOut className="h-6 w-6 flex-shrink-0 text-slate-500 group-hover:text-red-600" />
                <span>Logout</span>
              </button>
            </ul>
          </div>
        </nav>
      </div>

      <div className="space-y-10 px-1 sm:px-0">
        {/* Mobile Back Button */}
        {showBackButton && (
          <div className="lg:hidden mb-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 rounded-2xl bg-white border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </button>
          </div>
        )}

        {/* Header with Hamburger */}
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex flex-col items-start">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Dashboard
            </h1>
            <p className="mt-1 text-base text-slate-600 sm:text-lg">
              Welcome back,{" "}
              <span className="font-semibold text-teal-600">
                {user?.fullName}
              </span>
            </p>
          </div>

          <div className="hidden lg:block">
            <Link
              to="/profile"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:shadow-teal-500/25 transition-all"
            >
              <User className="h-4 w-4" />
              Profile
            </Link>
          </div>
        </div>

        <section>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
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

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-8">
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-5 shadow-xl ring-1 ring-slate-200/50 backdrop-blur-sm sm:p-6 lg:p-8">
              <div className="mb-6 flex items-start gap-3 sm:items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    Application Status
                  </h2>
                  <p className="text-sm text-slate-600 sm:text-base">
                    Current pipeline breakdown
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {overview?.statusBreakdown?.map((item) => (
                  <div
                    key={item._id}
                    className="group flex flex-col gap-4 rounded-2xl p-4 transition-all hover:bg-slate-50 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-slate-500 to-slate-600 transition-all group-hover:from-slate-600 group-hover:to-slate-700">
                        <span className="text-sm font-bold text-white">
                          {item.count}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-semibold capitalize text-slate-900">
                          {item._id}
                        </p>
                        <p className="text-sm text-slate-500">
                          {Math.round((item.count / overview?.totalApplications) * 100)}% of total
                        </p>
                      </div>
                    </div>

                    <div className="h-2 w-full rounded-full bg-slate-200 group-hover:bg-slate-300 sm:w-24">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-slate-500 to-slate-600"
                        style={{
                          width: `${Math.min(
                            (item.count / overview?.totalApplications) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-emerald-100 to-blue-50 p-5 shadow-xl ring-1 ring-emerald-200/50 sm:p-6 lg:p-8">
              <div className="mb-6 flex items-start gap-3 sm:items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-emerald-600 sm:text-base">
                    Top Destinations
                  </h2>
                  <p className="text-sm text-emerald-700 sm:text-base">
                    Most popular choices
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {overview?.topCountries?.map((country, index) => (
                  <div
                    key={country._id}
                    className="flex items-center justify-between gap-4 rounded-2xl p-4"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-md">
                        <span className="text-lg font-bold text-emerald-600">
                          #{index + 1}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-bold text-slate-900">
                          {country._id}
                        </p>
                        <p className="text-sm text-slate-500">
                          Most applications
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-bold text-emerald-600 sm:text-2xl">
                        {country.count}
                      </p>
                      <p className="text-xs font-medium text-emerald-600">
                        apps
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-xl font-bold text-slate-900 sm:mb-8 sm:text-2xl">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/programs"
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500 to-teal-600 p-6 text-center text-white shadow-2xl transition-all hover:-translate-y-2 hover:shadow-teal-500/25 sm:p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              <div className="relative">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-sm transition-transform group-hover:scale-110 sm:h-16 sm:w-16">
                  <BookOpen className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <h3 className="mb-2 text-lg font-bold sm:text-xl">
                  Explore Programs
                </h3>
                <p className="text-sm text-teal-100 sm:text-base">
                  Find your perfect study option
                </p>
              </div>
            </Link>

            <Link
              to="/universities"
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-center text-white shadow-2xl transition-all hover:-translate-y-2 hover:shadow-blue-500/25 sm:p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              <div className="relative">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-sm transition-transform group-hover:scale-110 sm:h-16 sm:w-16">
                  <Users className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <h3 className="mb-2 text-lg font-bold sm:text-xl">
                  View Universities
                </h3>
                <p className="text-sm text-blue-100 sm:text-base">
                  Discover global institutions
                </p>
              </div>
            </Link>

            <Link
              to="/applications"
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-center text-white shadow-2xl transition-all hover:-translate-y-2 hover:shadow-purple-500/25 sm:p-8 md:col-span-2 lg:col-span-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              <div className="relative">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-sm transition-transform group-hover:scale-110 sm:h-16 sm:w-16">
                  <FileText className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <h3 className="mb-2 text-lg font-bold sm:text-xl">
                  Track Applications
                </h3>
                <p className="text-sm text-indigo-100 sm:text-base">
                  Monitor your progress
                </p>
              </div>
            </Link>
          </div>
        </section>

        <section>
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                🎯 Top Recommendations
              </h2>
              <p className="mt-2 text-base text-slate-600 sm:text-lg">
                Personalized matches based on your profile
              </p>
            </div>

            <Link
              to="/recommendations"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-3 text-base font-semibold text-white shadow-xl transition-all hover:shadow-2xl hover:shadow-teal-500/25 sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
            >
              View All Recommendations
            </Link>
          </div>

          {recommendations.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recommendations.slice(0, 6).map((item) => (
                <RecommendationCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="grid place-items-center rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 text-center shadow-xl sm:p-12 lg:p-16 xl:grid-cols-2 xl:text-left">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-teal-400 via-blue-400 to-purple-400 p-6 shadow-2xl sm:h-28 sm:w-28 xl:mx-0 xl:h-32 xl:w-32">
                <svg
                  className="h-12 w-12 text-white sm:h-14 sm:w-14 xl:h-20 xl:w-20"
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

              <div className="max-w-md space-y-6 pt-8 xl:pt-0">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    Complete your profile first
                  </h3>
                  <p className="mt-3 text-base text-slate-600 sm:text-lg">
                    Add your preferred countries, budget range, fields of study, and IELTS score to unlock personalized recommendations.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/profile"
                    className="flex-1 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-3 text-base font-semibold text-white shadow-xl transition-all hover:shadow-2xl hover:shadow-teal-500/25 sm:px-8 sm:py-4 sm:text-lg"
                  >
                    Update Profile
                  </Link>
                  <Link
                    to="/programs"
                    className="rounded-2xl border-2 border-slate-200 px-6 py-3 text-base font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:shadow-md sm:px-8 sm:py-4 sm:text-lg"
                  >
                    Browse Programs
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}