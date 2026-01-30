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
  if (
    !process.env.GEMINI_API_KEY ||
    process.env.GEMINI_API_KEY === 'YOUR_API_KEY_HERE'
  ) {
    console.warn(
      'GEMINI_API_KEY is not set or is a placeholder. Returning a default motivational quote.'
    );
    return {
      quote: 'The secret of getting ahead is getting started.',
      author: 'Mark Twain',
    };
  }
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
  try {
    const {output} = await prompt({});
    return output!;
  } catch (error) {
    console.error("Error generating motivational prompt from AI:", error);
    // Return a fallback quote if the AI call fails
    return {
      quote: 'The journey of a thousand miles begins with a single step.',
      author: 'Lao Tzu',
    };
  }
});
