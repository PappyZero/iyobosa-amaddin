'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SkillCategory, createSkillCategory, updateSkillCategory } from '@/lib/skills';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const iconOptions = [
  { value: 'Code', label: 'Code', icon: '💻' },
  { value: 'Database', label: 'Database', icon: '🗄️' },
  { value: 'Globe', label: 'Globe', icon: '🌐' },
  { value: 'HardDrive', label: 'Hard Drive', icon: '💾' },
  { value: 'Layers', label: 'Layers', icon: '📚' },
  { value: 'Smartphone', label: 'Smartphone', icon: '📱' },
  { value: 'GitBranch', label: 'Git Branch', icon: '🔀' },
];

type SkillCategoryFormProps = {
  category?: SkillCategory;
  onSuccess?: () => void;
};

export default function SkillCategoryForm({ category, onSuccess }: SkillCategoryFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    category: category?.category || '',
    icon: category?.icon || 'Code',
    sort_order: category?.sort_order?.toString() || '0',
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
      const categoryData = {
        category: formData.category.trim(),
        icon: formData.icon,
        sort_order: parseInt(formData.sort_order, 10) || 0,
      };
      
      if (category) {
        await updateSkillCategory(category.id, categoryData);
        toast({
          title: 'Success',
          description: 'Skill category updated successfully',
        });
      } else {
        await createSkillCategory(categoryData);
        toast({
          title: 'Success',
          description: 'Skill category created successfully',
        });
      }
      
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/admin/skills');
      }
      
    } catch (error) {
      console.error('Error saving skill category:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save skill category',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="category">Category Name *</Label>
        <Input
          id="category"
          name="category"
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
          placeholder="e.g., Frontend, Backend, Database"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="icon">Icon *</Label>
        <Select value={formData.icon} onValueChange={(value) => handleChange('icon', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select an icon" />
          </SelectTrigger>
          <SelectContent>
            {iconOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <span>{option.icon}</span>
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
          onClick={() => router.push('/admin/skills')}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {category ? 'Update Category' : 'Create Category'}
        </Button>
      </div>
    </form>
  );
}
