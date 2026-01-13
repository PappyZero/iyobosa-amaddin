/**
 * Simple placeholder AI helper used to keep the app self-contained
 * without any external Genkit/Firebase/Google AI dependencies.
 */

export type SimpleAiExplanationInput = {
  codeSnippet: string;
};

export type SimpleAiExplanationOutput = {
  explanation: string;
};

export async function explainCodeLocally(
  input: SimpleAiExplanationInput,
): Promise<SimpleAiExplanationOutput> {
  const {codeSnippet} = input;

  // Very basic placeholder "explanation" to avoid external AI services.
  return {
    explanation:
      'This is a placeholder explanation generated locally. ' +
      'The code you provided is:\n\n' +
      codeSnippet,
  };
}
