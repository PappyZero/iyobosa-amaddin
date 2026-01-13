import { supabase } from './supabase-client';

export type SkillCategory = {
  id: string;
  category: string;
  icon: string; // Store icon name as string
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Skill = {
  id: string;
  category_id: string;
  name: string;
  proficiency: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type SkillCategoryWithSkills = SkillCategory & {
  skills: Skill[];
};

export async function getSkillCategories(): Promise<SkillCategoryWithSkills[]> {
  const { data: categories, error: categoriesError } = await supabase
    .from('skill_categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (categoriesError) {
    console.error('Error fetching skill categories:', categoriesError);
    return [];
  }

  // Get skills for each category
  const categoriesWithSkills = await Promise.all(
    (categories || []).map(async (category) => {
      const { data: skills, error: skillsError } = await supabase
        .from('skills')
        .select('*')
        .eq('category_id', category.id)
        .order('sort_order', { ascending: true });

      if (skillsError) {
        console.error(`Error fetching skills for category ${category.id}:`, skillsError);
        return { ...category, skills: [] };
      }

      return { ...category, skills: skills || [] };
    })
  );

  return categoriesWithSkills;
}

export async function getSkillCategoryById(id: string): Promise<SkillCategory | null> {
  const { data, error } = await supabase
    .from('skill_categories')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching skill category ${id}:`, error);
    return null;
  }

  return data;
}

export async function createSkillCategory(category: Omit<SkillCategory, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('skill_categories')
    .insert(category)
    .select()
    .single();

  if (error) {
    console.error('Error creating skill category:', error);
    throw error;
  }

  return data;
}

export async function updateSkillCategory(
  id: string,
  updates: Partial<Omit<SkillCategory, 'id' | 'created_at' | 'updated_at'>>
) {
  const { data, error } = await supabase
    .from('skill_categories')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating skill category ${id}:`, error);
    throw error;
  }

  return data;
}

export async function deleteSkillCategory(id: string) {
  // First delete all skills in this category
  const { error: skillsError } = await supabase
    .from('skills')
    .delete()
    .eq('category_id', id);

  if (skillsError) {
    console.error(`Error deleting skills for category ${id}:`, skillsError);
    throw skillsError;
  }

  // Then delete the category
  const { error } = await supabase.from('skill_categories').delete().eq('id', id);

  if (error) {
    console.error(`Error deleting skill category ${id}:`, error);
    throw error;
  }
}

export async function createSkill(skill: Omit<Skill, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('skills')
    .insert(skill)
    .select()
    .single();

  if (error) {
    console.error('Error creating skill:', error);
    throw error;
  }

  return data;
}

export async function updateSkill(
  id: string,
  updates: Partial<Omit<Skill, 'id' | 'created_at' | 'updated_at'>>
) {
  const { data, error } = await supabase
    .from('skills')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating skill ${id}:`, error);
    throw error;
  }

  return data;
}

export async function deleteSkill(id: string) {
  const { error } = await supabase.from('skills').delete().eq('id', id);

  if (error) {
    console.error(`Error deleting skill ${id}:`, error);
    throw error;
  }
}
