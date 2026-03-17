import React, { useState, useEffect, useRef } from 'react';
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

// ─── PWA Install Modal ──────────────────────────────────────────────────────
function PWAInstallModal() {
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSSteps, setShowIOSSteps] = useState(false);
  const [installed, setInstalled] = useState(false);
  const prevUser = useRef<string | null>(null);

  useEffect(() => {
    // Captura o evento de instalação (Android/Chrome)
    const handler = (e: Event) => { e.preventDefault(); setInstallPrompt(e); };
    window.addEventListener('beforeinstallprompt', handler as any);

    // Detecta iOS
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIsIOS(ios);

    return () => window.removeEventListener('beforeinstallprompt', handler as any);
  }, []);

  useEffect(() => {
    // Já instalado como PWA?
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    // Já mostrou antes nesta sessão?
    if (sessionStorage.getItem('pwa_modal_shown')) return;

    // Mostra o modal quando o usuário acabou de fazer login (null → logado)
    if (user && prevUser.current === null) {
      setTimeout(() => setShow(true), 1200);
      sessionStorage.setItem('pwa_modal_shown', '1');
    }
    prevUser.current = user ? user.id : null;
  }, [user]);

  const handleInstall = async () => {
    if (isIOS) { setShowIOSSteps(true); return; }
    if (!installPrompt) return;
    installPrompt.prompt();
    const result = await installPrompt.userChoice;
    if (result.outcome === 'accepted') { setInstalled(true); setTimeout(() => setShow(false), 2000); }
  };

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      padding: '0 0 24px',
    }}>
      <div style={{
        width: '100%', maxWidth: 420, margin: '0 16px',
        background: '#0C1A0E',
        border: '1px solid rgba(61,255,122,0.2)',
        borderRadius: 24,
        padding: '28px 24px 24px',
        boxShadow: '0 -8px 60px rgba(61,255,122,0.08), 0 30px 80px rgba(0,0,0,0.6)',
        animation: 'slideUp 0.35s cubic-bezier(.22,1,.36,1)',
      }}>
        {/* Ícone */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18, margin: '0 auto 12px',
            background: 'rgba(61,255,122,0.08)',
            border: '1.5px solid rgba(61,255,122,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 30,
          }}>🌿</div>
          <h2 style={{ color: '#E2F2E6', fontSize: 20, fontWeight: 700, margin: '0 0 6px', letterSpacing: '-0.02em' }}>
            Instalar o App
          </h2>
          <p style={{ color: '#5E8C6A', fontSize: 14, lineHeight: 1.5, margin: 0 }}>
            Salve o app na sua tela inicial e acesse com 1 toque, mesmo sem internet
          </p>
        </div>

        {/* Benefícios */}
        <div style={{
          background: 'rgba(61,255,122,0.05)', borderRadius: 14,
          border: '1px solid rgba(61,255,122,0.1)',
          padding: '14px 16px', marginBottom: 20,
        }}>
          {['⚡ Abre instantaneamente', '📴 Funciona sem internet', '🔔 Receba notificações'].map(b => (
            <div key={b} style={{ color: '#8DB39A', fontSize: 13, padding: '4px 0' }}>{b}</div>
          ))}
        </div>

        {/* Instruções iOS */}
        {showIOSSteps && (
          <div style={{
            background: 'rgba(61,255,122,0.06)', borderRadius: 14,
            border: '1px solid rgba(61,255,122,0.15)',
            padding: '14px 16px', marginBottom: 16, fontSize: 13,
            color: '#8DB39A', lineHeight: 1.6, textAlign: 'center',
          }}>
            No iPhone: toque em <span style={{ color: '#3DFF7A', fontWeight: 700 }}>Compartilhar</span>
            {' '}→{' '}
            <span style={{ color: '#3DFF7A', fontWeight: 700 }}>Adicionar à Tela de Início</span>
          </div>
        )}

        {/* Botão instalar */}
        {!installed ? (
          <button onClick={handleInstall} style={{
            width: '100%', padding: '16px', borderRadius: 14,
            background: 'linear-gradient(135deg, #3DFF7A, #2BC45A)',
            border: 'none', color: '#060E08', fontWeight: 800,
            fontSize: 16, cursor: 'pointer', marginBottom: 10,
            letterSpacing: '-0.01em',
          }}>
            📲 Baixar App
          </button>
        ) : (
          <div style={{
            width: '100%', padding: '16px', borderRadius: 14,
            background: 'rgba(61,255,122,0.1)', border: '1px solid rgba(61,255,122,0.3)',
            color: '#3DFF7A', fontWeight: 700, fontSize: 15, textAlign: 'center',
          }}>
            ✅ App instalado com sucesso!
          </div>
        )}

        {/* Fechar */}
        <button onClick={() => setShow(false)} style={{
          width: '100%', padding: '12px', borderRadius: 14,
          background: 'transparent', border: '1px solid rgba(61,255,122,0.1)',
          color: '#3E6348', fontWeight: 600, fontSize: 14, cursor: 'pointer',
        }}>
          Agora não
        </button>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

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
      {user && <PWAInstallModal />}
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
