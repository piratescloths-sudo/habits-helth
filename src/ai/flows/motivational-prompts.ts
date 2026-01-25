'use server';

/**
 * @fileOverview Generates daily motivational quotes.
 *
 * - generateMotivationalPrompt - A function that generates a motivational prompt.
 * - MotivationalPromptOutput - The return type for the generateMotivationalPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MotivationalPromptOutputSchema = z.object({
  quote: z.string().describe('A motivational quote.'),
  author: z.string().describe('The author of the quote.'),
});
export type MotivationalPromptOutput = z.infer<typeof MotivationalPromptOutputSchema>;

export async function generateMotivationalPrompt(): Promise<MotivationalPromptOutput> {
  return motivationalPromptFlow();
}

const prompt = ai.definePrompt({
  name: 'motivationalPrompt',
  output: {schema: MotivationalPromptOutputSchema},
  prompt: `You are a motivational assistant. Provide an inspiring quote about routines or habits.`,
});

const motivationalPromptFlow = ai.defineFlow({
  name: 'motivationalPromptFlow',
  outputSchema: MotivationalPromptOutputSchema,
}, async () => {
  const {output} = await prompt({});
  return output!;
});
