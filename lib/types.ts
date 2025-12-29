export type UserProfile = {
  id: string;
  email: string;
  full_name?: string | null;
  username?: string | null;
  role?: string | null;
  created_at?: string | null;
};

export type Contact = {
  id: string;
  owner_id?: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  notes?: string | null;
  created_at?: string | null;
};

export type Deal = {
  id: string;
  owner_id?: string;
  customer_id?: string;
  title: string;
  amount?: number | null;
  status: 'new'|'contacted'|'offer_sent'|'won'|'lost';
  updated_at?: string | null;
};

export type Reminder = {
  id: string;
  owner_id?: string;
  customer_id?: string | null;
  note?: string | null;
  due_at?: string | null;
  done?: boolean;
  created_at?: string | null;
};
