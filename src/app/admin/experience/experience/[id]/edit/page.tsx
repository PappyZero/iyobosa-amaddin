'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ExperienceForm from '@/components/admin/experience-form';
import { getExperienceById } from '@/lib/experience';
import { Loader2 } from 'lucide-react';

export default function EditExperiencePage() {
  const params = useParams();
  const router = useRouter();
  const [experience, setExperience] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadExperience = async () => {
      try {
        const data = await getExperienceById(params.id as string);
        if (data) {
          setExperience(data);
        } else {
          setError('Experience not found');
        }
      } catch (err) {
        setError('Failed to load experience');
        console.error('Error loading experience:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadExperience();
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

  if (error || !experience) {
    return (
      <div className="container py-8 max-w-2xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-destructive mb-2">Error</h1>
          <p className="text-muted-foreground">{error || 'Experience not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Work Experience</h1>
        <p className="text-muted-foreground mt-2">
          Update your work experience information.
        </p>
      </div>
      
      <div className="bg-card rounded-lg border p-6">
        <ExperienceForm experience={experience} />
      </div>
    </div>
  );
}
