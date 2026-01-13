'use server';

/**
 * Simple, local implementation for explaining a code snippet.
 * This replaces the previous Genkit-based flow so that the
 * project no longer depends on Firebase/Genkit/Google AI.
 */

import {explainCodeLocally, SimpleAiExplanationInput, SimpleAiExplanationOutput} from '@/ai/genkit';

export type ExplainCodeSnippetInput = SimpleAiExplanationInput;
export type ExplainCodeSnippetOutput = SimpleAiExplanationOutput;

export async function explainCodeSnippet(
  input: ExplainCodeSnippetInput,
): Promise<ExplainCodeSnippetOutput> {
  return explainCodeLocally(input);
}
