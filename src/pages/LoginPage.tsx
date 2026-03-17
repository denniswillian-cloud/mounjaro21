import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';
import { useLang } from '../contexts';
import { t } from '../translations';
import { Eye, EyeOff, Leaf } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const { lang } = useLang();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    const ok = await login(email, password);
    setSubmitting(false);
    if (ok) {
      navigate('/');
    } else {
      setError(t(lang, 'loginError'));
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: '#060E08' }}
    >
      {/* Background glows */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(61,255,122,0.06) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '0', right: '0',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(255,217,61,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="w-full max-w-sm relative z-10">

        {/* Logo */}
        <div className="text-center mb-10">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 neon-pulse"
            style={{
              background: 'rgba(61,255,122,0.08)',
              border: '1.5px solid rgba(61,255,122,0.3)',
            }}
          >
            <Leaf size={36} color="#3DFF7A" />
          </div>
          <h1
            className="font-bold text-2xl mb-1 leading-tight"
            style={{ color: '#E2F2E6', letterSpacing: '-0.03em' }}
          >
            Efecto Mounjaro Natural
          </h1>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: '#5E8C6A' }}>
            {t(lang, 'welcome')}
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-7"
          style={{
            background: '#0C1A0E',
            border: '1px solid rgba(61,255,122,0.12)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#8DB39A' }}>
                {t(lang, 'email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="input-dark w-full px-4 py-3.5 rounded-xl"
                style={{ fontSize: '16px' }}
                placeholder="email@ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#8DB39A' }}>
                {t(lang, 'password')}
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="input-dark w-full px-4 py-3.5 pr-12 rounded-xl"
                  style={{ fontSize: '16px' }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: '#5E8C6A' }}
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                className="text-sm px-4 py-3 rounded-xl"
                style={{
                  background: 'rgba(255,80,80,0.08)',
                  border: '1px solid rgba(255,80,80,0.2)',
                  color: '#ff6b6b',
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-gold w-full py-4 rounded-xl font-bold transition-all active:scale-95 mt-2"
              style={{ fontSize: '16px', opacity: submitting ? 0.7 : 1 }}
            >
              {submitting ? '...' : t(lang, 'login')}
            </button>
          </form>

        </div>

        <p className="text-center text-xs mt-6" style={{ color: '#3E6348' }}>
          El plan natural de 21 días para acelerar tu metabolismo
        </p>
      </div>
    </div>
  );
}
