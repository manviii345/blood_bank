import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { SuperAdminDashboard } from "./pages/dashboard/SuperAdminDashboard";
import { StaffDashboard } from "./pages/dashboard/StaffDashboard";
import { HospitalDashboard } from "./pages/dashboard/HospitalDashboard";
import { DonorDashboard } from "./pages/dashboard/DonorDashboard";
import { About } from "./pages/About";
import { Availability } from "./pages/Availability";
import { Awareness } from "./pages/Awareness";
import { Navbar } from "./components/layout/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/availability" element={<Availability />} />
              <Route path="/awareness" element={<Awareness />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard/admin" element={
                <ProtectedRoute allowedRoles={['super_admin']}>
                  <SuperAdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/staff" element={
                <ProtectedRoute allowedRoles={['staff']}>
                  <StaffDashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/hospital" element={
                <ProtectedRoute allowedRoles={['hospital']}>
                  <HospitalDashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/donor" element={
                <ProtectedRoute allowedRoles={['donor']}>
                  <DonorDashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

