import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, LogOut, Settings, BookOpen, Download, Users, Home, Leaf } from 'lucide-react';
import { useLang } from '../contexts';
import { useAuth } from '../contexts';
import { t, type Language } from '../translations';

const LANGS: { code: Language; label: string; flag: string }[] = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
];

export default function Header() {
  const { lang, setLang } = useLang();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navItems = [
    { path: '/', icon: Home, label: t(lang, 'home') },
    { path: '/chapters', icon: BookOpen, label: t(lang, 'chapters') },
    { path: '/library', icon: Download, label: t(lang, 'library') },
    { path: '/community', icon: Users, label: t(lang, 'community') },
    ...(user?.isAdmin ? [{ path: '/admin', icon: Settings, label: t(lang, 'admin') }] : []),
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(6,14,8,0.96)',
        borderBottom: '1px solid rgba(61,255,122,0.1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: 'rgba(61,255,122,0.1)',
              border: '1px solid rgba(61,255,122,0.25)',
            }}
          >
            <Leaf size={18} color="#3DFF7A" />
          </div>
          <div>
            <div className="font-bold text-sm leading-none" style={{ color: '#E2F2E6', letterSpacing: '-0.02em' }}>
              Efecto Mounjaro
            </div>
            <div className="text-xs leading-none mt-0.5 font-semibold" style={{ color: '#3DFF7A' }}>
              Natural · 21 Días
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all no-underline"
              style={{
                color: isActive(path) ? '#3DFF7A' : '#5E8C6A',
                background: isActive(path) ? 'rgba(61,255,122,0.08)' : 'transparent',
              }}
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => { setLangOpen(!langOpen); setMenuOpen(false); }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-semibold transition-all"
              style={{
                color: '#5E8C6A',
                border: '1px solid rgba(61,255,122,0.12)',
                background: langOpen ? 'rgba(61,255,122,0.06)' : 'transparent',
              }}
            >
              <Globe size={14} />
              <span>{lang.toUpperCase()}</span>
            </button>
            {langOpen && (
              <div
                className="absolute right-0 top-full mt-2 rounded-xl overflow-hidden z-50"
                style={{
                  background: '#0C1A0E',
                  border: '1px solid rgba(61,255,122,0.15)',
                  minWidth: '155px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
                }}
              >
                {LANGS.map(({ code, label, flag }) => (
                  <button
                    key={code}
                    onClick={() => { setLang(code); setLangOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-2.5"
                    style={{
                      color: lang === code ? '#3DFF7A' : '#5E8C6A',
                      background: lang === code ? 'rgba(61,255,122,0.08)' : 'transparent',
                    }}
                  >
                    <span>{flag}</span>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Logout desktop */}
          {user && (
            <button
              onClick={() => logout()}
              className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm transition-all"
              style={{ color: '#5E8C6A' }}
              title={t(lang, 'logout')}
            >
              <LogOut size={15} />
            </button>
          )}

          {/* Mobile menu */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: '#5E8C6A' }}
            onClick={() => { setMenuOpen(!menuOpen); setLangOpen(false); }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="md:hidden px-4 pb-5 pt-2"
          style={{ background: '#060E08', borderTop: '1px solid rgba(61,255,122,0.08)' }}
        >
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-4 px-4 py-4 rounded-2xl mb-1 text-base font-semibold no-underline transition-all"
              style={{
                color: isActive(path) ? '#3DFF7A' : '#8DB39A',
                background: isActive(path) ? 'rgba(61,255,122,0.08)' : 'transparent',
                fontSize: '16px',
              }}
            >
              <Icon size={22} />
              {label}
            </Link>
          ))}
          {user && (
            <button
              onClick={() => { setMenuOpen(false); logout(); }}
              className="flex items-center gap-4 px-4 py-4 w-full rounded-2xl text-base font-semibold mt-2"
              style={{ color: '#5E8C6A', borderTop: '1px solid rgba(61,255,122,0.08)', paddingTop: '16px' }}
            >
              <LogOut size={22} />
              {t(lang, 'logout')}
            </button>
          )}
        </div>
      )}

    </header>
    {(langOpen || menuOpen) && (
      <div className="fixed inset-0 z-40" onClick={() => { setLangOpen(false); setMenuOpen(false); }} />
    )}
  </>
  );
}

// ─── Mobile Bottom Navigation ──────────────────────────────────────────────────
export function BottomNav() {
  const { lang } = useLang();
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: t(lang, 'home') },
    { path: '/chapters', icon: BookOpen, label: t(lang, 'chapters') },
    { path: '/library', icon: Download, label: t(lang, 'library') },
    { path: '/community', icon: Users, label: t(lang, 'community') },
  ];

  if (!user) return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className="bottom-nav md:hidden"
    >
      <div className="flex items-center justify-around px-2 h-16">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className="flex flex-col items-center justify-center gap-0.5 flex-1 py-2 no-underline transition-all active:scale-95"
            style={{ color: isActive(path) ? '#3DFF7A' : '#5E8C6A' }}
          >
            <Icon size={20} />
            <span style={{ fontSize: '10px', fontWeight: 600, lineHeight: 1 }}>{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
