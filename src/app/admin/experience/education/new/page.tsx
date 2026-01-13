import EducationForm from '@/components/admin/education-form';

export default function NewEducationPage() {
  return (
    <div className="container py-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create Education</h1>
        <p className="text-muted-foreground mt-2">
          Add a new education entry to your portfolio.
        </p>
      </div>
      
      <div className="bg-card rounded-lg border p-6">
        <EducationForm />
      </div>
    </div>
  );
}
