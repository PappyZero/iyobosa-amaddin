"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

export default function AdminHomePage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/admin/login");
      } else {
        setChecking(false);
      }
    };
    check();
  }, [router]);

  if (checking) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <p className="text-muted-foreground">Manage your portfolio content.</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <Link href="/admin/hero">Edit Hero Section</Link>
        </li>
        <li>
          <Link href="/admin/about">Edit About Me</Link>
        </li>
        <li>
          <Link href="/admin/projects">Edit Projects</Link>
        </li>
        <li>
          <Link href="/admin/skills">Edit Skills</Link>
        </li>
        <li>
          <Link href="/admin/experience">Edit Experience</Link>
        </li>
        <li>
          <Link href="/admin/blog">Edit Blog</Link>
        </li>
        <li>
          <Link href="/admin/social">Edit Social Links</Link>
        </li>
        <li>
          <Link href="/admin/contact">View Contact Messages</Link>
        </li>
      </ul>
    </div>
  );
}
