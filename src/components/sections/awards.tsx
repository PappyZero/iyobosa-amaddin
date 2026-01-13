import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AWARDS } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Medal } from "lucide-react";
import Image from "next/image";

const AwardsSection = () => {
    return (
        <section id="awards" className="py-20 md:py-28">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                        Awards & Achievements
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Recognitions for dedication and excellence.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {AWARDS.map((award) => {
                        const placeholder = PlaceHolderImages.find(p => p.id === award.imageId);
                        const imageUrl = placeholder?.imageUrl ?? `https://picsum.photos/seed/${award.title}/400/300`;
                        const imageHint = placeholder?.imageHint ?? "award recognition";
                        return (
                            <Card key={award.title} className="overflow-hidden">
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={imageUrl}
                                        alt={`Image for ${award.title}`}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={imageHint}
                                    />
                                </div>
                                <CardHeader>
                                    <div className="flex items-start gap-4">
                                        <Medal className="mt-1 h-8 w-8 text-primary" />
                                        <div>
                                            <CardTitle className="font-headline text-xl">{award.title}</CardTitle>
                                            <p className="text-sm font-medium text-muted-foreground">{award.issuer} - {award.year}</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p>{award.description}</p>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};

export default AwardsSection;
