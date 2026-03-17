import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Language } from './translations';
import type { Category, Chapter, Comment, UserProgress } from './data';
import { defaultCategories, defaultChapters, defaultComments } from './data';

// ─── Language Context ──────────────────────────────────────────────────────────
interface LangCtx { lang: Language; setLang: (l: Language) => void; }
const LangContext = createContext<LangCtx>({ lang: 'es', setLang: () => {} });
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() =>
    (localStorage.getItem('t21_lang') as Language) || 'es'
  );
  const set = (l: Language) => { setLang(l); localStorage.setItem('t21_lang', l); };
  return <LangContext.Provider value={{ lang, setLang: set }}>{children}</LangContext.Provider>;
}
export const useLang = () => useContext(LangContext);

// ─── Auth Context ──────────────────────────────────────────────────────────────
interface User { email: string; isAdmin: boolean; name: string; }
interface AuthCtx { user: User | null; login: (e: string, p: string) => boolean; logout: () => void; }
const AuthContext = createContext<AuthCtx>({ user: null, login: () => false, logout: () => {} });

const USERS = [
  { email: 'admin@transforma21.com', password: 'admin123', isAdmin: true, name: 'Administrador' },
  { email: 'demo@transforma21.com', password: 'demo123', isAdmin: false, name: 'Usuario Demo' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const s = localStorage.getItem('t21_user');
    return s ? JSON.parse(s) : null;
  });
  const login = (email: string, password: string) => {
    const found = USERS.find(u => u.email === email && u.password === password);
    if (found) {
      const u = { email: found.email, isAdmin: found.isAdmin, name: found.name };
      setUser(u);
      localStorage.setItem('t21_user', JSON.stringify(u));
      return true;
    }
    return false;
  };
  const logout = () => { setUser(null); localStorage.removeItem('t21_user'); };
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);

// ─── Content Context ───────────────────────────────────────────────────────────
interface ContentCtx {
  categories: Category[];
  chapters: Chapter[];
  comments: Comment[];
  setCategories: (c: Category[]) => void;
  setChapters: (c: Chapter[]) => void;
  addComment: (c: Comment) => void;
  likeComment: (id: string) => void;
  deleteComment: (id: string) => void;
  approveComment: (id: string) => void;
}
const ContentContext = createContext<ContentCtx>({} as ContentCtx);

const DATA_VERSION = 'v3-mounjaro';

function resetIfStale() {
  if (localStorage.getItem('t21_data_version') !== DATA_VERSION) {
    ['t21_categories', 't21_chapters', 't21_comments', 't21_progress'].forEach(k => localStorage.removeItem(k));
    localStorage.setItem('t21_data_version', DATA_VERSION);
  }
}
resetIfStale();

export function ContentProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(() => {
    const s = localStorage.getItem('t21_categories');
    return s ? JSON.parse(s) : defaultCategories;
  });
  const [chapters, setChapters] = useState<Chapter[]>(() => {
    const s = localStorage.getItem('t21_chapters');
    return s ? JSON.parse(s) : defaultChapters;
  });
  const [comments, setComments] = useState<Comment[]>(() => {
    const s = localStorage.getItem('t21_comments');
    return s ? JSON.parse(s) : defaultComments;
  });

  useEffect(() => { localStorage.setItem('t21_categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('t21_chapters', JSON.stringify(chapters)); }, [chapters]);
  useEffect(() => { localStorage.setItem('t21_comments', JSON.stringify(comments)); }, [comments]);

  const addComment = (c: Comment) => setComments(prev => [c, ...prev]);
  const likeComment = (id: string) => setComments(prev => prev.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c));
  const deleteComment = (id: string) => setComments(prev => prev.filter(c => c.id !== id));
  const approveComment = (id: string) => setComments(prev => prev.map(c => c.id === id ? { ...c, approved: true } : c));

  return (
    <ContentContext.Provider value={{ categories, chapters, comments, setCategories, setChapters, addComment, likeComment, deleteComment, approveComment }}>
      {children}
    </ContentContext.Provider>
  );
}
export const useContent = () => useContext(ContentContext);

// ─── Progress Context ──────────────────────────────────────────────────────────
interface ProgressCtx {
  progress: UserProgress;
  markComplete: (id: string) => void;
  isComplete: (id: string) => boolean;
  setDay: (d: number) => void;
}
const ProgressContext = createContext<ProgressCtx>({} as ProgressCtx);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const s = localStorage.getItem('t21_progress');
    return s ? JSON.parse(s) : { completedChapters: [], currentDay: 1 };
  });
  useEffect(() => { localStorage.setItem('t21_progress', JSON.stringify(progress)); }, [progress]);

  const markComplete = (id: string) => {
    setProgress(prev => {
      const completed = prev.completedChapters.includes(id)
        ? prev.completedChapters
        : [...prev.completedChapters, id];
      return { ...prev, completedChapters: completed, currentDay: Math.min(21, prev.currentDay + 1) };
    });
  };
  const isComplete = (id: string) => progress.completedChapters.includes(id);
  const setDay = (d: number) => setProgress(prev => ({ ...prev, currentDay: d }));

  return (
    <ProgressContext.Provider value={{ progress, markComplete, isComplete, setDay }}>
      {children}
    </ProgressContext.Provider>
  );
}
export const useProgress = () => useContext(ProgressContext);
