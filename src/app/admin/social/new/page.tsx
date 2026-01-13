import { Metadata } from 'next';
import SocialForm from '@/components/admin/social-form';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Create Social Link | Admin',
};

export default function NewSocialLinkPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/social">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Social Links
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Create Social Link</h1>
          <p className="text-muted-foreground">
            Add a new social media profile or link to your portfolio.
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <SocialForm />
      </div>
    </div>
  );
}
