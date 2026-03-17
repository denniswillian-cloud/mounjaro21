import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const HOTMART_HOTTOK = process.env.HOTMART_HOTTOK!;
const APP_URL = process.env.APP_URL || 'https://mounjaro21.vercel.app';

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate Hotmart token
  const hottok = req.headers['x-hotmart-hottok'];
  if (!hottok || hottok !== HOTMART_HOTTOK) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const body = req.body;
  const event = body?.event;

  // Only process purchase approved/complete events
  if (event !== 'PURCHASE_APPROVED' && event !== 'PURCHASE_COMPLETE') {
    return res.status(200).json({ message: `Event ${event} ignored` });
  }

  const buyer = body?.data?.buyer;
  if (!buyer?.email) {
    return res.status(400).json({ error: 'Missing buyer email' });
  }

  const email: string = buyer.email;
  const name: string = buyer.name || email.split('@')[0];

  try {
    const { error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      data: { name },
      redirectTo: APP_URL,
    });

    if (error) {
      // If user already exists, that's fine — don't fail
      if (error.message?.includes('already been registered') || error.message?.includes('already exists')) {
        return res.status(200).json({ message: 'User already exists', email });
      }
      console.error('Supabase invite error:', error);
      return res.status(500).json({ error: error.message });
    }

    console.log(`Invite sent to ${email} (${name})`);
    return res.status(200).json({ message: 'Invite sent', email });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
