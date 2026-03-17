import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Users } from 'lucide-react';
import { useLang, useContent, useAuth } from '../contexts';
import { t } from '../translations';
import type { Comment } from '../data';

export default function CommunityPage() {
  const { lang } = useLang();
  const { user } = useAuth();
  const { comments, addComment, likeComment } = useContent();
  const [text, setText] = useState('');

  const allApproved = comments
    .filter(c => c.approved)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const submit = () => {
    if (!text.trim() || !user) return;
    const c: Comment = {
      id: Date.now().toString(),
      chapterId: 'general',
      userName: user.name,
      text: text.trim(),
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      replies: [],
      approved: true,
    };
    addComment(c);
    setText('');
  };

  return (
    <div className="page-enter min-h-screen" style={{ background: '#F8F6F2' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #2a6b55, #1E4D3D)' }} className="px-6 py-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(255,255,255,0.15)' }}>
            <Users size={26} color="white" />
          </div>
          <h1 className="font-serif text-white text-3xl font-bold mb-2">{t(lang, 'communityTitle')}</h1>
          <p style={{ color: '#A8B9A5' }} className="text-sm">{t(lang, 'communitySubtitle')}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Post input */}
        {user ? (
          <div className="rounded-2xl p-5 mb-6 shadow-sm" style={{ background: 'white', border: '1px solid #e8e4dc' }}>
            <div className="flex gap-3 items-start">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                style={{ background: '#1E4D3D22', color: '#1E4D3D' }}>
                {user.name[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{ background: '#f5f3ef', border: '1.5px solid #e8e4dc', color: '#1F2937' }}
                  placeholder={t(lang, 'shareExp')}
                  onFocus={e => (e.target.style.borderColor = '#1E4D3D')}
                  onBlur={e => (e.target.style.borderColor = '#e8e4dc')}
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={submit}
                    disabled={!text.trim()}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 disabled:opacity-40"
                    style={{ background: '#1E4D3D', color: 'white' }}
                  >
                    <Send size={14} />
                    {t(lang, 'publish')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 px-4 rounded-2xl mb-6"
            style={{ background: 'white', border: '1px solid #e8e4dc', color: '#9ca3af' }}>
            <p className="text-sm">{t(lang, 'welcome')}</p>
          </div>
        )}

        {/* Feed */}
        <div className="space-y-4">
          {allApproved.map(comment => (
            <div key={comment.id} className="rounded-2xl p-5 shadow-sm"
              style={{ background: 'white', border: '1px solid #e8e4dc' }}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ background: '#1E4D3D22', color: '#1E4D3D' }}>
                  {comment.userName[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm" style={{ color: '#1F2937' }}>{comment.userName}</span>
                    <span className="text-xs" style={{ color: '#9ca3af' }}>{comment.date}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#4b5563' }}>{comment.text}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <button
                      onClick={() => likeComment(comment.id)}
                      className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                      style={{ color: '#9ca3af' }}
                    >
                      <Heart size={14} />
                      {comment.likes > 0 ? comment.likes : ''}
                      <span>{t(lang, 'like')}</span>
                    </button>
                    <button
                      className="flex items-center gap-1.5 text-xs font-medium"
                      style={{ color: '#9ca3af' }}
                    >
                      <MessageCircle size={14} />
                      {t(lang, 'reply')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {allApproved.length === 0 && (
            <div className="text-center py-16">
              <Users size={40} color="#d1d5db" className="mx-auto mb-3" />
              <p style={{ color: '#9ca3af' }} className="text-sm">{t(lang, 'shareExp')} 🌿</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
