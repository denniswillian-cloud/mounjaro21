import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ChevronRight, Download, Sparkles, Clock, Leaf, Flame, Droplets } from 'lucide-react';
import { useLang, useContent, useProgress } from '../contexts';
import { t } from '../translations';
import CommentsSection from '../components/CommentsSection';
import confetti from 'canvas-confetti';

// Determine category neon color
function getCatNeon(categoryId: string): string {
  const map: Record<string, string> = {
    digestivos: '#3DFF7A',
    termogenicos: '#FF7B3A',
    desinflamantes: '#47E5D8',
    antioxidantes: '#C084FC',
    habitos: '#FFD93D',
    fase1: '#3DFF7A',
    fase2: '#FF7B3A',
    fase3: '#FFD93D',
    intro: '#3DFF7A',
    downloads: '#3DFF7A',
  };
  return map[categoryId] ?? '#3DFF7A';
}

// Recipe layout
function RecipeLayout({ chapter }: { chapter: any }) {
  const { lang } = useLang();
  const { markComplete, isComplete } = useProgress();
  const navigate = useNavigate();
  const { chapters, categories } = useContent();
  const [justCompleted, setJustCompleted] = useState(false);

  const neon = chapter.neonColor ?? getCatNeon(chapter.categoryId);
  const cat = categories.find((c: any) => c.id === chapter.categoryId);
  const sortedInCat = chapters
    .filter((c: any) => c.categoryId === chapter.categoryId)
    .sort((a: any, b: any) => a.order - b.order);
  const currentIdx = sortedInCat.findIndex((c: any) => c.id === chapter.id);
  const nextChapter = sortedInCat[currentIdx + 1];
  const prevChapter = sortedInCat[currentIdx - 1];
  const done = isComplete(chapter.id);
  const teaChapter = chapter.recommendedTea
    ? chapters.find((c: any) => c.id === chapter.recommendedTea) ?? null
    : null;

  const handleComplete = () => {
    markComplete(chapter.id);
    setJustCompleted(true);
    setTimeout(() => setJustCompleted(false), 2500);

    // 🎉 Animação de confetti
    const colors = ['#3DFF7A', '#7AFFB2', '#FFD93D', '#FF7B3A', '#C084FC', '#47E5D8', '#ffffff'];
    const base = { colors, zIndex: 9999, disableForReducedMotion: false };

    // Explosão central imediata
    confetti({ ...base, particleCount: 150, spread: 90, origin: { x: 0.5, y: 0.6 }, scalar: 1.2, gravity: 0.8, ticks: 250 });

    // Chuva lateral — 200ms depois
    setTimeout(() => {
      confetti({ ...base, particleCount: 70, angle: 55, spread: 60, origin: { x: 0, y: 0.65 }, scalar: 1.0 });
      confetti({ ...base, particleCount: 70, angle: 125, spread: 60, origin: { x: 1, y: 0.65 }, scalar: 1.0 });
    }, 200);

    // Terceira onda — 500ms depois
    setTimeout(() => {
      confetti({ ...base, particleCount: 60, angle: 60, spread: 50, origin: { x: 0.1, y: 0.5 }, scalar: 0.9 });
      confetti({ ...base, particleCount: 60, angle: 120, spread: 50, origin: { x: 0.9, y: 0.5 }, scalar: 0.9 });
    }, 500);

    // Última chuva do topo — 900ms depois
    setTimeout(() => {
      confetti({ ...base, particleCount: 80, spread: 120, origin: { x: 0.5, y: 0.2 }, gravity: 1.2, scalar: 0.8, ticks: 180 });
    }, 900);
  };

  return (
    <div className="page-enter min-h-screen has-bottom-nav" style={{ background: '#060E08' }}>
      {/* Cover header */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #060E08 0%, ${neon}10 100%)`,
          borderBottom: `1px solid ${neon}15`,
          minHeight: '200px',
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(circle at 70% 50%, ${neon}08, transparent 60%)`,
        }} />

        <div className="relative max-w-3xl mx-auto px-4 pt-5 pb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium mb-8 transition-opacity hover:opacity-80"
            style={{ color: '#5E8C6A' }}
          >
            <ArrowLeft size={18} />
            {t(lang, 'backButton')}
          </button>

          {cat && (
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold"
              style={{ background: `${neon}15`, color: neon, border: `1px solid ${neon}30` }}
            >
              {cat.icon} {cat.title}
            </div>
          )}

          <div className="flex items-start gap-4">
            <div
              className="text-5xl shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: `${neon}10`, border: `1px solid ${neon}20` }}
            >
              {chapter.emoji || '🍵'}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="font-bold text-2xl md:text-3xl mb-1" style={{ color: '#E2F2E6', letterSpacing: '-0.02em' }}>
                {chapter.title}
              </h1>
              <p style={{ color: '#5E8C6A' }} className="text-sm">{chapter.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-4 -mt-4 pb-10 relative z-10 space-y-4">

        {/* Summary */}
        <div
          className="rounded-2xl p-5"
          style={{ background: '#0C1A0E', border: `1px solid ${neon}12` }}
        >
          <p className="text-sm leading-relaxed" style={{ color: '#8DB39A' }}>{chapter.summary}</p>
        </div>

        {/* Ingredients (recipe) */}
        {chapter.ingredients && chapter.ingredients.length > 0 && (
          <div className="rounded-2xl p-5" style={{ background: '#0C1A0E', border: `1px solid ${neon}15` }}>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: `${neon}15` }}
              >
                <Leaf size={14} color={neon} />
              </div>
              <span className="text-sm font-bold uppercase tracking-wider" style={{ color: neon }}>
                {t(lang, 'ingredients')}
              </span>
            </div>
            <ul className="space-y-2.5">
              {chapter.ingredients.map((ing: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                    style={{ background: neon, boxShadow: `0 0 4px ${neon}` }}
                  />
                  <span className="text-sm" style={{ color: '#C8E0CB' }}>{ing}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Steps (recipe) */}
        {chapter.steps && chapter.steps.length > 0 && (
          <div className="rounded-2xl p-5" style={{ background: '#0C1A0E', border: `1px solid ${neon}15` }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${neon}15` }}>
                <Flame size={14} color={neon} />
              </div>
              <span className="text-sm font-bold uppercase tracking-wider" style={{ color: neon }}>
                {t(lang, 'preparation')}
              </span>
            </div>
            <ol className="space-y-3">
              {chapter.steps.map((step: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                    style={{ background: `${neon}15`, color: neon, border: `1px solid ${neon}25` }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-sm leading-relaxed pt-0.5" style={{ color: '#C8E0CB' }}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Best time */}
        {chapter.bestTime && (
          <div
            className="rounded-2xl p-4 flex items-center gap-3"
            style={{ background: `${neon}08`, border: `1px solid ${neon}20` }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${neon}15` }}>
              <Clock size={16} color={neon} />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: neon }}>
                {t(lang, 'bestTime')}
              </div>
              <div className="text-sm" style={{ color: '#C8E0CB' }}>{chapter.bestTime}</div>
            </div>
          </div>
        )}

        {/* Main content (if not a recipe) */}
        {!chapter.ingredients && (
          <div className="rounded-2xl p-5" style={{ background: '#0C1A0E', border: `1px solid ${neon}12` }}>
            <div className="flex items-center gap-2 mb-4">
              <Leaf size={15} color={neon} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: neon }}>
                {t(lang, 'mainContent')}
              </span>
            </div>
            <div className="text-sm leading-relaxed space-y-3" style={{ color: '#C8E0CB' }}>
              {chapter.content.split('\n').map((line: string, i: number) => (
                <p key={i} className={line.startsWith('•') || line.startsWith('✓') ? 'pl-2' : ''}
                  style={{ opacity: line === '' ? 0.3 : 1 }}>
                  {line || '—'}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Day objective */}
        {chapter.dayObjective && (
          <div
            className="rounded-2xl p-4 flex items-center gap-3"
            style={{ background: `${neon}08`, border: `1px solid ${neon}20` }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${neon}15` }}>
              <Droplets size={16} color={neon} />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: neon }}>
                {t(lang, 'dayObjective')}
              </div>
              <div className="text-sm font-semibold" style={{ color: '#E2F2E6' }}>{chapter.dayObjective}</div>
            </div>
          </div>
        )}

        {/* Daily habit */}
        {chapter.habit && (
          <div
            className="rounded-2xl p-5"
            style={{ background: 'rgba(255,217,61,0.05)', border: '1px solid rgba(255,217,61,0.2)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={15} color="#FFD93D" />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#FFD93D' }}>
                {t(lang, 'dailyHabit')}
              </span>
            </div>
            <p className="text-sm leading-relaxed font-medium" style={{ color: '#E2F2E6' }}>{chapter.habit}</p>
          </div>
        )}

        {/* Recommended Tea Shortcut */}
        {teaChapter && (() => {
          const teaNeon = teaChapter.neonColor ?? getCatNeon(teaChapter.categoryId);
          return (
            <button
              onClick={() => navigate(`/chapter/${teaChapter.id}`)}
              className="w-full flex items-center gap-3 rounded-2xl p-4 transition-all card-hover text-left"
              style={{ background: `${teaNeon}10`, border: `1.5px solid ${teaNeon}35` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: `${teaNeon}18`, border: `1px solid ${teaNeon}30` }}
              >
                {teaChapter.emoji || '🍵'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: teaNeon }}>
                  {t(lang, 'recommendedTea')}
                </p>
                <p className="text-sm font-semibold truncate" style={{ color: '#E2F2E6' }}>{teaChapter.title}</p>
                <p className="text-xs truncate" style={{ color: '#5E8C6A' }}>{teaChapter.subtitle}</p>
              </div>
              <ChevronRight size={16} color={teaNeon} className="shrink-0" />
            </button>
          );
        })()}

        {/* PDF download */}
        {chapter.pdfUrl && (
          <button
            onClick={() => {
              const url = chapter.pdfUrl!;
              const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/?]+)/);
              const driveOpen = url.match(/drive\.google\.com\/open\?id=([^&]+)/);
              let finalUrl = url;
              if (driveMatch) finalUrl = `https://drive.google.com/uc?export=download&id=${driveMatch[1]}`;
              else if (driveOpen) finalUrl = `https://drive.google.com/uc?export=download&id=${driveOpen[1]}`;
              else if (url.includes('dropbox.com')) finalUrl = url.replace('?dl=0','?dl=1').replace('www.dropbox.com','dl.dropboxusercontent.com');
              window.open(finalUrl, '_blank', 'noopener,noreferrer');
            }}
            className="flex items-center gap-3 rounded-2xl p-4 w-full transition-all card-hover"
            style={{ background: '#0C1A0E', border: '1px solid rgba(61,255,122,0.12)', cursor: 'pointer', textAlign: 'left' }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(61,255,122,0.1)' }}>
              <Download size={18} color="#3DFF7A" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold" style={{ color: '#E2F2E6' }}>{t(lang, 'downloadPdf')}</p>
              <p className="text-xs" style={{ color: '#5E8C6A' }}>{chapter.title}.pdf</p>
            </div>
            <ChevronRight size={16} color="#3E6348" />
          </button>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {!done ? (
            <button
              onClick={handleComplete}
              className="btn-neon flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm"
            >
              <CheckCircle size={18} />
              {t(lang, 'markComplete')}
            </button>
          ) : (
            <div
              className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm"
              style={{ background: 'rgba(61,255,122,0.08)', color: '#3DFF7A', border: '1px solid rgba(61,255,122,0.2)' }}
            >
              <CheckCircle size={18} />
              {t(lang, 'completed')}
            </div>
          )}

          {nextChapter && (
            <button
              onClick={() => navigate(`/chapter/${nextChapter.id}`)}
              className="btn-outline-neon flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-sm"
            >
              {t(lang, 'nextChapter')}
              <ChevronRight size={18} />
            </button>
          )}
        </div>

        {/* Navigation prev/next */}
        {(prevChapter || nextChapter) && (
          <div className="flex gap-2">
            {prevChapter && (
              <button
                onClick={() => navigate(`/chapter/${prevChapter.id}`)}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-medium transition-all"
                style={{ background: 'rgba(255,255,255,0.03)', color: '#5E8C6A', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <ArrowLeft size={14} />
                {prevChapter.title}
              </button>
            )}
          </div>
        )}

        {/* Success toast */}
        {justCompleted && (
          <div
            className="fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-2xl text-sm font-bold z-50"
            style={{
              background: '#0C1A0E',
              color: '#3DFF7A',
              border: '1px solid rgba(61,255,122,0.4)',
              boxShadow: '0 0 20px rgba(61,255,122,0.3)',
            }}
          >
            ✓ {t(lang, 'completed')} 🌿
          </div>
        )}

        {/* Comments */}
        <CommentsSection chapterId={chapter.id} />
      </div>
    </div>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────────
export default function ChapterPage() {
  const { id } = useParams<{ id: string }>();
  const { lang } = useLang();
  const { chapters } = useContent();

  const chapter = chapters.find((c: any) => c.id === id);
  if (!chapter) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ color: '#5E8C6A' }}>
        {t(lang, 'noContent')}
      </div>
    );
  }

  return <RecipeLayout chapter={chapter} />;
}
