import { Routes, Route, Navigate } from "react-router-dom";
import CreatorPage from "./routes/CreatorPage";
import PrankPage from "./routes/PrankPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/create" replace />} />
      <Route path="/create" element={<CreatorPage />} />
      <Route path="/p/:payload" element={<PrankPage />} />
    </Routes>
  );
}
