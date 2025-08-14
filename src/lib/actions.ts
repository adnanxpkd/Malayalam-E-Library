'use server';

import { autoFetchBookMetadata, type AutoFetchBookMetadataInput, type AutoFetchBookMetadataOutput } from '@/ai/flows/auto-fetch-book-metadata';
import { z } from 'zod';

export async function getBookMetadataAction(
  input: AutoFetchBookMetadataInput
): Promise<{ success: true; data: AutoFetchBookMetadataOutput } | { success: false; error: string }> {
  const schema = z.object({
    sourceId: z.string().min(1, 'Source ID cannot be empty.'),
  });

  const validatedFields = schema.safeParse(input);

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid input.',
    };
  }
  
  try {
    // In a real app, you would add authentication checks here to ensure
    // only authorized admins can perform this action.
    const metadata = await autoFetchBookMetadata({ sourceId: validatedFields.data.sourceId });
    return { success: true, data: metadata };
  } catch (error) {
    console.error('Error fetching book metadata:', error);
    return { success: false, error: 'Failed to fetch metadata from the source.' };
  }
}
