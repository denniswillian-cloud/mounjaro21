import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Protect with CRON_SECRET so only Vercel can call this
  const auth = req.headers.authorization;
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error('[keep-alive] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    return res.status(500).json({ ok: false, error: 'Missing env vars' });
  }

  try {
    // Ping the Supabase Auth API — always accessible with service role key
    const response = await fetch(`${supabaseUrl}/auth/v1/admin/users?per_page=1`, {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`[keep-alive] Supabase returned ${response.status}: ${text}`);
      return res.status(200).json({ ok: false, status: response.status, body: text });
    }

    console.log(`[keep-alive] Supabase pinged OK at ${new Date().toISOString()}`);
    return res.status(200).json({ ok: true, pinged: new Date().toISOString() });
  } catch (err) {
    console.error('[keep-alive] Fetch error:', err);
    return res.status(200).json({ ok: false, error: String(err) });
  }
}
