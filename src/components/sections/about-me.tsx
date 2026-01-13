import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, ExternalLink } from "lucide-react";
import { getAboutMeSection } from "@/lib/about";
import { getSocialLinks } from "@/lib/social";
import * as Icons from 'lucide-react';

const AboutMeSection = async () => {
    const about = await getAboutMeSection();
    const socialLinks = await getSocialLinks();

    const aboutImage = PlaceHolderImages.find(p => p.id === 'about-me');
    const imageUrl = about?.profile_image_url ?? aboutImage?.imageUrl ?? 'https://picsum.photos/seed/me/400/400';
    const imageHint = aboutImage?.imageHint ?? 'portrait';

    const headline = about?.headline ?? 'About Me';
    const bio = about?.bio ??
        "Hello! I'm a passionate Full-Stack Engineer with a knack for building robust, scalable web applications and a deep interest in transformative power of blockchain technology. With a foundation in computer science and years of hands-on experience, I thrive on solving complex problems and turning innovative ideas into reality.";

    const getIconComponent = (iconName: string) => {
        const IconComponent = (Icons as any)[iconName];
        return IconComponent || Icons.ExternalLink;
    };

    return (
        <section id="about" className="bg-muted/30 py-20 md:py-28">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                    <div className="md:col-span-1">
                        <Card className="overflow-hidden rounded-lg">
                            <div className="relative aspect-square w-full">
                                <Image 
                                    src={imageUrl}
                                    alt="A portrait of Majid"
                                    fill
                                    className="object-cover"
                                    data-ai-hint={imageHint}
                                />
                            </div>
                        </Card>
                    </div>
                    <div className="md:col-span-2">
                        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                            {headline}
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            {bio}
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <Button size="lg" asChild>
                                <a href="/resume.pdf" download>
                                    <Download className="mr-2 h-5 w-5" />
                                    Download Resume
                                </a>
                            </Button>
                            
                            {socialLinks.length > 0 && (
                                <div className="flex gap-2">
                                    {socialLinks.slice(0, 4).map((link) => {
                                        const IconComponent = getIconComponent(link.icon);
                                        return (
                                            <Button key={link.id} variant="outline" size="lg" asChild>
                                                <a 
                                                    href={link.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    aria-label={link.platform}
                                                >
                                                    <IconComponent className="h-5 w-5" />
                                                </a>
                                            </Button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutMeSection;
