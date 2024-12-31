import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SupabaseProvider } from './contexts/SupabaseContext';
import { AuthErrorBoundary } from './components/auth/AuthErrorBoundary';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { ManuscriptDashboard } from './pages/manuscripts/ManuscriptDashboard';
import { NewManuscript } from './pages/manuscripts/NewManuscript';
import { ManuscriptDetail } from './pages/manuscripts/ManuscriptDetail';
import { ReviewTemplates } from './pages/admin/ReviewTemplates';
import { ConnectionStatus } from './components/shared/ConnectionStatus';
import { PrivateRoute } from './components/auth/PrivateRoute';

export function App() {
  return (
    <SupabaseProvider>
      <AuthErrorBoundary>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
                <Route index element={<Home />} />
                <Route path="manuscripts">
                  <Route index element={<ManuscriptDashboard />} />
                  <Route path="new" element={<NewManuscript />} />
                  <Route path=":id" element={<ManuscriptDetail />} />
                </Route>
                <Route path="admin">
                  <Route path="review-templates" element={<ReviewTemplates />} />
                </Route>
              </Route>
            </Routes>
            <ConnectionStatus />
          </BrowserRouter>
        </AuthProvider>
      </AuthErrorBoundary>
    </SupabaseProvider>
  );
}