'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Education, createEducation, updateEducation } from '@/lib/experience';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

type EducationFormProps = {
  education?: Education;
  onSuccess?: () => void;
};

export default function EducationForm({ education, onSuccess }: EducationFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    degree: education?.degree || '',
    institution: education?.institution || '',
    period: education?.period || '',
    description: education?.description || '',
    sort_order: education?.sort_order?.toString() || '0',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const educationData = {
        degree: formData.degree.trim(),
        institution: formData.institution.trim(),
        period: formData.period.trim(),
        description: formData.description.trim(),
        sort_order: parseInt(formData.sort_order, 10) || 0,
      };
      
      if (education) {
        await updateEducation(education.id, educationData);
        toast({
          title: 'Success',
          description: 'Education updated successfully',
        });
      } else {
        await createEducation(educationData);
        toast({
          title: 'Success',
          description: 'Education created successfully',
        });
      }
      
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/admin/experience');
      }
      
    } catch (error) {
      console.error('Error saving education:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save education',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="degree">Degree *</Label>
        <Input
          id="degree"
          name="degree"
          value={formData.degree}
          onChange={(e) => handleChange('degree', e.target.value)}
          placeholder="e.g., B.Sc. in Computer Science"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="institution">Institution *</Label>
        <Input
          id="institution"
          name="institution"
          value={formData.institution}
          onChange={(e) => handleChange('institution', e.target.value)}
          placeholder="e.g., University of Technology"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="period">Period *</Label>
        <Input
          id="period"
          name="period"
          value={formData.period}
          onChange={(e) => handleChange('period', e.target.value)}
          placeholder="e.g., 2013 - 2017"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe your education, achievements, focus areas..."
          rows={5}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="sort_order">Sort Order</Label>
        <Input
          id="sort_order"
          name="sort_order"
          type="number"
          value={formData.sort_order}
          onChange={(e) => handleChange('sort_order', e.target.value)}
          min="0"
          step="1"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Lower numbers appear first in the list
        </p>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/experience')}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {education ? 'Update Education' : 'Create Education'}
        </Button>
      </div>
    </form>
  );
}
