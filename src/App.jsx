import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayoutBasic from './components/navigate/DashboardLayoutBasic';
import LoginPage from './pages/auth/LoginPage';
import { useAuth } from './services/hooks/auth/useAuth';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const { refreshSession, logoutUser } = useAuth();

  useEffect(() => {
    const tryRestoreSession = async () => {
      try {
        await refreshSession();
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setAuthChecked(true);
      }
    };

    tryRestoreSession();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
  };

  if (!authChecked) return null;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <DashboardLayoutBasic onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
