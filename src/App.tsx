import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LangProvider, AuthProvider, ContentProvider, ProgressProvider, useAuth, useLang, useProgress } from './contexts';
import { t } from './translations';

// VAPID public key (safe to expose in frontend)
const VAPID_PUBLIC_KEY = 'BMWHn02Ig3J0lVjcjp7NdxzfcdhNggMPBpVPcHVyFFc_Xe3GNlN-YZWaVEHdRaZgIgabd62w4XGJS4UbtP6nldI';
import Header, { BottomNav } from './components/Header';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ChaptersPage from './pages/ChaptersPage';
import ChapterPage from './pages/ChapterPage';
import LibraryPage from './pages/LibraryPage';
import CommunityPage from './pages/CommunityPage';
import AdminPage from './pages/AdminPage';

// ─── PWA Install Modal ──────────────────────────────────────────────────────
declare global { interface Window { __pwaPrompt: any; } }

function PWAInstallModal() {
  const { user } = useAuth();
  const { lang } = useLang();
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSSteps, setShowIOSSteps] = useState(false);
  const [installed, setInstalled] = useState(false);
  const prevUser = useRef<string | null>(null);

  useEffect(() => {
    // Detecta iOS
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIsIOS(ios);
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
    const prompt = window.__pwaPrompt;
    if (!prompt) return;
    prompt.prompt();
    const result = await prompt.userChoice;
    if (result.outcome === 'accepted') {
      window.__pwaPrompt = null;
      setInstalled(true);
      setTimeout(() => setShow(false), 2000);
    }
  };

  if (!show) return null;

  // Verifica se é mobile pelo viewport
  const isMobile = window.innerWidth <= 640;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: isMobile ? 'flex-end' : 'center',
      justifyContent: 'center',
      padding: isMobile ? '0 0 24px' : '0',
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
            {t(lang, 'pwaTitle')}
          </h2>
          <p style={{ color: '#5E8C6A', fontSize: 14, lineHeight: 1.5, margin: 0 }}>
            {t(lang, 'pwaSubtitle')}
          </p>
        </div>

        {/* Benefícios */}
        <div style={{
          background: 'rgba(61,255,122,0.05)', borderRadius: 14,
          border: '1px solid rgba(61,255,122,0.1)',
          padding: '14px 16px', marginBottom: 20,
        }}>
          {[t(lang,'pwaFeature1'), t(lang,'pwaFeature2'), t(lang,'pwaFeature3')].map(b => (
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
            {t(lang, 'pwaIOSHint')}
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
            {t(lang, 'pwaButton')}
          </button>
        ) : (
          <div style={{
            width: '100%', padding: '16px', borderRadius: 14,
            background: 'rgba(61,255,122,0.1)', border: '1px solid rgba(61,255,122,0.3)',
            color: '#3DFF7A', fontWeight: 700, fontSize: 15, textAlign: 'center',
          }}>
            {t(lang, 'pwaInstalled')}
          </div>
        )}

        {/* Fechar */}
        <button onClick={() => setShow(false)} style={{
          width: '100%', padding: '12px', borderRadius: 14,
          background: 'transparent', border: '1px solid rgba(61,255,122,0.1)',
          color: '#3E6348', fontWeight: 600, fontSize: 14, cursor: 'pointer',
        }}>
          {t(lang, 'pwaLater')}
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

// ─── Update Banner ──────────────────────────────────────────────────────────
function UpdateBanner() {
  const { lang } = useLang();
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.ready.then(reg => {
      reg.addEventListener('updatefound', () => {
        const newSW = reg.installing;
        if (!newSW) return;
        newSW.addEventListener('statechange', () => {
          if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
            setShowUpdate(true);
          }
        });
      });
    });
    // Detecta quando um novo SW toma controle (recarregar automaticamente)
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) { refreshing = true; window.location.reload(); }
    });
  }, []);

  if (!showUpdate) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 72, left: '50%', transform: 'translateX(-50%)',
      zIndex: 9998, width: 'calc(100% - 32px)', maxWidth: 400,
      background: '#0C1A0E', border: '1px solid rgba(61,255,122,0.3)',
      borderRadius: 16, padding: '12px 16px',
      boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
      animation: 'slideUp 0.3s cubic-bezier(.22,1,.36,1)',
    }}>
      <span style={{ color: '#8DB39A', fontSize: 13, fontWeight: 500 }}>
        {t(lang, 'updateAvailable')}
      </span>
      <button
        onClick={() => {
          navigator.serviceWorker.ready.then(reg => reg.waiting?.postMessage({ type: 'SKIP_WAITING' }));
        }}
        style={{
          background: 'linear-gradient(135deg, #3DFF7A, #2BC45A)',
          border: 'none', borderRadius: 10, padding: '8px 16px',
          color: '#060E08', fontWeight: 700, fontSize: 13, cursor: 'pointer',
          whiteSpace: 'nowrap', flexShrink: 0,
        }}
      >
        {t(lang, 'updateButton')}
      </button>
    </div>
  );
}

// ─── Push Notifications Banner ────────────────────────────────────────────────
function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray.buffer as ArrayBuffer;
}

function PushNotificationBanner() {
  const { user } = useAuth();
  const { lang } = useLang();
  const { progress } = useProgress();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
    if (Notification.permission === 'granted' || Notification.permission === 'denied') return;
    if (sessionStorage.getItem('push_banner_shown')) return;
    // Only show if user has completed at least 1 day
    if (progress.completedChapters.length < 1) return;

    setShow(true);
    sessionStorage.setItem('push_banner_shown', '1');
  }, [user, progress.completedChapters.length]);

  const handleEnable = async () => {
    setShow(false);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return;

      const reg = await navigator.serviceWorker.ready;
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });

      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription, userId: user!.id, lang }),
      });
    } catch (err) {
      console.error('Push subscription failed:', err);
    }
  };

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 72, left: '50%', transform: 'translateX(-50%)',
      zIndex: 9997, width: 'calc(100% - 32px)', maxWidth: 400,
      background: '#0C1A0E', border: '1px solid rgba(61,255,122,0.25)',
      borderRadius: 16, padding: '12px 16px',
      boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', gap: 10,
      animation: 'slideUp 0.3s cubic-bezier(.22,1,.36,1)',
    }}>
      <span style={{ fontSize: 18 }}>🔔</span>
      <span style={{ color: '#8DB39A', fontSize: 13, fontWeight: 500, flex: 1 }}>
        {t(lang, 'notifBanner')}
      </span>
      <button
        onClick={handleEnable}
        style={{
          background: 'linear-gradient(135deg, #3DFF7A, #2BC45A)',
          border: 'none', borderRadius: 10, padding: '7px 14px',
          color: '#060E08', fontWeight: 700, fontSize: 12, cursor: 'pointer',
          whiteSpace: 'nowrap', flexShrink: 0,
        }}
      >
        {t(lang, 'notifEnable')}
      </button>
      <button
        onClick={() => setShow(false)}
        style={{
          background: 'transparent', border: 'none',
          color: '#3E6348', fontSize: 13, fontWeight: 600,
          cursor: 'pointer', padding: '4px 6px', flexShrink: 0,
        }}
      >
        ✕
      </button>
    </div>
  );
}

function AppLayout() {
  const { user, loading } = useAuth();
  return (
    <div style={{ minHeight: '100vh', background: '#F8F6F2' }}>
      {user && <Header />}
      {user && <BottomNav />}
      {user && <PWAInstallModal />}
      <UpdateBanner />
      <PushNotificationBanner />
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
