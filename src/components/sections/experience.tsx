'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getExperience, getEducation } from "@/lib/experience";
import { Briefcase, GraduationCap } from "lucide-react";
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const TimelineItem = ({
  icon: Icon,
  title,
  subtitle,
  period,
  description
}: {
  icon: React.ElementType,
  title: string,
  subtitle: string,
  period: string,
  description: string
}) => (
  <div className="relative pl-8">
    <div className="absolute left-[-5px] top-1.5 h-3 w-3 rounded-full bg-primary border-2 border-background"></div>
    <Card className="bg-card">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Icon className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="font-headline text-xl">{title}</CardTitle>
            <p className="font-medium">{subtitle}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">{period}</p>
        <p>{description}</p>
      </CardContent>
    </Card>
  </div>
);

const ExperienceSection = () => {
  const [experience, setExperience] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [experienceData, educationData] = await Promise.all([
          getExperience(),
          getEducation()
        ]);
        setExperience(experienceData);
        setEducation(educationData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <section id="experience" className="bg-muted/30 py-20 md:py-28">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
              My Journey
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Following my path in technology and education.
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
    <section id="experience" className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            My Journey
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Following my path in technology and education.
          </p>
        </div>

        <div className="relative grid gap-12 md:grid-cols-2">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block"></div>
          
          {/* Experience Column */}
          <div className="md:pr-8">
            <h3 className="mb-8 text-center font-headline text-2xl font-bold md:text-left">Experience</h3>
            <div className="relative space-y-8">
              <div className="absolute left-0 hidden h-full w-px bg-border md:block"></div>
              {experience.map((item, index) => (
                <TimelineItem key={index} icon={Briefcase} title={item.role} subtitle={item.company} period={item.period} description={item.description} />
              ))}
            </div>
          </div>
          
          {/* Education Column */}
          <div className="md:pl-8">
            <h3 className="mb-8 text-center font-headline text-2xl font-bold md:text-left">Education</h3>
            <div className="relative space-y-8">
              <div className="absolute left-0 hidden h-full w-px bg-border md:block"></div>
              {education.map((item, index) => (
                <TimelineItem key={index} icon={GraduationCap} title={item.degree} subtitle={item.institution} period={item.period} description={item.description} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
