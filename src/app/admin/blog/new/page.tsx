import BlogForm from '@/components/admin/blog-form';

export default function NewBlogPostPage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create Blog Post</h1>
        <p className="text-muted-foreground mt-2">
          Write and publish a new blog post.
        </p>
      </div>
      
      <div className="bg-card rounded-lg border p-6">
        <BlogForm />
      </div>
    </div>
  );
}
