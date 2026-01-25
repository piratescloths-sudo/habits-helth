'use server';

/**
 * @fileOverview Generates daily motivational quotes and habit tips to keep users inspired and consistent.
 *
 * - generateMotivationalPrompt - A function that generates a motivational prompt.
 * - MotivationalPromptOutput - The return type for the generateMotivationalPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MotivationalPromptOutputSchema = z.object({
  quote: z.string().describe('A motivational quote for the day.'),
  habitTip: z.string().describe('A tip to help users build and maintain habits.'),
});
export type MotivationalPromptOutput = z.infer<typeof MotivationalPromptOutputSchema>;

export async function generateMotivationalPrompt(): Promise<MotivationalPromptOutput> {
  return motivationalPromptFlow();
}

const prompt = ai.definePrompt({
  name: 'motivationalPrompt',
  output: {schema: MotivationalPromptOutputSchema},
  prompt: `You are a motivational assistant that provides daily inspiration.

  Generate a motivational quote and a habit tip to help users stay consistent with their habits.

  Quote: {{quote}}
  Habit Tip: {{habitTip}}`,
});

const motivationalPromptFlow = ai.defineFlow({
  name: 'motivationalPromptFlow',
  outputSchema: MotivationalPromptOutputSchema,
}, async () => {
  const {output} = await prompt({});
  return output!;
});
