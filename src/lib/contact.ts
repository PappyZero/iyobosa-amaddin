import { supabase } from './supabase-client';

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
  updated_at: string;
};

export async function getContactMessages(): Promise<ContactMessage[]> {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching contact messages:', error);
    return [];
  }

  return data || [];
}

export async function getContactMessageById(id: string): Promise<ContactMessage | null> {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching contact message ${id}:`, error);
    return null;
  }

  return data;
}

export async function createContactMessage(message: Omit<ContactMessage, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert(message)
    .select()
    .single();

  if (error) {
    console.error('Error creating contact message:', error);
    throw error;
  }

  return data;
}

export async function updateContactMessage(
  id: string,
  updates: Partial<Omit<ContactMessage, 'id' | 'created_at' | 'updated_at'>>
) {
  const { data, error } = await supabase
    .from('contact_messages')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating contact message ${id}:`, error);
    throw error;
  }

  return data;
}

export async function deleteContactMessage(id: string) {
  const { error } = await supabase.from('contact_messages').delete().eq('id', id);

  if (error) {
    console.error(`Error deleting contact message ${id}:`, error);
    throw error;
  }
}

export async function markContactMessageAsRead(id: string) {
  const { data, error } = await supabase
    .from('contact_messages')
    .update({ read: true, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error marking contact message ${id} as read:`, error);
    throw error;
  }

  return data;
}
