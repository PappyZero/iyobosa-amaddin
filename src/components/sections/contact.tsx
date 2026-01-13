"use client";

import { useFormState, useFormStatus } from "react-dom";
import { handleContact } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useRef } from "react";
import { Send, CheckCircle, AlertCircle, CircleDashed } from "lucide-react";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full">
            {pending ? (
                <>
                    <CircleDashed className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                </>
            ) : (
                <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                </>
            )}
        </Button>
    );
}

const ContactSection = () => {
    const initialState = { message: "", error: "", fieldErrors: {} };
    const [state, formAction] = useFormState(handleContact, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.message && !state.error) {
            formRef.current?.reset();
        }
    }, [state]);

    return (
        <section id="contact" className="py-20 md:py-28">
            <div className="container mx-auto max-w-xl">
                <div className="text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                        Get In Touch
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Have a project in mind or just want to say hi? I'd love to hear from you.
                    </p>
                </div>

                <Card className="mt-12">
                    <form ref={formRef} action={formAction}>
                        <CardHeader>
                            <CardTitle>Contact Form</CardTitle>
                            <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-1.5">
                                    <Input id="name" name="name" placeholder="Your Name" required />
                                    {state.fieldErrors?.name && <p className="text-sm text-destructive">{state.fieldErrors.name.join(', ')}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <Input id="email" name="email" type="email" placeholder="Your Email" required />
                                    {state.fieldErrors?.email && <p className="text-sm text-destructive">{state.fieldErrors.email.join(', ')}</p>}
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <Textarea id="message" name="message" placeholder="Your Message" required className="min-h-[120px]" />
                                {state.fieldErrors?.message && <p className="text-sm text-destructive">{state.fieldErrors.message.join(', ')}</p>}
                            </div>
                            <SubmitButton />
                        </CardContent>
                    </form>
                </Card>

                {state.message && (
                    <Alert className="mt-6">
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>{state.message}</AlertDescription>
                    </Alert>
                )}
                {state.error && (
                    <Alert variant="destructive" className="mt-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{state.error}</AlertDescription>
                    </Alert>
                )}
            </div>
        </section>
    );
}

export default ContactSection;
