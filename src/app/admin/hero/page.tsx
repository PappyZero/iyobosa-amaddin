"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function AdminHeroPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [primaryLabel, setPrimaryLabel] = useState("");
  const [primaryUrl, setPrimaryUrl] = useState("");
  const [secondaryLabel, setSecondaryLabel] = useState("");
  const [secondaryUrl, setSecondaryUrl] = useState("");

  useEffect(() => {
    const init = async () => {
      const user = await supabase.auth.getUser();
      if (!user) {
        router.replace("/admin/login");
        return;
      }

      const { data, error } = await supabase
        .from("hero_sections")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        setError(error.message);
      } else if (data) {
        setTitle(data.title ?? "");
        setSubtitle(data.subtitle ?? "");
        setPrimaryLabel(data.cta_primary_label ?? "");
        setPrimaryUrl(data.cta_primary_url ?? "");
        setSecondaryLabel(data.cta_secondary_label ?? "");
        setSecondaryUrl(data.cta_secondary_url ?? "");
      }

      setLoading(false);
    };

    init();
  }, [router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const { data: existing } = await supabaseBrowser
      .from("hero_sections")
      .select("id")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const payload = {
      title,
      subtitle,
      cta_primary_label: primaryLabel,
      cta_primary_url: primaryUrl,
      cta_secondary_label: secondaryLabel,
      cta_secondary_url: secondaryUrl,
    };

    let error;
    if (existing?.id) {
      ({ error } = await supabaseBrowser
        .from("hero_sections")
        .update(payload)
        .eq("id", existing.id));
    } else {
      ({ error } = await supabaseBrowser.from("hero_sections").insert(payload));
    }

    setSaving(false);
    if (error) {
      setError(error.message);
      toast({
        title: "Error saving hero section",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Hero section saved",
        description: "Your hero content has been updated.",
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
          <h2 className="text-2xl font-bold">Edit Hero Section</h2>
          <p className="text-muted-foreground mt-1">Update your hero section content</p>
        </div>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <Input value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Subtitle</label>
        <Textarea value={subtitle} onChange={e => setSubtitle(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Primary CTA Label</label>
          <Input value={primaryLabel} onChange={e => setPrimaryLabel(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Primary CTA URL</label>
          <Input value={primaryUrl} onChange={e => setPrimaryUrl(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Secondary CTA Label</label>
          <Input value={secondaryLabel} onChange={e => setSecondaryLabel(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Secondary CTA URL</label>
          <Input value={secondaryUrl} onChange={e => setSecondaryUrl(e.target.value)} />
        </div>
      </div>
      <Button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
