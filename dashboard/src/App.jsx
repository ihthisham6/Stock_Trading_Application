// dashboard/src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie'; // Import provider here
import 'react-toastify/dist/ReactToastify.css';
// --- Import Your Pages and Components ---
import Home from './components/Home'; // Your main app component
import Login from './pages/Login';     // The login page you will create
import Signup from './pages/Signup';   // The signup page you will create
import ProtectedRoute from './components/ProtectedRoute'; // The gatekeeper component
import { GeneralContextProvider } from './components/GeneralContext';
function App() {
  return (
    <CookiesProvider> {/* Wrap everything in the provider */}
      <GeneralContextProvider>
      <Routes>
        {/* === PUBLIC ROUTES === */}
        {/* These routes are visible to everyone, logged in or not */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* === PROTECTED ROUTES === */}
        {/* These routes are only accessible if the user is logged in. */}
        {/* The ProtectedRoute component acts as the guard. */}
        <Route element={<ProtectedRoute />}>
          <Route path="/*" element={<Home />} />
        </Route>
      </Routes>
      </GeneralContextProvider>
    </CookiesProvider>
  );
}

export default App;