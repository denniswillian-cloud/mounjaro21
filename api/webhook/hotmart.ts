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

  // --- PURCHASE APPROVED: create user ---
  if (event === 'PURCHASE_APPROVED' || event === 'PURCHASE_COMPLETE') {
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

  // --- REFUND / CANCELLATION: ban user ---
  if (
    event === 'PURCHASE_CANCELED' ||
    event === 'PURCHASE_REFUNDED' ||
    event === 'PURCHASE_CHARGEBACK'
  ) {
    const buyer = body?.data?.buyer;
    if (!buyer?.email) {
      return res.status(400).json({ error: 'Missing buyer email' });
    }

    const email: string = buyer.email;

    try {
      // Find user by email
      const { data: listData, error: listError } = await supabaseAdmin.auth.admin.listUsers();
      if (listError) {
        console.error('Error listing users:', listError);
        return res.status(500).json({ error: listError.message });
      }

      const user = listData.users.find((u) => u.email === email);
      if (!user) {
        console.log(`User not found for refund: ${email}`);
        return res.status(200).json({ message: 'User not found, nothing to revoke', email });
      }

      // Ban user (876000h ≈ 100 years = effectively permanent)
      const { error: banError } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
        ban_duration: '876000h',
      });

      if (banError) {
        console.error('Error banning user:', banError);
        return res.status(500).json({ error: banError.message });
      }

      console.log(`Access revoked for ${email} (event: ${event})`);
      return res.status(200).json({ message: 'Access revoked', email, event });
    } catch (err) {
      console.error('Unexpected error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Ignore all other events
  return res.status(200).json({ message: `Event ${event} ignored` });
}
