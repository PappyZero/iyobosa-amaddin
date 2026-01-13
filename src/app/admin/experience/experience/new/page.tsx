import ExperienceForm from '@/components/admin/experience-form';

export default function NewExperiencePage() {
  return (
    <div className="container py-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create Work Experience</h1>
        <p className="text-muted-foreground mt-2">
          Add a new work experience to your portfolio.
        </p>
      </div>
      
      <div className="bg-card rounded-lg border p-6">
        <ExperienceForm />
      </div>
    </div>
  );
}
