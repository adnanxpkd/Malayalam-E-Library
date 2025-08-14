export interface Book {
  id: string;
  title: string;
  authors: string[];
  year: number;
  description: string;
  categories: string[];
  formats: {
    pdf?: string;
    epub?: string;
    mp3?: string;
  };
  cover_url: string;
  source?: string;
  is_public_domain: boolean;
  status: 'PENDING' | 'PUBLISHED';
  downloads: number;
}

export type Category = {
  name: string;
  slug: string;
};
