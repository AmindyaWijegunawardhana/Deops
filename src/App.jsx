import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import PetDetails from './pages/PetDetails';
import AdoptionForm from './pages/AdoptionForm';
import Care from './pages/Care';
import About from './pages/About';
import VaccineCare from './pages/VaccineCare';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/pet/:id" element={
          <Layout>
            <PetDetails />
          </Layout>
        } />
        <Route path="/adopt/:id" element={
          <Layout>
            <AdoptionForm />
          </Layout>
        } />
        <Route path="/care" element={
          <Layout>
            <Care />
          </Layout>
        } />
        <Route path="/about" element={
          <Layout>
            <About />
          </Layout>
        } />
        <Route path="/vaccine-care/:id" element={
          <Layout>
            <VaccineCare />
          </Layout>
        } />
      </Route>

      {/* Fallback: Redirect to login or home based on auth state */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App
