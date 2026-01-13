'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import SkillCategoryForm from '@/components/admin/skill-category-form';
import { getSkillCategoryById } from '@/lib/skills';
import { Loader2 } from 'lucide-react';

export default function EditSkillCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const data = await getSkillCategoryById(params.id as string);
        if (data) {
          setCategory(data);
        } else {
          setError('Skill category not found');
        }
      } catch (err) {
        setError('Failed to load skill category');
        console.error('Error loading skill category:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadCategory();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="container py-8 max-w-2xl mx-auto">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="container py-8 max-w-2xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-destructive mb-2">Error</h1>
          <p className="text-muted-foreground">{error || 'Skill category not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Skill Category</h1>
        <p className="text-muted-foreground mt-2">
          Update the skill category information.
        </p>
      </div>
      
      <div className="bg-card rounded-lg border p-6">
        <SkillCategoryForm category={category} />
      </div>
    </div>
  );
}
