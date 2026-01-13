'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SocialLink, createSocialLink, updateSocialLink } from '@/lib/social';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

type SocialFormProps = {
  link?: SocialLink;
  onSuccess?: () => void;
};

export default function SocialForm({ link, onSuccess }: SocialFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    platform: link?.platform || '',
    url: link?.url || '',
    display_name: link?.display_name || '',
    icon: link?.icon || '',
    sort_order: link?.sort_order?.toString() || '0',
    active: link?.active || true,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name: string, value: string | boolean) => {
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
      const linkData = {
        platform: formData.platform.trim(),
        url: formData.url.trim(),
        display_name: formData.display_name.trim(),
        icon: formData.icon.trim(),
        sort_order: parseInt(formData.sort_order, 10) || 0,
        active: formData.active,
      };
      
      if (link) {
        await updateSocialLink(link.id, linkData);
        toast({
          title: 'Success',
          description: 'Social link updated successfully',
        });
      } else {
        await createSocialLink(linkData);
        toast({
          title: 'Success',
          description: 'Social link created successfully',
        });
      }
      
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/admin/social');
      }
    } catch (error) {
      console.error('Error saving social link:', error);
      toast({
        title: 'Error',
        description: 'Failed to save social link',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="platform">Platform Name</Label>
        <Input
          id="platform"
          name="platform"
          value={formData.platform}
          onChange={(e) => handleChange('platform', e.target.value)}
          placeholder="e.g., YouTube, Twitter, LinkedIn"
          required
        />
      </div>

      <div>
        <Label htmlFor="display_name">Display Name</Label>
        <Input
          id="display_name"
          name="display_name"
          value={formData.display_name}
          onChange={(e) => handleChange('display_name', e.target.value)}
          placeholder="e.g., @MajidByteHQ, My LinkedIn"
          required
        />
      </div>

      <div>
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          name="url"
          type="url"
          value={formData.url}
          onChange={(e) => handleChange('url', e.target.value)}
          placeholder="https://youtube.com/@MajidByteHQ"
          required
        />
      </div>

      <div>
        <Label htmlFor="icon">Icon (Lucide Icon Name)</Label>
        <Input
          id="icon"
          name="icon"
          value={formData.icon}
          onChange={(e) => handleChange('icon', e.target.value)}
          placeholder="e.g., Youtube, Twitter, Linkedin"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Use Lucide React icon names (without extension)
        </p>
      </div>

      <div>
        <Label htmlFor="sort_order">Sort Order</Label>
        <Input
          id="sort_order"
          name="sort_order"
          type="number"
          value={formData.sort_order}
          onChange={(e) => handleChange('sort_order', e.target.value)}
          placeholder="0"
          min="0"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Lower numbers appear first
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Label htmlFor="active">Active</Label>
          <Switch
            id="active"
            checked={formData.active}
            onCheckedChange={(checked) => handleChange('active', checked)}
          />
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {link ? 'Updating...' : 'Creating...'}
          </>
        ) : (
          <>
            {link ? 'Update Social Link' : 'Create Social Link'}
          </>
        )}
      </Button>
    </form>
  );
}
