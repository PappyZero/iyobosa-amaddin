import SkillCategoryForm from '@/components/admin/skill-category-form';

export default function NewSkillCategoryPage() {
  return (
    <div className="container py-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create Skill Category</h1>
        <p className="text-muted-foreground mt-2">
          Add a new skill category to organize your technical skills.
        </p>
      </div>
      
      <div className="bg-card rounded-lg border p-6">
        <SkillCategoryForm />
      </div>
    </div>
  );
}
