'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Experience, createExperience, updateExperience } from '@/lib/experience';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

type ExperienceFormProps = {
  experience?: Experience;
  onSuccess?: () => void;
};

export default function ExperienceForm({ experience, onSuccess }: ExperienceFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    role: experience?.role || '',
    company: experience?.company || '',
    period: experience?.period || '',
    description: experience?.description || '',
    sort_order: experience?.sort_order?.toString() || '0',
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
      const experienceData = {
        role: formData.role.trim(),
        company: formData.company.trim(),
        period: formData.period.trim(),
        description: formData.description.trim(),
        sort_order: parseInt(formData.sort_order, 10) || 0,
      };
      
      if (experience) {
        await updateExperience(experience.id, experienceData);
        toast({
          title: 'Success',
          description: 'Experience updated successfully',
        });
      } else {
        await createExperience(experienceData);
        toast({
          title: 'Success',
          description: 'Experience created successfully',
        });
      }
      
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/admin/experience');
      }
      
    } catch (error) {
      console.error('Error saving experience:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save experience',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="role">Role *</Label>
        <Input
          id="role"
          name="role"
          value={formData.role}
          onChange={(e) => handleChange('role', e.target.value)}
          placeholder="e.g., Senior Frontend Developer"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="company">Company *</Label>
        <Input
          id="company"
          name="company"
          value={formData.company}
          onChange={(e) => handleChange('company', e.target.value)}
          placeholder="e.g., Tech Company Inc."
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
          placeholder="e.g., 2020 - Present"
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
          placeholder="Describe your responsibilities and achievements..."
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
          {experience ? 'Update Experience' : 'Create Experience'}
        </Button>
      </div>
    </form>
  );
}
