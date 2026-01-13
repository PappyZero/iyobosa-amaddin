'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getSkillCategories } from '@/lib/skills';
import { Code, Database, Globe, HardDrive, Layers, Smartphone, GitBranch } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const iconMap = {
  Code,
  Database,
  Globe,
  HardDrive,
  Layers,
  Smartphone,
  GitBranch,
};

const SkillsSection = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getSkillCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error loading skill categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <section id="skills" className="bg-muted/30 py-20 md:py-28">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
              Technical Skills
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A snapshot of my expertise across the stack.
            </p>
          </div>
          <div className="mt-12 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Technical Skills
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A snapshot of my expertise across the stack.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {categories.map((skillCategory) => {
            const IconComponent = iconMap[skillCategory.icon as keyof typeof iconMap] || Code;
            
            return (
              <Card key={skillCategory.id} className="bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <IconComponent className="h-8 w-8 text-primary" />
                    <span className="font-headline text-2xl">{skillCategory.category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.skills.map((skill: any) => (
                      <Badge key={skill.id} variant="secondary" className="text-sm">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
