import Image from 'next/image';
import { books } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, BookOpen, Headphones } from 'lucide-react';

export async function generateStaticParams() {
  return books.map((book) => ({
    id: book.id,
  }));
}

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const book = books.find((b) => b.id === params.id);

  if (!book) {
    notFound();
  }

  return (
    <div className="container py-12 md:py-20">
      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        <div className="md:col-span-1">
          <Card className="overflow-hidden sticky top-24">
             <div className="aspect-[2/3] relative w-full">
                <Image
                  src={book.cover_url}
                  alt={`Cover of ${book.title}`}
                  fill
                  className="object-cover"
                  data-ai-hint="book cover"
                />
              </div>
          </Card>
        </div>
        <div className="md:col-span-2">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {book.categories.map((category) => (
              <Badge key={category} variant="secondary">{category}</Badge>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">{book.title}</h1>
          <p className="mt-2 text-xl text-muted-foreground">{book.authors.join(', ')} ({book.year})</p>
          
          <Card className="my-8 bg-secondary/50">
            <CardContent className="p-6">
                <p className="text-foreground/80 leading-relaxed">{book.description}</p>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h2 className="text-2xl font-headline font-semibold mb-4">Download</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              {book.formats.pdf && (
                <Button asChild size="lg" className="flex-1">
                  <a href={book.formats.pdf} download><Download className="mr-2 h-5 w-5" /> PDF</a>
                </Button>
              )}
              {book.formats.epub && (
                <Button asChild size="lg" variant="secondary" className="flex-1">
                  <a href={book.formats.epub} download><BookOpen className="mr-2 h-5 w-5" /> EPUB</a>
                </Button>
              )}
              {book.formats.mp3 && (
                <Button asChild size="lg" variant="secondary" className="flex-1">
                  <a href={book.formats.mp3} download><Headphones className="mr-2 h-5 w-5" /> Audiobook (MP3)</a>
                </Button>
              )}
            </div>
             <p className="text-xs text-muted-foreground mt-4">
                This work is in the public domain. Downloads are tracked for popularity analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
