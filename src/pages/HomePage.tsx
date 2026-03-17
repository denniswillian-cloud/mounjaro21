import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, CheckCircle, Circle, Play, Leaf, Zap, Droplets, Sparkles } from 'lucide-react';
import { useLang, useContent, useProgress } from '../contexts';
import { t } from '../translations';
import type { Chapter } from '../data';

// ─── Hero ──────────────────────────────────────────────────────────────────────
function HeroBanner() {
  const { lang } = useLang();
  const { progress } = useProgress();
  const navigate = useNavigate();
  const pct = Math.round((progress.completedChapters.length / 21) * 100);

  return (
    <div className="relative overflow-hidden" style={{ background: '#060E08', minHeight: '440px' }}>
      {/* Glow balls */}
      <div className="absolute pointer-events-none" style={{
        top: '-80px', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '700px',
        background: 'radial-gradient(circle, rgba(61,255,122,0.07) 0%, transparent 65%)',
      }} />
      <div className="absolute pointer-events-none" style={{
        bottom: '-100px', right: '-100px',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(255,217,61,0.05) 0%, transparent 65%)',
      }} />

      <div className="relative max-w-7xl mx-auto px-5 pt-14 pb-16 flex flex-col md:flex-row items-center gap-10">
        {/* Left: text */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 badge-neon mb-5">
            <Leaf size={11} />
            {t(lang, 'heroBadge')}
          </div>

          <h1
            className="font-bold leading-tight mb-4"
            style={{
              color: '#E2F2E6',
              fontSize: 'clamp(28px, 5vw, 46px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
            }}
          >
            {t(lang, 'heroTitle')}
          </h1>

          <p className="text-base mb-8 leading-relaxed" style={{ color: '#5E8C6A', maxWidth: '480px' }}>
            {t(lang, 'heroSubtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <button
              onClick={() => navigate('/chapters')}
              className="btn-gold flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm"
            >
              <Play size={16} fill="currentColor" />
              {t(lang, 'heroCta')}
            </button>
            <button
              onClick={() => navigate('/chapters')}
              className="btn-outline-neon flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm"
            >
              {t(lang, 'heroSecondary')}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Right: progress card */}
        <div
          className="w-full md:w-72 rounded-2xl p-6 shrink-0"
          style={{
            background: 'rgba(12,26,14,0.9)',
            border: '1px solid rgba(61,255,122,0.15)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#5E8C6A' }}>
              {t(lang, 'progressLabel')}
            </span>
            <span
              className="text-xs px-2.5 py-1 rounded-full font-bold"
              style={{
                background: pct > 0 ? 'rgba(61,255,122,0.12)' : 'rgba(255,255,255,0.04)',
                color: pct > 0 ? '#3DFF7A' : '#5E8C6A',
                border: pct > 0 ? '1px solid rgba(61,255,122,0.2)' : '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {pct}%
            </span>
          </div>

          <div
            className="text-4xl font-bold mb-1"
            style={{ color: '#E2F2E6', letterSpacing: '-0.03em', fontFamily: 'Inter, sans-serif' }}
          >
            {t(lang, 'dayOf', { current: progress.currentDay })}
          </div>

          <div className="mt-4 mb-4 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div
              className="h-full rounded-full progress-fill"
              style={{
                width: `${(progress.currentDay / 21) * 100}%`,
                background: 'linear-gradient(90deg, #3DFF7A, #7AFFB2)',
                boxShadow: '0 0 10px rgba(61,255,122,0.5)',
              }}
            />
          </div>

          <p className="text-sm" style={{ color: '#5E8C6A' }}>{t(lang, 'nextStep')}</p>
        </div>
      </div>
    </div>
  );
}

// ─── 21-Days Grid ──────────────────────────────────────────────────────────────
function DaysGrid() {
  const { lang } = useLang();
  const { progress, isComplete } = useProgress();
  const navigate = useNavigate();
  const { chapters } = useContent();

  const dayChapters = chapters
    .filter(c => c.categoryId === 'fase1' || c.categoryId === 'fase2' || c.categoryId === 'fase3')
    .sort((a, b) => {
      const phaseOrder: Record<string, number> = { fase1: 0, fase2: 1, fase3: 2 };
      const po = (phaseOrder[a.categoryId] ?? 0) - (phaseOrder[b.categoryId] ?? 0);
      if (po !== 0) return po;
      return a.order - b.order;
    });

  const phaseColors = ['#3DFF7A', '#FF7B3A', '#FFD93D'];
  const phaseLabels = ['Fase 1', 'Fase 2', 'Fase 3'];

  return (
    <div className="px-4 md:px-6 mb-10">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-y-2">
        <h2 className="font-bold text-lg" style={{ color: '#E2F2E6', letterSpacing: '-0.02em' }}>
          {t(lang, 'daysSection')}
        </h2>
        <div className="flex gap-3 items-center flex-wrap">
          {phaseColors.map((c, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: c, boxShadow: `0 0 6px ${c}` }} />
              <span className="text-xs" style={{ color: '#5E8C6A' }}>{phaseLabels[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 21 }, (_, i) => {
          const day = i + 1;
          const chapter = dayChapters[i];
          const done = chapter ? isComplete(chapter.id) : false;
          const current = day === progress.currentDay;
          const phaseIdx = Math.floor(i / 7);
          const phaseColor = phaseColors[phaseIdx];

          return (
            <button
              key={day}
              onClick={() => chapter && navigate(`/chapter/${chapter.id}`)}
              className="aspect-square rounded-xl flex flex-col items-center justify-center transition-all active:scale-95"
              style={{
                background: done
                  ? `${phaseColor}18`
                  : current
                    ? 'rgba(255,217,61,0.08)'
                    : 'rgba(255,255,255,0.03)',
                border: done
                  ? `1px solid ${phaseColor}40`
                  : current
                    ? '1.5px solid rgba(255,217,61,0.6)'
                    : '1px solid rgba(255,255,255,0.05)',
                boxShadow: current ? '0 0 12px rgba(255,217,61,0.2)' : 'none',
                color: done ? phaseColor : current ? '#FFD93D' : '#3E6348',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              {done ? <CheckCircle size={14} color={phaseColor} /> : day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Tea Category Tabs ─────────────────────────────────────────────────────────
function TeaSection() {
  const { lang } = useLang();
  const { categories, chapters } = useContent();
  const { isComplete } = useProgress();
  const navigate = useNavigate();

  const teaCats = [
    { id: 'digestivos', label: t(lang, 'digestivos'), icon: '🍵', neon: '#3DFF7A', count: 7 },
    { id: 'termogenicos', label: t(lang, 'termogenicos'), icon: '🔥', neon: '#FF7B3A', count: 8 },
    { id: 'desinflamantes', label: t(lang, 'desinflamantes'), icon: '💧', neon: '#47E5D8', count: 7 },
    { id: 'antioxidantes', label: t(lang, 'antioxidantes'), icon: '✨', neon: '#C084FC', count: 8 },
  ];

  const [activeTab, setActiveTab] = useState(teaCats[0].id);
  const activeConfig = teaCats.find(t => t.id === activeTab)!;
  const teas = chapters
    .filter(c => c.categoryId === activeTab)
    .sort((a, b) => a.order - b.order);

  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between px-4 md:px-6 mb-4">
        <h2 className="font-bold text-lg" style={{ color: '#E2F2E6', letterSpacing: '-0.02em' }}>
          {t(lang, 'recipesSection')}
        </h2>
        <span className="badge-neon">{t(lang, 'recipes30')}</span>
      </div>

      {/* Tab bar */}
      <div className="scroll-x flex gap-2 px-4 md:px-6 mb-4">
        {teaCats.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all"
            style={{
              background: activeTab === cat.id ? `${cat.neon}18` : 'rgba(255,255,255,0.04)',
              border: `1px solid ${activeTab === cat.id ? `${cat.neon}50` : 'rgba(255,255,255,0.07)'}`,
              color: activeTab === cat.id ? cat.neon : '#5E8C6A',
              boxShadow: activeTab === cat.id ? `0 0 12px ${cat.neon}30` : 'none',
            }}
          >
            {cat.icon} {cat.label.split(' ')[1]}
          </button>
        ))}
      </div>

      {/* Tea cards */}
      <div ref={rowRef} className="scroll-x flex gap-3 px-4 md:px-6 pb-2">
        {teas.map(tea => {
          const done = isComplete(tea.id);
          return (
            <button
              key={tea.id}
              onClick={() => navigate(`/chapter/${tea.id}`)}
              className="card-hover shrink-0 rounded-2xl overflow-hidden text-left cursor-pointer"
              style={{
                width: '180px',
                background: '#0C1A0E',
                border: `1px solid ${activeConfig.neon}20`,
                padding: 0,
              }}
            >
              {/* Top color bar */}
              <div
                className="h-1.5 w-full"
                style={{ background: activeConfig.neon, boxShadow: `0 0 8px ${activeConfig.neon}50` }}
              />
              <div className="h-24 flex items-center justify-center text-4xl"
                style={{ background: `${activeConfig.neon}08` }}>
                {tea.emoji || '🍵'}
              </div>
              <div className="px-3.5 pb-4 pt-2">
                <div className="flex items-start justify-between gap-1 mb-1">
                  <span className="text-white font-semibold text-xs leading-tight">{tea.title}</span>
                  {done
                    ? <CheckCircle size={13} color={activeConfig.neon} className="shrink-0 mt-0.5" />
                    : <Circle size={13} color="rgba(255,255,255,0.2)" className="shrink-0 mt-0.5" />}
                </div>
                <p className="text-xs leading-relaxed line-clamp-2" style={{ color: '#5E8C6A' }}>
                  {tea.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Phases Cards ──────────────────────────────────────────────────────────────
function PhasesSection() {
  const { lang } = useLang();
  const navigate = useNavigate();
  const { chapters } = useContent();
  const { isComplete } = useProgress();

  const phases = [
    {
      id: 'fase1', title: 'Fase 1', subtitle: 'Activación Metabólica',
      days: '1–7', icon: '🌱', neon: '#3DFF7A',
      desc: 'Apoyar la digestión, reducir inflamación e introducir hábitos equilibrados.',
    },
    {
      id: 'fase2', title: 'Fase 2', subtitle: 'Quema Metabólica',
      days: '8–14', icon: '🔥', neon: '#FF7B3A',
      desc: 'Estimular el gasto energético y favorecer el uso eficiente de la energía.',
    },
    {
      id: 'fase3', title: 'Fase 3', subtitle: 'Optimización Metabólica',
      days: '15–21', icon: '⭐', neon: '#FFD93D',
      desc: 'Consolidar los hábitos adquiridos y mantener una rutina estable a largo plazo.',
    },
  ];

  return (
    <div className="mb-10 px-4 md:px-6">
      <h2 className="font-bold text-lg mb-4" style={{ color: '#E2F2E6', letterSpacing: '-0.02em' }}>
        {t(lang, 'phasesSection')}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {phases.map(phase => {
          const phaseDays = chapters
            .filter(c => c.categoryId === phase.id)
            .sort((a, b) => a.order - b.order);
          const completed = phaseDays.filter(c => isComplete(c.id)).length;
          const total = phaseDays.length;

          return (
            <button
              key={phase.id}
              onClick={() => navigate(`/chapters?cat=${phase.id}`)}
              className="card-hover text-left rounded-2xl p-5 transition-all"
              style={{
                background: '#0C1A0E',
                border: `1px solid ${phase.neon}20`,
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${phase.neon}12`, border: `1px solid ${phase.neon}25` }}
                >
                  {phase.icon}
                </div>
                <span
                  className="text-xs font-bold px-2 py-1 rounded-full"
                  style={{ background: `${phase.neon}12`, color: phase.neon }}
                >
                  Días {phase.days}
                </span>
              </div>

              <div className="font-bold text-sm mb-0.5" style={{ color: '#E2F2E6' }}>{phase.title}</div>
              <div className="text-xs font-semibold mb-2" style={{ color: phase.neon }}>{phase.subtitle}</div>
              <p className="text-xs leading-relaxed mb-3" style={{ color: '#5E8C6A' }}>{phase.desc}</p>

              {/* Mini progress */}
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div
                  className="h-full rounded-full progress-fill"
                  style={{
                    width: total > 0 ? `${(completed / total) * 100}%` : '0%',
                    background: phase.neon,
                    boxShadow: `0 0 6px ${phase.neon}60`,
                  }}
                />
              </div>
              <div className="text-xs mt-1.5" style={{ color: '#3E6348' }}>
                {completed}/{total} días completados
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Habits Row ────────────────────────────────────────────────────────────────
function HabitsRow() {
  const { lang } = useLang();
  const { chapters } = useContent();
  const { isComplete } = useProgress();
  const navigate = useNavigate();
  const rowRef = useRef<HTMLDivElement>(null);

  const habits = chapters.filter(c => c.categoryId === 'habitos').sort((a, b) => a.order - b.order);

  const icons = [Droplets, Zap, Leaf, Sparkles, Leaf, Zap, Droplets];

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between px-4 md:px-6 mb-4">
        <h2 className="font-bold text-lg" style={{ color: '#E2F2E6', letterSpacing: '-0.02em' }}>
          {t(lang, 'habitsSection')}
        </h2>
        <div className="flex gap-1">
          <button
            onClick={() => rowRef.current?.scrollBy({ left: -220, behavior: 'smooth' })}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{ background: 'rgba(255,255,255,0.04)', color: '#5E8C6A', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <ChevronLeft size={15} />
          </button>
          <button
            onClick={() => rowRef.current?.scrollBy({ left: 220, behavior: 'smooth' })}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{ background: 'rgba(255,255,255,0.04)', color: '#5E8C6A', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      <div ref={rowRef} className="scroll-x flex gap-3 px-4 md:px-6 pb-2">
        {habits.map((habit, i) => {
          const done = isComplete(habit.id);
          const Icon = icons[i % icons.length];
          return (
            <button
              key={habit.id}
              onClick={() => navigate(`/chapter/${habit.id}`)}
              className="card-hover shrink-0 rounded-2xl overflow-hidden text-left cursor-pointer"
              style={{
                width: '175px',
                background: '#0C1A0E',
                border: '1px solid rgba(255,217,61,0.12)',
                padding: 0,
              }}
            >
              <div
                className="h-24 flex items-center justify-center"
                style={{ background: 'rgba(255,217,61,0.05)' }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(255,217,61,0.12)', border: '1px solid rgba(255,217,61,0.2)' }}
                >
                  <Icon size={22} color="#FFD93D" />
                </div>
              </div>
              <div className="px-3.5 pb-4 pt-2">
                <div className="flex items-start justify-between gap-1 mb-1">
                  <span className="text-white font-semibold text-xs leading-tight">{habit.title}</span>
                  {done
                    ? <CheckCircle size={13} color="#FFD93D" className="shrink-0 mt-0.5" />
                    : <Circle size={13} color="rgba(255,255,255,0.2)" className="shrink-0 mt-0.5" />}
                </div>
                <p className="text-xs leading-relaxed line-clamp-2" style={{ color: '#5E8C6A' }}>
                  {habit.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Stats Bar ─────────────────────────────────────────────────────────────────
function StatsBar() {
  const { chapters } = useContent();
  const teasTotal = chapters.filter(c => ['digestivos', 'termogenicos', 'desinflamantes', 'antioxidantes'].includes(c.categoryId)).length;

  const stats = [
    { label: 'Días', value: '21', icon: '📅', neon: '#3DFF7A' },
    { label: 'Recetas', value: String(teasTotal), icon: '🍵', neon: '#FF7B3A' },
    { label: 'Fases', value: '3', icon: '🏆', neon: '#FFD93D' },
    { label: 'Hábitos', value: '7', icon: '💪', neon: '#C084FC' },
  ];

  return (
    <div
      className="mx-4 md:mx-6 mb-10 rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(61,255,122,0.1)', background: '#0C1A0E' }}
    >
      <div className="grid grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="text-center py-5 px-2"
            style={{
              borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
            }}
          >
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="font-bold text-xl" style={{ color: s.neon }}>{s.value}</div>
            <div className="text-xs" style={{ color: '#3E6348' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="page-enter min-h-screen has-bottom-nav" style={{ background: '#060E08' }}>
      <HeroBanner />
      <div className="max-w-7xl mx-auto py-8">
        <StatsBar />
        <DaysGrid />
        <PhasesSection />
        <TeaSection />
        <HabitsRow />
      </div>
    </div>
  );
}
