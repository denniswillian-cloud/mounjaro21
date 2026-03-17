import React from 'react';
import { Download, FileText, ArrowDown } from 'lucide-react';
import { useLang, useContent } from '../contexts';
import { t } from '../translations';

export default function LibraryPage() {
  const { lang } = useLang();
  const { chapters } = useContent();

  const downloads = chapters.filter(c => c.pdfUrl).sort((a, b) => a.order - b.order);

  const neons = ['#3DFF7A', '#FF7B3A', '#47E5D8', '#C084FC'];

  return (
    <div className="page-enter min-h-screen has-bottom-nav" style={{ background: '#060E08' }}>
      {/* Header */}
      <div
        className="px-5 pt-8 pb-8 relative overflow-hidden"
        style={{ borderBottom: '1px solid rgba(61,255,122,0.08)' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(61,255,122,0.05) 0%, transparent 60%)',
        }} />
        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(61,255,122,0.1)', border: '1px solid rgba(61,255,122,0.2)' }}
            >
              <Download size={20} color="#3DFF7A" />
            </div>
            <div>
              <h1 className="font-bold text-xl" style={{ color: '#E2F2E6', letterSpacing: '-0.02em' }}>
                {t(lang, 'libraryTitle')}
              </h1>
              <p className="text-xs" style={{ color: '#5E8C6A' }}>{t(lang, 'librarySubtitle')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {downloads.length === 0 ? (
          <div className="text-center py-20">
            <FileText size={48} color="#3E6348" className="mx-auto mb-4" />
            <p style={{ color: '#5E8C6A' }}>{t(lang, 'noContent')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {downloads.map((item, i) => {
              const neon = neons[i % neons.length];
              return (
                <div
                  key={item.id}
                  className="rounded-2xl overflow-hidden card-hover"
                  style={{ background: '#0C1A0E', border: `1px solid ${neon}15` }}
                >
                  {/* Top accent bar */}
                  <div className="h-1.5" style={{ background: neon, boxShadow: `0 0 8px ${neon}50` }} />

                  <div className="p-5">
                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-2xl"
                        style={{ background: `${neon}10`, border: `1px solid ${neon}20` }}
                      >
                        {item.emoji || '📄'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm mb-0.5" style={{ color: '#E2F2E6' }}>{item.title}</h3>
                        <p className="text-xs" style={{ color: '#5E8C6A' }}>{item.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: '#5E8C6A' }}>
                      {item.summary}
                    </p>

                    <a
                      href={item.pdfUrl}
                      download
                      className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold no-underline transition-all active:scale-95"
                      style={{
                        background: `${neon}15`,
                        color: neon,
                        border: `1px solid ${neon}30`,
                        boxShadow: `0 0 12px ${neon}15`,
                      }}
                    >
                      <ArrowDown size={16} />
                      {t(lang, 'download')}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
