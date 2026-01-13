'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSkillCategoryById, createSkill, updateSkill, deleteSkill } from '@/lib/skills';
import { supabase } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ManageSkillsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  
  const [category, setCategory] = useState<any>(null);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSkill, setNewSkill] = useState({ name: '', proficiency: '50' });
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  useEffect(() => {
    loadCategoryAndSkills();
  }, [params.id]);

  const loadCategoryAndSkills = async () => {
    try {
      const categoryData = await getSkillCategoryById(params.id as string);
      if (categoryData) {
        setCategory(categoryData);
        // Load skills for this category
        const { data: skillsData, error } = await supabase
          .from('skills')
          .select('*')
          .eq('category_id', params.id)
          .order('sort_order', { ascending: true });
        
        if (error) throw error;
        setSkills(skillsData || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load category and skills',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name.trim()) return;

    setIsAddingSkill(true);
    try {
      await createSkill({
        category_id: params.id as string,
        name: newSkill.name.trim(),
        proficiency: parseInt(newSkill.proficiency, 10) || 50,
        sort_order: skills.length,
      });
      
      toast({
        title: 'Success',
        description: 'Skill added successfully',
      });
      
      setNewSkill({ name: '', proficiency: '50' });
      loadCategoryAndSkills();
    } catch (error) {
      console.error('Error adding skill:', error);
      toast({
        title: 'Error',
        description: 'Failed to add skill',
        variant: 'destructive',
      });
    } finally {
      setIsAddingSkill(false);
    }
  };

  const handleDeleteSkill = async (skillId: string, skillName: string) => {
    if (!confirm(`Are you sure you want to delete "${skillName}"?`)) return;

    try {
      await deleteSkill(skillId);
      toast({
        title: 'Success',
        description: 'Skill deleted successfully',
      });
      loadCategoryAndSkills();
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete skill',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="container py-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container py-8 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-destructive mb-2">Category not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/skills">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Link>
          </Button>
        </div>
        <h1 className="text-3xl font-bold">Manage Skills: {category.category}</h1>
        <p className="text-muted-foreground mt-2">
          Add and manage skills for this category.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add New Skill Form */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Skill</CardTitle>
            <CardDescription>Add a new skill to this category</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddSkill} className="space-y-4">
              <div>
                <Label htmlFor="skill-name">Skill Name</Label>
                <Input
                  id="skill-name"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., React, TypeScript, PostgreSQL"
                  required
                />
              </div>
              <div>
                <Label htmlFor="skill-proficiency">Proficiency (%)</Label>
                <Input
                  id="skill-proficiency"
                  type="number"
                  min="0"
                  max="100"
                  value={newSkill.proficiency}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, proficiency: e.target.value }))}
                  required
                />
              </div>
              <Button type="submit" disabled={isAddingSkill || !newSkill.name.trim()}>
                {isAddingSkill && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Plus className="mr-2 h-4 w-4" />
                Add Skill
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Existing Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Existing Skills ({skills.length})</CardTitle>
            <CardDescription>Current skills in this category</CardDescription>
          </CardHeader>
          <CardContent>
            {skills.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No skills added yet. Add your first skill using the form.
              </p>
            ) : (
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{skill.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteSkill(skill.id, skill.name)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
