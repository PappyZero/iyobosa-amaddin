"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Award, FileText, Wrench, Briefcase, PenTool, BookOpen, MessageSquare } from "lucide-react";

const sections = [
  {
    href: "/admin/hero",
    title: "Hero",
    description: "Update your hero section content",
    icon: User,
    color: "text-blue-600"
  },
  {
    href: "/admin/about",
    title: "About Me",
    description: "Edit your personal information and bio",
    icon: User,
    color: "text-blue-600"
  },
  {
    href: "/admin/awards",
    title: "Awards and Achievements",
    description: "Manage your awards and achievements",
    icon: Award,
    color: "text-yellow-600"
  },
  {
    href: "/admin/licences",
    title: "Licenses and Certifications",
    description: "Add and manage your professional licenses",
    icon: FileText,
    color: "text-green-600"
  },
  {
    href: "/admin/skills",
    title: "Skills",
    description: "Update your technical and soft skills",
    icon: Wrench,
    color: "text-purple-600"
  },
  {
    href: "/admin/projects",
    title: "Projects",
    description: "Showcase your portfolio projects",
    icon: Briefcase,
    color: "text-orange-600"
  },
  {
    href: "/admin/experience",
    title: "Experience",
    description: "Manage your work experience",
    icon: PenTool,
    color: "text-indigo-600"
  },
  {
    href: "/admin/blog",
    title: "Blogs",
    description: "Write and manage your blog posts",
    icon: BookOpen,
    color: "text-pink-600"
  },
  {
    href: "/admin/social",
    title: "Contacts",
    description: "Manage social links and contact messages",
    icon: MessageSquare,
    color: "text-teal-600"
  }
];

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
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <p className="text-muted-foreground mt-2">Manage your portfolio content</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.href} href={section.href}>
              <Card className="h-full border-gray-300 hover:border-gray-400 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 active:border-gray-400 active:shadow-lg active:shadow-gray-200/50 active:-translate-y-1 transition-all duration-300 ease-out cursor-pointer group flex flex-col min-h-[180px] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="pb-3 flex-shrink-0 p-4 relative z-10">
                  <div className="flex flex-col items-center gap-3">
                    <div className={`p-3 rounded-lg bg-gray-50 group-hover:bg-gradient-to-br group-hover:from-gray-100 group-hover:to-gray-200 group-active:bg-gradient-to-br group-active:from-gray-100 group-active:to-gray-200 transition-all duration-300 flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 group-active:scale-110 group-active:rotate-3`}>
                      <Icon className={`h-6 w-6 ${section.color} transition-transform duration-300 group-hover:scale-110 group-active:scale-110`} />
                    </div>
                    <CardTitle className="text-lg font-semibold leading-tight break-words w-full text-center group-hover:text-gray-900 group-active:text-gray-900 transition-colors duration-300">
                      {section.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-4 pt-0 relative z-10">
                  <CardDescription className="text-sm leading-relaxed break-words text-center group-hover:text-gray-600 group-active:text-gray-600 transition-colors duration-300">
                    {section.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
