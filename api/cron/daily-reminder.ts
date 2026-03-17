import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import webpush from 'web-push';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY!;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY!;
const CRON_SECRET = process.env.CRON_SECRET!;
const APP_URL = process.env.APP_URL || 'https://mounjaro21.vercel.app';

const MESSAGES: Record<string, string> = {
  es: '🌿 ¡Es hora de tu protocolo del día! Tú puedes 💪',
  pt: '🌿 Hora do seu protocolo do dia! Você consegue 💪',
  it: '🌿 È ora del tuo protocollo! Ce la fai 💪',
  en: '🌿 Time for your daily protocol! You got this 💪',
};

const NOTIFICATION_TITLE = 'Efecto Mounjaro Natural';

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

webpush.setVapidDetails(
  `mailto:admin@mounjaro21.vercel.app`,
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow GET (from Vercel cron) or POST (manual trigger)
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate cron secret
  const authHeader = req.headers['authorization'];
  if (!CRON_SECRET || authHeader !== `Bearer ${CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Fetch all push subscriptions
    const { data: subscriptions, error } = await supabaseAdmin
      .from('push_subscriptions')
      .select('id, user_id, subscription, lang');

    if (error) {
      console.error('Error fetching subscriptions:', error);
      return res.status(500).json({ error: error.message });
    }

    if (!subscriptions || subscriptions.length === 0) {
      return res.status(200).json({ message: 'No subscriptions found', sent: 0 });
    }

    const staleIds: string[] = [];
    let sent = 0;
    let failed = 0;

    await Promise.allSettled(
      subscriptions.map(async (row) => {
        const lang = row.lang || 'es';
        const body = MESSAGES[lang] || MESSAGES['es'];
        const payload = JSON.stringify({
          title: NOTIFICATION_TITLE,
          body,
          icon: '/icon-192.png',
          url: APP_URL,
        });

        try {
          await webpush.sendNotification(row.subscription, payload);
          sent++;
        } catch (err: unknown) {
          const pushErr = err as { statusCode?: number };
          if (pushErr.statusCode === 410) {
            // Subscription is no longer valid
            staleIds.push(row.id);
          } else {
            console.error(`Push failed for user ${row.user_id}:`, err);
            failed++;
          }
        }
      })
    );

    // Remove stale subscriptions
    if (staleIds.length > 0) {
      await supabaseAdmin
        .from('push_subscriptions')
        .delete()
        .in('id', staleIds);
      console.log(`Removed ${staleIds.length} stale subscriptions`);
    }

    return res.status(200).json({
      message: 'Daily reminders sent',
      sent,
      failed,
      staleRemoved: staleIds.length,
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
