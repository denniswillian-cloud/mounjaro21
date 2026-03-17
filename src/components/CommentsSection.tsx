import React, { useState } from 'react';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { useLang, useContent, useAuth } from '../contexts';
import { t } from '../translations';
import type { Comment } from '../data';

function CommentCard({ comment, onLike, onReply }: {
  comment: Comment;
  onLike: (id: string) => void;
  onReply: (text: string) => void;
}) {
  const { lang } = useLang();
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');

  const submitReply = () => {
    if (replyText.trim()) {
      onReply(replyText);
      setReplyText('');
      setShowReply(false);
    }
  };

  return (
    <div className="rounded-2xl p-4" style={{ background: 'white', border: '1px solid #e8e4dc' }}>
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
          style={{ background: '#1E4D3D22', color: '#1E4D3D' }}>
          {comment.userName[0].toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold" style={{ color: '#1F2937' }}>{comment.userName}</span>
            <span className="text-xs" style={{ color: '#9ca3af' }}>{comment.date}</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: '#4b5563' }}>{comment.text}</p>

          <div className="flex items-center gap-4 mt-3">
            <button
              onClick={() => onLike(comment.id)}
              className="flex items-center gap-1.5 text-xs font-medium transition-colors"
              style={{ color: '#9ca3af' }}
            >
              <Heart size={14} />
              {comment.likes > 0 && comment.likes}
              <span>{t(lang, 'like')}</span>
            </button>
            <button
              onClick={() => setShowReply(!showReply)}
              className="flex items-center gap-1.5 text-xs font-medium transition-colors"
              style={{ color: '#9ca3af' }}
            >
              <MessageCircle size={14} />
              {t(lang, 'reply')}
            </button>
          </div>

          {showReply && (
            <div className="mt-3 flex gap-2">
              <input
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl text-sm outline-none"
                style={{ background: '#f5f3ef', border: '1.5px solid #e8e4dc', color: '#1F2937' }}
                placeholder={t(lang, 'writeComment')}
                onFocus={e => (e.target.style.borderColor = '#1E4D3D')}
                onBlur={e => (e.target.style.borderColor = '#e8e4dc')}
              />
              <button
                onClick={submitReply}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-95"
                style={{ background: '#1E4D3D', color: 'white' }}
              >
                <Send size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CommentsSection({ chapterId }: { chapterId: string }) {
  const { lang } = useLang();
  const { user } = useAuth();
  const { comments, addComment, likeComment } = useContent();
  const [text, setText] = useState('');

  const chapterComments = comments
    .filter(c => c.chapterId === chapterId && c.approved)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const submit = () => {
    if (!text.trim() || !user) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      chapterId,
      userName: user.name,
      text: text.trim(),
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      replies: [],
      approved: true,
    };
    addComment(newComment);
    setText('');
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <MessageCircle size={18} color="#1E4D3D" />
        <h3 className="font-serif text-lg font-semibold" style={{ color: '#1E4D3D' }}>
          {t(lang, 'comments')}
        </h3>
        <span className="text-sm" style={{ color: '#9ca3af' }}>({chapterComments.length})</span>
      </div>

      {/* Input */}
      {user && (
        <div className="mb-6 flex gap-3 items-start">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-1"
            style={{ background: '#1E4D3D22', color: '#1E4D3D' }}>
            {user.name[0].toUpperCase()}
          </div>
          <div className="flex-1">
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-2xl text-sm outline-none resize-none"
              style={{ background: 'white', border: '1.5px solid #e8e4dc', color: '#1F2937' }}
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
      )}

      {/* Comments list */}
      <div className="space-y-3">
        {chapterComments.map(comment => (
          <CommentCard
            key={comment.id}
            comment={comment}
            onLike={likeComment}
            onReply={(replyText) => {
              if (user) {
                const reply: Comment = {
                  id: Date.now().toString(),
                  chapterId,
                  userName: user.name,
                  text: replyText,
                  date: new Date().toISOString().split('T')[0],
                  likes: 0,
                  replies: [],
                  approved: true,
                };
                addComment(reply);
              }
            }}
          />
        ))}
        {chapterComments.length === 0 && (
          <p className="text-center py-8 text-sm" style={{ color: '#9ca3af' }}>
            {t(lang, 'shareExp')} 🌿
          </p>
        )}
      </div>
    </div>
  );
}
