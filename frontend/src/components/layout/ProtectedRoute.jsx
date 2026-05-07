// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";

// export default function ProtectedRoute({ children }) {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <div className="p-8">Loading...</div>;
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../common/Loader";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader text="Checking session..." />;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}