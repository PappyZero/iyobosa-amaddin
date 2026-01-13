'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase-browser';
import { Project, createProject, updateProject } from '@/lib/projects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Image as ImageIcon, X } from 'lucide-react';

type ProjectFormProps = {
  project?: Project;
  onSuccess?: () => void;
};

export default function ProjectForm({ project, onSuccess }: ProjectFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const supabase = supabaseBrowser;
  
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    tech_stack: project?.tech_stack?.join(', ') || '',
    github_url: project?.github_url || '',
    live_url: project?.live_url || '',
    sort_order: project?.sort_order?.toString() || '0',
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    project?.image_id ? getImageUrl(project.image_id) : null
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function getImageUrl(imageId: string) {
    const { data } = supabase.storage
      .from('portfolio-assets')
      .getPublicUrl(`projects/${imageId}`);
    return data.publicUrl;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate image type and size
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image file (JPEG, PNG, etc.)',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast({
        title: 'File too large',
        description: 'Please upload an image smaller than 5MB',
        variant: 'destructive',
      });
      return;
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    // @ts-ignore - Reset file input
    document.getElementById('image-upload')!.value = '';
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null;
    
    setIsUploading(true);
    
    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `projects/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: false,
        });
      
      if (uploadError) throw uploadError;
      
      return fileName; // Return the image ID (file name in storage)
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload image',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // 1. Upload image if a new one was selected
      let imageId = project?.image_id;
      if (imageFile) {
        const uploadedImageId = await uploadImage();
        if (uploadedImageId) {
          imageId = uploadedImageId;
        } else if (!project?.image_id) {
          throw new Error('Image upload failed');
        }
      }
      
      if (!imageId && !previewUrl) {
        throw new Error('Project image is required');
      }
      
      // 2. Prepare project data
      const projectData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        tech_stack: formData.tech_stack
          .split(',')
          .map(tech => tech.trim())
          .filter(Boolean),
        github_url: formData.github_url.trim() || null,
        live_url: formData.live_url.trim() || null,
        sort_order: parseInt(formData.sort_order, 10) || 0,
        image_id: imageId || project?.image_id || '',
      };
      
      // 3. Create or update project
      if (project) {
        await updateProject(project.id, projectData);
        toast({
          title: 'Success',
          description: 'Project updated successfully',
        });
      } else {
        await createProject(projectData);
        toast({
          title: 'Success',
          description: 'Project created successfully',
        });
      }
      
      // 4. Handle success
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/admin/projects');
      }
      
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save project',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left column - Form fields */}
        <div className="space-y-6">
          <div>
            <Label htmlFor="title">Project Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="My Awesome Project"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="A brief description of your project"
              rows={5}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="tech_stack">Technologies (comma-separated)</Label>
            <Input
              id="tech_stack"
              name="tech_stack"
              value={formData.tech_stack}
              onChange={handleChange}
              placeholder="React, Node.js, PostgreSQL, etc."
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input
                id="github_url"
                name="github_url"
                type="url"
                value={formData.github_url}
                onChange={handleChange}
                placeholder="https://github.com/username/repo"
              />
            </div>
            <div>
              <Label htmlFor="live_url">Live URL</Label>
              <Input
                id="live_url"
                name="live_url"
                type="url"
                value={formData.live_url}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="sort_order">Sort Order</Label>
            <Input
              id="sort_order"
              name="sort_order"
              type="number"
              value={formData.sort_order}
              onChange={handleChange}
              min="0"
              step="1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Lower numbers appear first in the list
            </p>
          </div>
        </div>
        
        {/* Right column - Image upload */}
        <div>
          <Label>Project Image *</Label>
          <div className="mt-1 flex justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-600 px-6 py-10">
            <div className="text-center">
              {previewUrl ? (
                <div className="relative">
                  <div className="relative h-48 w-full rounded-md overflow-hidden">
                    <img
                      src={previewUrl}
                      alt="Project preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                    <label
                      htmlFor="image-upload"
                      className="relative cursor-pointer rounded-md bg-background font-semibold text-primary hover:text-primary/90 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                    >
                      <span>Upload a file</span>
                      <input
                        id="image-upload"
                        name="image-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-muted-foreground">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              )}
            </div>
          </div>
          {!previewUrl && !imageFile && (
            <p className="mt-1 text-sm text-destructive">
              {!project?.image_id && 'An image is required'}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/projects')}
          disabled={isSubmitting || isUploading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting || isUploading}>
          {(isSubmitting || isUploading) && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {project ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
}

