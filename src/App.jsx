import { Routes, Route, Navigate } from "react-router-dom";
import Gate from "./pages/Gate/Gate.jsx";
import MapPage from "./pages/MapPage/MapPage.jsx";

const LS_ACCESS = "oiah_access_v1";

function hasAccess() {
  return localStorage.getItem(LS_ACCESS) === "1";
}

function ProtectedRoute({ children }) {
  return hasAccess() ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Gate />} />
      <Route
        path="/map"
        element={
          <ProtectedRoute>
            <MapPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
