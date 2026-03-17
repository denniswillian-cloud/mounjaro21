import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Circle, ChevronRight, Search } from 'lucide-react';
import { useLang, useContent, useProgress } from '../contexts';
import { t } from '../translations';

function getCatNeon(categoryId: string): string {
  const map: Record<string, string> = {
    digestivos: '#3DFF7A', termogenicos: '#FF7B3A',
    desinflamantes: '#47E5D8', antioxidantes: '#C084FC',
    habitos: '#FFD93D', fase1: '#3DFF7A', fase2: '#FF7B3A',
    fase3: '#FFD93D', intro: '#3DFF7A', downloads: '#3DFF7A',
  };
  return map[categoryId] ?? '#3DFF7A';
}

export default function ChaptersPage() {
  const { lang } = useLang();
  const { categories, chapters } = useContent();
  const { isComplete } = useProgress();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) setActiveTab(cat);
  }, [searchParams]);

  const tabGroups = [
    { id: 'all', label: 'Todo', icon: '🌿' },
    { id: 'intro', label: 'Intro', icon: '📖' },
    { id: 'fase1', label: 'Fase 1', icon: '🌱' },
    { id: 'fase2', label: 'Fase 2', icon: '🔥' },
    { id: 'fase3', label: 'Fase 3', icon: '⭐' },
    { id: 'digestivos', label: 'Digestivos', icon: '🍵' },
    { id: 'termogenicos', label: 'Termogénicos', icon: '🔥' },
    { id: 'desinflamantes', label: 'Desinflamantes', icon: '💧' },
    { id: 'antioxidantes', label: 'Antioxidantes', icon: '✨' },
    { id: 'habitos', label: 'Hábitos', icon: '💛' },
    { id: 'downloads', label: 'Descargas', icon: '📥' },
  ];

  const visibleChapters = (activeTab === 'all'
    ? [...chapters]
    : chapters.filter(c => c.categoryId === activeTab)
  )
    .filter(c => !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.subtitle.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.order - b.order);

  const getCat = (id: string) => categories.find(c => c.id === id);

  return (
    <div className="page-enter min-h-screen has-bottom-nav" style={{ background: '#060E08' }}>
      {/* Header */}
      <div
        className="px-5 pt-8 pb-6 relative overflow-hidden"
        style={{ borderBottom: '1px solid rgba(61,255,122,0.08)' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(61,255,122,0.05) 0%, transparent 60%)',
        }} />
        <div className="max-w-4xl mx-auto relative">
          <h1 className="font-bold text-2xl mb-1" style={{ color: '#E2F2E6', letterSpacing: '-0.03em' }}>
            {t(lang, 'chapters')}
          </h1>
          <p className="text-sm" style={{ color: '#5E8C6A' }}>
            {visibleChapters.length} contenidos disponibles
          </p>

          {/* Search */}
          <div className="relative mt-4">
            <Search size={16} color="#3E6348" className="absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar receta, día o hábito..."
              className="input-dark w-full pl-11 pr-4 py-3 rounded-xl text-sm"
              style={{ fontSize: '16px' }}
            />
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div
        className="sticky z-30"
        style={{
          top: '64px',
          background: 'rgba(6,14,8,0.95)',
          borderBottom: '1px solid rgba(61,255,122,0.07)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 overflow-x-auto scroll-x">
          <div className="flex gap-1.5 py-3 min-w-max">
            {tabGroups.map(tab => {
              const neon = getCatNeon(tab.id);
              const isAct = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all"
                  style={{
                    background: isAct ? `${neon}15` : 'rgba(255,255,255,0.03)',
                    color: isAct ? neon : '#5E8C6A',
                    border: `1px solid ${isAct ? `${neon}40` : 'rgba(255,255,255,0.06)'}`,
                    boxShadow: isAct ? `0 0 10px ${neon}20` : 'none',
                  }}
                >
                  {tab.icon} {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="max-w-4xl mx-auto px-4 py-5">
        {visibleChapters.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p style={{ color: '#5E8C6A' }}>Sin resultados para "{search}"</p>
          </div>
        ) : (
          <div className="space-y-2">
            {visibleChapters.map(chapter => {
              const cat = getCat(chapter.categoryId);
              const done = isComplete(chapter.id);
              const neon = chapter.neonColor ?? getCatNeon(chapter.categoryId);
              return (
                <button
                  key={chapter.id}
                  onClick={() => navigate(`/chapter/${chapter.id}`)}
                  className="w-full text-left rounded-2xl p-4 flex items-center gap-4 transition-all active:scale-98 card-hover"
                  style={{ background: '#0C1A0E', border: `1px solid ${neon}10` }}
                >
                  {/* Emoji icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: `${neon}10`, border: `1px solid ${neon}20` }}
                  >
                    {chapter.emoji || cat?.icon || '📖'}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: `${neon}12`, color: neon }}
                      >
                        {cat?.title ?? ''}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm mb-0.5" style={{ color: '#E2F2E6' }}>{chapter.title}</h3>
                    <p className="text-xs line-clamp-1" style={{ color: '#5E8C6A' }}>{chapter.subtitle}</p>
                  </div>

                  {/* Status */}
                  <div className="shrink-0 flex items-center gap-2">
                    {done
                      ? <CheckCircle size={20} color={neon} />
                      : <Circle size={20} color="rgba(255,255,255,0.1)" />}
                    <ChevronRight size={16} color="#3E6348" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
