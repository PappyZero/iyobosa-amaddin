'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getBlogPosts } from "@/lib/blog";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const BlogSection = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getBlogPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
        <section id="blog" className="bg-muted/30 py-20 md:py-28">
            <div className="container mx-auto">
                <div className="text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                        From the Blog
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Sharing insights on technology, development, and more.
                    </p>
                </div>
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            </div>
        </section>
    );
  }

  return (
        <section id="blog" className="bg-muted/30 py-20 md:py-28">
            <div className="container mx-auto">
                <div className="text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                        From the Blog
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Sharing insights on technology, development, and more.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <Card key={post.id} className="flex flex-col">
                            <CardHeader>
                                {post.image_url && (
                                    <div className="w-full h-48 bg-muted rounded-lg mb-4 overflow-hidden">
                                        <img 
                                            src={post.image_url} 
                                            alt={post.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <CardTitle className="font-headline text-xl">{post.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <CardDescription>{post.excerpt}</CardDescription>
                            </CardContent>
                            <CardFooter>
                                <Button variant="link" asChild className="p-0">
                                    <Link href={post.url || '#'}>
                                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
  );
};

export default BlogSection;
