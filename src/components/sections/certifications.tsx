import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CERTIFICATIONS } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BadgeCheck, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const CertificationsSection = () => {
    return (
        <section id="certifications" className="bg-muted/30 py-20 md:py-28">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                        Licenses & Certifications
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Validating expertise through continuous learning.
                    </p>
                </div>
                 <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {CERTIFICATIONS.map((cert) => {
                        const placeholder = PlaceHolderImages.find(p => p.id === cert.imageId);
                        const imageUrl = placeholder?.imageUrl ?? `https://picsum.photos/seed/${cert.title}/400/300`;
                        const imageHint = placeholder?.imageHint ?? "certificate badge";
                        return (
                            <Card key={cert.title} className="flex flex-col overflow-hidden">
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={imageUrl}
                                        alt={`Badge for ${cert.title}`}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={imageHint}
                                    />
                                </div>
                                <CardHeader className="flex-grow">
                                    <div className="flex items-start gap-4">
                                        <BadgeCheck className="mt-1 h-8 w-8 text-primary" />
                                        <div>
                                            <CardTitle className="font-headline text-xl">{cert.title}</CardTitle>
                                            <p className="text-sm font-medium text-muted-foreground">{cert.issuer} - Issued {cert.year}</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardFooter>
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={cert.url} target="_blank">
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            Show Credential
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};

export default CertificationsSection;
