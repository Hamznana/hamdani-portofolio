import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Admin from "../pages/Admin";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Rute portal admin rahasia */}
      <Route path="/hh-admin" element={<Admin />} />
      {/* Redirect otomatis dari /admin lama ke home */}
      <Route path="/admin" element={<Navigate to="/" replace />} />
      {/* Fallback rute */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
