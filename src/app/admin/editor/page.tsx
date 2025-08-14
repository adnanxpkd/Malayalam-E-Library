"use client";

import { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { getBookMetadataAction } from '@/lib/actions';
import { Loader2, Wand2 } from 'lucide-react';
import { books } from '@/lib/placeholder-data';
import type { Book } from '@/lib/types';


const bookFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  authors: z.string().min(2, "Author is required."),
  year: z.coerce.number().int().min(1000, "Enter a valid year.").max(new Date().getFullYear()),
  description: z.string().min(10, "Description must be at least 10 characters."),
  categories: z.string().min(2, "Categories are required."),
  cover_url: z.string().url("Must be a valid URL."),
  is_public_domain: z.boolean().default(false).refine(val => val === true, {
    message: "You must confirm the book is in the public domain."
  }),
});

type BookFormValues = z.infer<typeof bookFormSchema>;

export default function EditorPage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [isFetching, startFetching] = useTransition();
  const [sourceId, setSourceId] = useState('');
  const [pageTitle, setPageTitle] = useState('Add New Book');

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: '',
      authors: '',
      year: new Date().getFullYear(),
      description: '',
      categories: '',
      cover_url: '',
      is_public_domain: false,
    },
  });
  
  useEffect(() => {
    const bookId = searchParams.get('id');
    if (bookId) {
      const existingBook = books.find(b => b.id === bookId);
      if (existingBook) {
        setPageTitle(`Editing: ${existingBook.title}`);
        form.reset({
            ...existingBook,
            authors: existingBook.authors.join(', '),
            categories: existingBook.categories.join(', '),
        });
      }
    }
  }, [searchParams, form]);


  const handleFetchMetadata = () => {
    if (!sourceId) {
      toast({
        variant: "destructive",
        title: "Source ID required",
        description: "Please enter a URL or ID to fetch metadata.",
      });
      return;
    }
    startFetching(async () => {
      const result = await getBookMetadataAction({ sourceId });
      if (result.success) {
        toast({
          title: "Metadata Fetched!",
          description: "Form has been populated with the fetched data.",
        });
        const { data } = result;
        form.reset({
          title: data.title,
          authors: data.authors.join(', '),
          year: data.year,
          description: data.description,
          categories: data.categories.join(', '),
          cover_url: data.cover_url,
          is_public_domain: false,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Fetch Failed",
          description: result.error,
        });
      }
    });
  };

  function onSubmit(data: BookFormValues) {
    console.log(data);
    toast({
      title: "Book Saved!",
      description: `"${data.title}" has been successfully saved.`,
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">{pageTitle}</h1>
        <p className="text-muted-foreground">Add or edit book details here.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Auto-Fetch Metadata</CardTitle>
          <CardDescription>
            Paste an ISBN, Open Library ID, Internet Archive ID, or Gutenberg URL to auto-fill the form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., https://openlibrary.org/books/OL14022244M"
              value={sourceId}
              onChange={(e) => setSourceId(e.target.value)}
              disabled={isFetching}
            />
            <Button onClick={handleFetchMetadata} disabled={isFetching}>
              {isFetching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Fetch
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Book Details</CardTitle>
            <CardDescription>Fill out the form below to add a new book.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                        <Input placeholder="Chemmeen" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className="grid md:grid-cols-2 gap-8">
                    <FormField
                    control={form.control}
                    name="authors"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Authors</FormLabel>
                        <FormControl>
                            <Input placeholder="Thakazhi Sivasankara Pillai, Vaikom Muhammad Basheer" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="1956" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea placeholder="A poignant tale of love, loss, and tradition..." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <FormControl>
                        <Input placeholder="Novels, Drama, History" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="cover_url"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Cover Image URL</FormLabel>
                    <FormControl>
                        <Input type="url" placeholder="https://example.com/cover.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="is_public_domain"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>
                        This work is 100% copyright-free and legally available (public domain or Creative Commons).
                        </FormLabel>
                        <FormMessage />
                    </div>
                    </FormItem>
                )}
                />

                <Button type="submit">Save Book</Button>
            </form>
            </Form>
        </CardContent>
      </Card>
    </div>
  );
}
