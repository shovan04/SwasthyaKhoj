// SummarizeProviderDetails story: As a user, I want to be able to quickly understand a doctor's specializations and background through an AI-powered summary, so I can make informed decisions about booking appointments.

'use server';

/**
 * @fileOverview Summarizes the details of a healthcare provider using AI.
 *
 * - summarizeProviderDetails - A function that summarizes healthcare provider details.
 * - SummarizeProviderDetailsInput - The input type for the summarizeProviderDetails function.
 * - SummarizeProviderDetailsOutput - The return type for the summarizeProviderDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeProviderDetailsInputSchema = z.object({
  providerDetails: z
    .string()
    .describe('The details of the healthcare provider to summarize.'),
});
export type SummarizeProviderDetailsInput = z.infer<typeof SummarizeProviderDetailsInputSchema>;

const SummarizeProviderDetailsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the healthcare provider.'),
});
export type SummarizeProviderDetailsOutput = z.infer<
  typeof SummarizeProviderDetailsOutputSchema
>;

export async function summarizeProviderDetails(
  input: SummarizeProviderDetailsInput
): Promise<SummarizeProviderDetailsOutput> {
  return summarizeProviderDetailsFlow(input);
}

const summarizeProviderDetailsPrompt = ai.definePrompt({
  name: 'summarizeProviderDetailsPrompt',
  input: {schema: SummarizeProviderDetailsInputSchema},
  output: {schema: SummarizeProviderDetailsOutputSchema},
  prompt: `Summarize the following details of a healthcare provider:\n\nDetails: {{{providerDetails}}}`,
});

const summarizeProviderDetailsFlow = ai.defineFlow(
  {
    name: 'summarizeProviderDetailsFlow',
    inputSchema: SummarizeProviderDetailsInputSchema,
    outputSchema: SummarizeProviderDetailsOutputSchema,
  },
  async input => {
    const {output} = await summarizeProviderDetailsPrompt(input);
    return output!;
  }
);
