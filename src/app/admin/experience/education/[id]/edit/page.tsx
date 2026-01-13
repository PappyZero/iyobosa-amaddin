'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import EducationForm from '@/components/admin/education-form';
import { getEducationById } from '@/lib/experience';
import { Loader2 } from 'lucide-react';

export default function EditEducationPage() {
  const params = useParams();
  const router = useRouter();
  const [education, setEducation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEducation = async () => {
      try {
        const data = await getEducationById(params.id as string);
        if (data) {
          setEducation(data);
        } else {
          setError('Education not found');
        }
      } catch (err) {
        setError('Failed to load education');
        console.error('Error loading education:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadEducation();
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

  if (error || !education) {
    return (
      <div className="container py-8 max-w-2xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-destructive mb-2">Error</h1>
          <p className="text-muted-foreground">{error || 'Education not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Education</h1>
        <p className="text-muted-foreground mt-2">
          Update your education information.
        </p>
      </div>
      
      <div className="bg-card rounded-lg border p-6">
        <EducationForm education={education} />
      </div>
    </div>
  );
}
