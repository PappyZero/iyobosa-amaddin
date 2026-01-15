import { supabase } from './supabase-client';

export type Project = {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  image_id: string;
  github_url: string;
  live_url: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching projects:', error);
    return [];
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching project ${id}:`, error);
    return null;
  }

  return data;
}

export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single();

  if (error) {
    console.error('Error creating project:', error);
    throw error;
  }

  return data;
}

export async function updateProject(
  id: string,
  updates: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>
) {
  const { data, error } = await supabase
    .from('projects')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating project ${id}:`, error);
    throw error;
  }

  return data;
}

export async function deleteProject(id: string) {
  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) {
    console.error(`Error deleting project ${id}:`, error);
    throw error;
  }
}