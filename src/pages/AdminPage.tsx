import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit3, Check, X, ShieldAlert, Eye, Download, Upload, Link } from 'lucide-react';
import { useLang, useContent, useAuth } from '../contexts';
import { t } from '../translations';
import type { Category, Chapter } from '../data';

// ─── Tab Bar ───────────────────────────────────────────────────────────────────
type AdminTab = 'categories' | 'chapters' | 'comments' | 'downloads';

export default function AdminPage() {
  const { lang } = useLang();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<AdminTab>('categories');

  if (!user?.isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4" style={{ background: '#F8F6F2' }}>
        <ShieldAlert size={48} color="#d1d5db" />
        <p style={{ color: '#9ca3af' }}>Acceso no autorizado</p>
        <button onClick={() => navigate('/')} className="px-4 py-2 rounded-xl text-sm" style={{ background: '#1E4D3D', color: 'white' }}>
          Volver al inicio
        </button>
      </div>
    );
  }

  const tabs: { id: AdminTab; label: string }[] = [
    { id: 'categories', label: t(lang, 'categories') },
    { id: 'chapters', label: t(lang, 'chapters') },
    { id: 'comments', label: t(lang, 'moderateComments') },
    { id: 'downloads', label: t(lang, 'manageDownloads') },
  ];

  return (
    <div className="page-enter min-h-screen" style={{ background: '#F8F6F2' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1F2937, #374151)' }} className="px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-white text-2xl font-bold">{t(lang, 'adminTitle')}</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-30 shadow-sm" style={{ background: '#F8F6F2', borderBottom: '1px solid #e8e4dc' }}>
        <div className="max-w-5xl mx-auto px-4 overflow-x-auto scroll-x">
          <div className="flex gap-1 py-3 min-w-max">
            {tabs.map(t2 => (
              <button
                key={t2.id}
                onClick={() => setTab(t2.id)}
                className="px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
                style={{
                  background: tab === t2.id ? '#1F2937' : 'transparent',
                  color: tab === t2.id ? 'white' : '#6b7280',
                }}
              >
                {t2.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {tab === 'categories' && <CategoriesTab />}
        {tab === 'chapters' && <ChaptersTab />}
        {tab === 'comments' && <CommentsTab />}
        {tab === 'downloads' && <DownloadsTab />}
      </div>
    </div>
  );
}

// ─── Categories Tab ────────────────────────────────────────────────────────────
function CategoriesTab() {
  const { lang } = useLang();
  const { categories, setCategories } = useContent();
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');
  const [editIcon, setEditIcon] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newIcon, setNewIcon] = useState('📖');

  const startEdit = (cat: Category) => {
    setEditId(cat.id);
    setEditTitle(cat.title);
    setEditSubtitle(cat.subtitle);
    setEditIcon(cat.icon);
  };

  const saveEdit = () => {
    setCategories(categories.map(c =>
      c.id === editId ? { ...c, title: editTitle, subtitle: editSubtitle, icon: editIcon } : c
    ));
    setEditId(null);
  };

  const deleteCategory = (id: string) => {
    if (confirm('¿Eliminar esta categoría?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const addCategory = () => {
    if (!newTitle.trim()) return;
    const newCat: Category = {
      id: Date.now().toString(),
      slug: newTitle.toLowerCase().replace(/\s+/g, '-'),
      title: newTitle,
      subtitle: newSubtitle,
      icon: newIcon,
      type: 'intro',
      coverColor: '#1E4D3D',
      neonColor: '#3DFF7A',
      order: categories.length,
    };
    setCategories([...categories, newCat]);
    setNewTitle('');
    setNewSubtitle('');
    setShowAdd(false);
  };

  const sorted = [...categories].sort((a, b) => a.order - b.order);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold" style={{ color: '#1F2937' }}>{t(lang, 'categories')}</h2>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
          style={{ background: '#1E4D3D', color: 'white' }}
        >
          <Plus size={15} />
          {t(lang, 'addCategory')}
        </button>
      </div>

      {showAdd && (
        <div className="rounded-2xl p-4 mb-4" style={{ background: 'white', border: '1px solid #e8e4dc' }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Título *"
              className="px-3 py-2 rounded-xl text-sm outline-none" style={{ background: '#f5f3ef', border: '1.5px solid #e8e4dc', color: '#1F2937' }} />
            <input value={newSubtitle} onChange={e => setNewSubtitle(e.target.value)} placeholder="Subtítulo"
              className="px-3 py-2 rounded-xl text-sm outline-none" style={{ background: '#f5f3ef', border: '1.5px solid #e8e4dc', color: '#1F2937' }} />
            <input value={newIcon} onChange={e => setNewIcon(e.target.value)} placeholder="Emoji"
              className="px-3 py-2 rounded-xl text-sm outline-none" style={{ background: '#f5f3ef', border: '1.5px solid #e8e4dc', color: '#1F2937' }} />
          </div>
          <div className="flex gap-2">
            <button onClick={addCategory} className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium" style={{ background: '#1E4D3D', color: 'white' }}>
              <Check size={14} /> {t(lang, 'save')}
            </button>
            <button onClick={() => setShowAdd(false)} className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium" style={{ background: '#e8e4dc', color: '#1F2937' }}>
              <X size={14} /> {t(lang, 'cancel')}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {sorted.map(cat => (
          <div key={cat.id} className="rounded-2xl p-4" style={{ background: 'white', border: '1px solid #e8e4dc' }}>
            {editId === cat.id ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input value={editTitle} onChange={e => setEditTitle(e.target.value)}
                  className="px-3 py-2 rounded-xl text-sm outline-none" style={{ background: '#f5f3ef', border: '1.5px solid #1E4D3D', color: '#1F2937' }} />
                <input value={editSubtitle} onChange={e => setEditSubtitle(e.target.value)}
                  className="px-3 py-2 rounded-xl text-sm outline-none" style={{ background: '#f5f3ef', border: '1.5px solid #e8e4dc', color: '#1F2937' }} />
                <input value={editIcon} onChange={e => setEditIcon(e.target.value)}
                  className="px-3 py-2 rounded-xl text-sm outline-none" style={{ background: '#f5f3ef', border: '1.5px solid #e8e4dc', color: '#1F2937' }} />
                <div className="sm:col-span-3 flex gap-2">
                  <button onClick={saveEdit} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: '#1E4D3D', color: 'white' }}>
                    <Check size={12} /> {t(lang, 'save')}
                  </button>
                  <button onClick={() => setEditId(null)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: '#e8e4dc', color: '#1F2937' }}>
                    <X size={12} /> {t(lang, 'cancel')}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <p className="font-medium text-sm" style={{ color: '#1F2937' }}>{cat.title}</p>
                    <p className="text-xs" style={{ color: '#9ca3af' }}>{cat.subtitle}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(cat)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#f5f3ef', color: '#6b7280' }}>
                    <Edit3 size={14} />
                  </button>
                  <button onClick={() => deleteCategory(cat.id)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#fee2e2', color: '#dc2626' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Chapters Tab ──────────────────────────────────────────────────────────────
function ChaptersTab() {
  const { lang } = useLang();
  const { categories, chapters, setChapters } = useContent();
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Chapter>>({});

  const startEdit = (ch: Chapter) => { setEditId(ch.id); setEditData({ ...ch }); };
  const saveEdit = () => {
    setChapters(chapters.map(c => c.id === editId ? { ...c, ...editData } as Chapter : c));
    setEditId(null);
  };
  const deleteChapter = (id: string) => {
    if (confirm('¿Eliminar?')) setChapters(chapters.filter(c => c.id !== id));
  };

  return (
    <div>
      <h2 className="font-semibold mb-4" style={{ color: '#1F2937' }}>{t(lang, 'chapters')}</h2>
      <div className="space-y-2">
        {chapters.sort((a, b) => a.order - b.order).map(ch => {
          const cat = categories.find(c => c.id === ch.categoryId);
          return (
            <div key={ch.id} className="rounded-2xl p-4" style={{ background: 'white', border: '1px solid #e8e4dc' }}>
              {editId === ch.id ? (
                <div className="space-y-2">
                  <input value={editData.title ?? ''} onChange={e => setEditData(p => ({ ...p, title: e.target.value }))}
                    placeholder="Título" className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={{ background: '#f5f3ef', border: '1.5px solid #1E4D3D', color: '#1F2937' }} />
                  <input value={editData.subtitle ?? ''} onChange={e => setEditData(p => ({ ...p, subtitle: e.target.value }))}
                    placeholder="Subtítulo" className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={{ background: '#f5f3ef', border: '1.5px solid #e8e4dc', color: '#1F2937' }} />
                  <textarea value={editData.summary ?? ''} onChange={e => setEditData(p => ({ ...p, summary: e.target.value }))}
                    placeholder="Resumen" rows={2} className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none" style={{ background: '#f5f3ef', border: '1.5px solid #e8e4dc', color: '#1F2937' }} />
                  <textarea value={editData.content ?? ''} onChange={e => setEditData(p => ({ ...p, content: e.target.value }))}
                    placeholder="Contenido" rows={4} className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none" style={{ background: '#f5f3ef', border: '1.5px solid #e8e4dc', color: '#1F2937' }} />
                  <input value={editData.habit ?? ''} onChange={e => setEditData(p => ({ ...p, habit: e.target.value }))}
                    placeholder="Hábito del día" className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={{ background: '#f5f3ef', border: '1.5px solid #e8e4dc', color: '#1F2937' }} />
                  <div className="flex gap-2 pt-1">
                    <button onClick={saveEdit} className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-medium" style={{ background: '#1E4D3D', color: 'white' }}>
                      <Check size={12} /> {t(lang, 'save')}
                    </button>
                    <button onClick={() => setEditId(null)} className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-medium" style={{ background: '#e8e4dc', color: '#1F2937' }}>
                      <X size={12} /> {t(lang, 'cancel')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg shrink-0"
                      style={{ background: ch.coverColor + '22' }}>
                      {cat?.icon ?? '📖'}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate" style={{ color: '#1F2937' }}>{ch.title}</p>
                      <p className="text-xs truncate" style={{ color: '#9ca3af' }}>{cat?.title} — {ch.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0 ml-2">
                    <button onClick={() => startEdit(ch)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#f5f3ef', color: '#6b7280' }}>
                      <Edit3 size={14} />
                    </button>
                    <button onClick={() => deleteChapter(ch.id)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#fee2e2', color: '#dc2626' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Downloads Tab ─────────────────────────────────────────────────────────────
function DownloadsTab() {
  const { lang } = useLang();
  const { chapters, setChapters } = useContent();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newEmoji, setNewEmoji] = useState('📄');
  const [newUrl, setNewUrl] = useState('');
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url');
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const downloads = chapters.filter(c => c.pdfUrl !== undefined && c.categoryId === 'downloads')
    .sort((a, b) => a.order - b.order);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith('.pdf')) { alert('Por favor, selecciona un archivo PDF.'); return; }
    setUploading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setNewUrl(ev.target?.result as string);
      if (!newTitle) setNewTitle(file.name.replace('.pdf', ''));
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const addDownload = () => {
    if (!newTitle.trim()) { alert('El título es obligatorio.'); return; }
    if (!newUrl.trim()) { alert('Agrega una URL o sube un archivo PDF.'); return; }
    const newItem: Chapter = {
      id: 'dl_' + Date.now(),
      categoryId: 'downloads',
      title: newTitle.trim(),
      subtitle: newSubtitle.trim(),
      summary: newSummary.trim(),
      content: newSummary.trim(),
      emoji: newEmoji,
      pdfUrl: newUrl.trim(),
      coverColor: '#0D2A14',
      neonColor: '#3DFF7A',
      order: chapters.filter(c => c.categoryId === 'downloads').length,
    };
    setChapters([...chapters, newItem]);
    setNewTitle(''); setNewSubtitle(''); setNewSummary('');
    setNewEmoji('📄'); setNewUrl('');
    setShowAdd(false);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const deleteDownload = (id: string) => {
    if (confirm('¿Eliminar este material?')) {
      setChapters(chapters.filter(c => c.id !== id));
    }
  };

  const inputStyle = { background: '#f5f3ef', border: '1.5px solid #e8e4dc', color: '#1F2937' };

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="font-semibold" style={{ color: '#1F2937' }}>{t(lang, 'manageDownloads')}</h2>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
          style={{ background: '#1E4D3D', color: 'white' }}
        >
          <Plus size={15} />
          {t(lang, 'addDownload')}
        </button>
      </div>

      {successMsg && (
        <div className="rounded-xl px-4 py-3 mb-4 text-sm font-medium"
          style={{ background: '#dcfce7', color: '#16a34a', border: '1px solid #bbf7d0' }}>
          ✓ {t(lang, 'addedSuccessfully')}
        </div>
      )}

      {showAdd && (
        <div className="rounded-2xl p-5 mb-5" style={{ background: 'white', border: '1px solid #e8e4dc' }}>
          <h3 className="font-semibold text-sm mb-4" style={{ color: '#1F2937' }}>{t(lang, 'addDownload')}</h3>

          {/* Basic fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <input value={newTitle} onChange={e => setNewTitle(e.target.value)}
              placeholder={t(lang, 'downloadTitle') + ' *'}
              className="px-3 py-2 rounded-xl text-sm outline-none" style={inputStyle} />
            <input value={newSubtitle} onChange={e => setNewSubtitle(e.target.value)}
              placeholder={t(lang, 'downloadSubtitle')}
              className="px-3 py-2 rounded-xl text-sm outline-none" style={inputStyle} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div className="sm:col-span-2">
              <textarea value={newSummary} onChange={e => setNewSummary(e.target.value)}
                placeholder={t(lang, 'downloadSummary')}
                rows={2} className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none" style={inputStyle} />
            </div>
            <input value={newEmoji} onChange={e => setNewEmoji(e.target.value)}
              placeholder={t(lang, 'downloadEmoji')}
              className="px-3 py-2 rounded-xl text-sm outline-none" style={inputStyle} />
          </div>

          {/* URL / File toggle */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setUploadMode('url')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all"
              style={{ background: uploadMode === 'url' ? '#1F2937' : '#f5f3ef', color: uploadMode === 'url' ? 'white' : '#6b7280' }}
            >
              <Link size={13} /> URL
            </button>
            <button
              onClick={() => setUploadMode('file')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all"
              style={{ background: uploadMode === 'file' ? '#1F2937' : '#f5f3ef', color: uploadMode === 'file' ? 'white' : '#6b7280' }}
            >
              <Upload size={13} /> {t(lang, 'orUploadFile').split(' ')[0]}
            </button>
          </div>

          {uploadMode === 'url' ? (
            <input value={newUrl} onChange={e => setNewUrl(e.target.value)}
              placeholder={t(lang, 'pdfUrlLabel')}
              className="w-full px-3 py-2 rounded-xl text-sm outline-none mb-3" style={inputStyle} />
          ) : (
            <div className="mb-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="w-full text-sm"
                style={{ color: '#6b7280' }}
              />
              {uploading && <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>Leyendo archivo...</p>}
              {newUrl && newUrl.startsWith('data:') && (
                <p className="text-xs mt-1" style={{ color: '#16a34a' }}>✓ Archivo cargado en memoria</p>
              )}
              <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>
                ⚠️ Archivos grandes pueden ocupar mucho espacio en el navegador. Para PDFs pesados usa una URL externa (Google Drive, Dropbox).
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <button onClick={addDownload}
              className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium"
              style={{ background: '#1E4D3D', color: 'white' }}>
              <Check size={14} /> {t(lang, 'save')}
            </button>
            <button onClick={() => { setShowAdd(false); setNewUrl(''); if (fileInputRef.current) fileInputRef.current.value = ''; }}
              className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium"
              style={{ background: '#e8e4dc', color: '#1F2937' }}>
              <X size={14} /> {t(lang, 'cancel')}
            </button>
          </div>
        </div>
      )}

      {downloads.length === 0 ? (
        <div className="text-center py-12 rounded-2xl" style={{ background: 'white', border: '1px solid #e8e4dc' }}>
          <Download size={40} color="#d1d5db" className="mx-auto mb-3" />
          <p className="text-sm" style={{ color: '#9ca3af' }}>{t(lang, 'noDownloads')}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {downloads.map(dl => (
            <div key={dl.id} className="rounded-2xl p-4 flex items-center justify-between gap-3"
              style={{ background: 'white', border: '1px solid #e8e4dc' }}>
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: '#f0fdf4' }}>
                  {dl.emoji || '📄'}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate" style={{ color: '#1F2937' }}>{dl.title}</p>
                  <p className="text-xs truncate" style={{ color: '#9ca3af' }}>{dl.subtitle}</p>
                  {dl.pdfUrl && dl.pdfUrl !== '#' && (
                    <a href={dl.pdfUrl} target="_blank" rel="noreferrer"
                      className="text-xs no-underline" style={{ color: '#1E4D3D' }}>
                      {dl.pdfUrl.startsWith('data:') ? '📎 Archivo local' : '🔗 ' + dl.pdfUrl.slice(0, 40) + '...'}
                    </a>
                  )}
                </div>
              </div>
              <button onClick={() => deleteDownload(dl.id)}
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: '#fee2e2', color: '#dc2626' }}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Comments Tab ──────────────────────────────────────────────────────────────
function CommentsTab() {
  const { lang } = useLang();
  const { comments, approveComment, deleteComment } = useContent();

  const pending = comments.filter(c => !c.approved);
  const approved = comments.filter(c => c.approved);

  return (
    <div>
      <h2 className="font-semibold mb-4" style={{ color: '#1F2937' }}>{t(lang, 'moderateComments')}</h2>

      {pending.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#f59e0b' }}>
            Pendientes ({pending.length})
          </p>
          <div className="space-y-2">
            {pending.map(c => (
              <div key={c.id} className="rounded-2xl p-4" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-sm" style={{ color: '#1F2937' }}>{c.userName}</p>
                    <p className="text-sm mt-1" style={{ color: '#4b5563' }}>{c.text}</p>
                    <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>{c.date}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => approveComment(c.id)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#dcfce7', color: '#16a34a' }}>
                      <Eye size={14} />
                    </button>
                    <button onClick={() => deleteComment(c.id)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#fee2e2', color: '#dc2626' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#1E4D3D' }}>
          Aprobados ({approved.length})
        </p>
        <div className="space-y-2">
          {approved.map(c => (
            <div key={c.id} className="rounded-2xl p-4" style={{ background: 'white', border: '1px solid #e8e4dc' }}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-sm" style={{ color: '#1F2937' }}>{c.userName}</p>
                  <p className="text-sm mt-1" style={{ color: '#4b5563' }}>{c.text}</p>
                  <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>{c.date}</p>
                </div>
                <button onClick={() => deleteComment(c.id)} className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#fee2e2', color: '#dc2626' }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
