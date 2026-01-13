import { supabase } from './supabase-client';

export type AboutMeRecord = {
  id: string;
  headline: string;
  bio: string;
  highlights: unknown;
  profile_image_url: string | null;
};

export async function getAboutMeSection(): Promise<AboutMeRecord | null> {
  const { data, error } = await supabase
    .from('about_me_sections')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching about me section from Supabase', error);
    return null;
  }

  return data as AboutMeRecord | null;
}
