import { config } from 'dotenv';
config();

import '@/ai/flows/auto-fetch-book-metadata.ts';
import '@/ai/flows/weekly-fetch-public-domain-books.ts';