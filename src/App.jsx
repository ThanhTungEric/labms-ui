import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import DashboardLayoutBasic from './components/navigate/DashboardLayoutBasic';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayoutBasic />} />
      </Routes>
    </Router>
  );
}

export default App;
