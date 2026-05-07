// import { Routes, Route } from "react-router-dom";
// import LoginPage from "../pages/auth/LoginPage";
// import RegisterPage from "../pages/auth/RegisterPage";
// import DashboardPage from "../pages/dashboard/DashboardPage";
// import UniversitiesPage from "../pages/universities/UniversitiesPage";
// import ProgramsPage from "../pages/programs/ProgramsPage";
// import RecommendationsPage from "../pages/recommendations/RecommendationsPage";
// import ApplicationsPage from "../pages/applications/ApplicationsPage";
// import ProfilePage from "../pages/profile/ProfilePage";
// import ProtectedRoute from "../components/layout/ProtectedRoute";
// import CompareProgramsPage from "../pages/compare/CompareProgramsPage";
// import CounselorSupportPage from "../pages/support/CounselorSupportPage";

// export default function AppRouter() {
//   return (
//     <Routes>
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />

//       <Route
//         path="/"
//         element={
//           <ProtectedRoute>
//             <DashboardPage />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/universities"
//         element={
//           <ProtectedRoute>
//             <UniversitiesPage />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/programs"
//         element={
//           <ProtectedRoute>
//             <ProgramsPage />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/compare-programs"
//         element={
//           <ProtectedRoute>
//             <CompareProgramsPage />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/recommendations"
//         element={
//           <ProtectedRoute>
//             <RecommendationsPage />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/applications"
//         element={
//           <ProtectedRoute>
//             <ApplicationsPage />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/support"
//         element={
//           <ProtectedRoute>
//             <CounselorSupportPage />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/profile"
//         element={
//           <ProtectedRoute>
//             <ProfilePage />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// }

import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import UniversitiesPage from "../pages/universities/UniversitiesPage";
import ProgramsPage from "../pages/programs/ProgramsPage";
import RecommendationsPage from "../pages/recommendations/RecommendationsPage";
import ApplicationsPage from "../pages/applications/ApplicationsPage";
import ProfilePage from "../pages/profile/ProfilePage";
import SupportPage from "../pages/support/SupportPage";
import ProtectedRoute from "../components/layout/ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/universities" element={<ProtectedRoute><UniversitiesPage /></ProtectedRoute>} />
      <Route path="/programs" element={<ProtectedRoute><ProgramsPage /></ProtectedRoute>} />
      <Route path="/recommendations" element={<ProtectedRoute><RecommendationsPage /></ProtectedRoute>} />
      <Route path="/applications" element={<ProtectedRoute><ApplicationsPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/support" element={<ProtectedRoute><SupportPage /></ProtectedRoute>} />
    </Routes>
  );
}