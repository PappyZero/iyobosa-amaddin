"use client";

import { useFormStatus } from "react-dom";
import { handleCodeExplanation } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Bot, Wand2, CircleDashed } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <CircleDashed className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Explain Code
        </>
      )}
    </Button>
  );
}

const CodeExplainerSection = () => {
  const initialState = { explanation: "", error: "", fieldErrors: {} };
  const [state, formAction] = useActionState(handleCodeExplanation, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.explanation) {
      formRef.current?.reset();
    }
  }, [state.explanation]);

  return (
    <section id="code-explainer" className="py-20 md:py-28">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            AI Code Explainer
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Paste a code snippet and let AI break it down for you.
          </p>
        </div>

        <Card className="mt-12">
          <form ref={formRef} action={formAction}>
            <CardHeader>
              <CardTitle>Enter Code</CardTitle>
              <CardDescription>
                Submit your code snippet below to get a detailed explanation of its functionality and structure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                name="code"
                placeholder={`function hello() {\n  console.log("Hello, World!");\n}`}
                className="min-h-[150px] font-code text-sm"
                required
              />
              {state.fieldErrors?.code && (
                <p className="mt-2 text-sm text-destructive">{state.fieldErrors.code.join(', ')}</p>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">Powered by local AI helper</p>
              <SubmitButton />
            </CardFooter>
          </form>
        </Card>

        {state.explanation && (
          <Alert className="mt-8">
            <Bot className="h-4 w-4" />
            <AlertTitle className="font-headline">AI Explanation</AlertTitle>
            <AlertDescription className="prose prose-invert prose-sm max-w-none text-foreground">
              <pre className="mt-4 whitespace-pre-wrap rounded-md bg-muted p-4 font-body">
                {state.explanation}
              </pre>
            </AlertDescription>
          </Alert>
        )}

        {state.error && !state.fieldErrors && (
          <Alert variant="destructive" className="mt-8">
            <Terminal className="h-4 w-4" />
            <AlertTitle>An Error Occurred</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}
      </div>
    </section>
  );
};

export default CodeExplainerSection;
