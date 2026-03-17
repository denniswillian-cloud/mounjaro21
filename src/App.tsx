import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LangProvider, AuthProvider, ContentProvider, ProgressProvider, useAuth } from './contexts';
import Header, { BottomNav } from './components/Header';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ChaptersPage from './pages/ChaptersPage';
import ChapterPage from './pages/ChapterPage';
import LibraryPage from './pages/LibraryPage';
import CommunityPage from './pages/CommunityPage';
import AdminPage from './pages/AdminPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#060E08', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 40, height: 40, border: '3px solid rgba(61,255,122,0.3)', borderTopColor: '#3DFF7A', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppLayout() {
  const { user, loading } = useAuth();
  return (
    <div style={{ minHeight: '100vh', background: '#F8F6F2' }}>
      {user && <Header />}
      {user && <BottomNav />}
      <Routes>
        <Route path="/login" element={
          loading ? null : user ? <Navigate to="/" replace /> : <LoginPage />
        } />
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/chapters" element={<ProtectedRoute><ChaptersPage /></ProtectedRoute>} />
        <Route path="/chapter/:id" element={<ProtectedRoute><ChapterPage /></ProtectedRoute>} />
        <Route path="/library" element={<ProtectedRoute><LibraryPage /></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LangProvider>
        <AuthProvider>
          <ContentProvider>
            <ProgressProvider>
              <AppLayout />
            </ProgressProvider>
          </ContentProvider>
        </AuthProvider>
      </LangProvider>
    </BrowserRouter>
  );
}
