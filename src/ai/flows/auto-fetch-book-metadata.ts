'use server';
/**
 * @fileOverview An AI agent for automatically fetching book metadata from various sources.
 *
 * - autoFetchBookMetadata - A function that handles the book metadata fetching process.
 * - AutoFetchBookMetadataInput - The input type for the autoFetchBookMetadata function.
 * - AutoFetchBookMetadataOutput - The return type for the autoFetchBookMetadata function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutoFetchBookMetadataInputSchema = z.object({
  sourceId: z.string().describe('The source ID of the book (ISBN, Open Library ID, Internet Archive ID, or Gutenberg URL).'),
});
export type AutoFetchBookMetadataInput = z.infer<typeof AutoFetchBookMetadataInputSchema>;

const AutoFetchBookMetadataOutputSchema = z.object({
  title: z.string().describe('The title of the book.'),
  authors: z.array(z.string()).describe('The authors of the book.'),
  year: z.number().describe('The year of publication.'),
  description: z.string().describe('A brief description of the book.'),
  categories: z.array(z.string()).describe('The categories the book belongs to.'),
  cover_url: z.string().describe('URL of the book cover image.'),
});
export type AutoFetchBookMetadataOutput = z.infer<typeof AutoFetchBookMetadataOutputSchema>;

export async function autoFetchBookMetadata(input: AutoFetchBookMetadataInput): Promise<AutoFetchBookMetadataOutput> {
  return autoFetchBookMetadataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'autoFetchBookMetadataPrompt',
  input: {schema: AutoFetchBookMetadataInputSchema},
  output: {schema: AutoFetchBookMetadataOutputSchema},
  prompt: `You are an expert in identifying and extracting book metadata from various sources.

  Given the following source ID, extract the book's title, authors, year of publication, description, categories, and cover image URL.

  Source ID: {{{sourceId}}}

  Ensure that the output is well-formatted and accurate.
`,
});

const autoFetchBookMetadataFlow = ai.defineFlow(
  {
    name: 'autoFetchBookMetadataFlow',
    inputSchema: AutoFetchBookMetadataInputSchema,
    outputSchema: AutoFetchBookMetadataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
