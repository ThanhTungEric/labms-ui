import * as React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayoutBasic from './components/navigate/DashboardLayoutBasic';
import LoginPage from './pages/auth/LoginPage';
import { useAuth } from './services/hooks/auth/useAuth';
import './App.css';


const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const { refreshSession, logoutUser } = useAuth();
  useEffect(() => {
    (async () => {
      try {
        await refreshSession();
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setAuthChecked(true);
      }
    })();
  }, [refreshSession]);

  const handleLogout = React.useCallback(async () => {
    await logoutUser();
    setIsLoggedIn(false);
  }, [logoutUser]);

  if (!authChecked) return null;

  return (
    <Router>
      <Routes>
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
        <Route
          path="/*"
          element={
            isLoggedIn ? (
              <DashboardLayoutBasic onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
