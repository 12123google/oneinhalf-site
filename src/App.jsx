import { Routes, Route, Navigate } from "react-router-dom";
import Gate from "./pages/Gate/Gate";
import MapPage from "./pages/MapPage/MapPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/gate" replace />} />
      <Route path="/gate" element={<Gate />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="*" element={<Navigate to="/gate" replace />} />
    </Routes>
  );
}
