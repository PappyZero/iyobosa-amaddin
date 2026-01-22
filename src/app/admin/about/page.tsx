"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function AdminAboutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // for main form save
  const [error, setError] = useState<string | null>(null);

  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  useEffect(() => {
    const init = async () => {
      const user = await supabase.auth.getUser();
      if (!user) {
        router.replace("/admin/login");
        return;
      }

      const { data, error } = await supabase
        .from("about_me_sections")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        setError(error.message);
      } else if (data) {
        setHeadline(data.headline ?? "");
        setBio(data.bio ?? "");
        setProfileImageUrl(data.profile_image_url ?? "");
      }

      setLoading(false);
    };

    init();
  }, [router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const { data: existing } = await supabase
      .from("about_me_sections")
      .select("id")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const payload = {
      headline,
      bio,
      profile_image_url: profileImageUrl || null,
    };

    let error;
    if (existing?.id) {
      ({ error } = await supabase
        .from("about_me_sections")
        .update(payload)
        .eq("id", existing.id));
    } else {
      ({ error } = await supabase.from("about_me_sections").insert(payload));
    }

    setSaving(false);
    if (error) {
      setError(error.message);
      toast({
        title: "Error saving About Me",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "About Me saved",
        description: "Your About Me content has been updated.",
      });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push('/admin')}
        >
          ← Back to Dashboard
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Edit About Me</h2>
          <p className="text-muted-foreground mt-1">Update your personal information and bio</p>
        </div>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div>
        <label className="block text-sm font-medium mb-1">Headline</label>
        <Input value={headline} onChange={e => setHeadline(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Bio</label>
        <Textarea value={bio} onChange={e => setBio(e.target.value)} rows={6} />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium mb-1">Profile Image</label>
        {profileImageUrl && (
          <p className="text-xs text-muted-foreground break-all">
            Current: {profileImageUrl}
          </p>
        )}
        <Input
          type="file"
          accept="image/*"
          onChange={async e => {
            const file = e.target.files?.[0];
            if (!file) return;

            // This upload only affects storage + local state.
            // The profile record is not saved until the user clicks "Save".
            setError(null);

            const filePath = `about/profile-${Date.now()}-${file.name}`;
            const { error: uploadError } = await supabase.storage
              .from("portfolio-assets")
              .upload(filePath, file, { upsert: false });

            if (uploadError) {
              setError(uploadError.message);
              toast({
                title: "Image upload failed",
                description: uploadError.message,
                variant: "destructive",
              });
              return;
            }

            const { data } = supabase.storage
              .from("portfolio-assets")
              .getPublicUrl(filePath);

            setProfileImageUrl(data.publicUrl);
            toast({
              title: "Image uploaded",
              description: "Image uploaded. Click Save to apply it to your profile.",
            });
          }}
        />
      </div>
      <Button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
