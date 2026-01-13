import { supabase } from './supabase-client';

export type HeroSectionRecord = {
  id: string;
  title: string;
  subtitle: string | null;
  tagline: string | null;
  cta_primary_label: string | null;
  cta_primary_url: string | null;
  cta_secondary_label: string | null;
  cta_secondary_url: string | null;
  hero_image_url: string | null;
};

export async function getHeroSection(): Promise<HeroSectionRecord | null> {
  const { data, error } = await supabase
    .from('hero_sections')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching hero section from Supabase', error);
    return null;
  }

  return data as HeroSectionRecord | null;
}
