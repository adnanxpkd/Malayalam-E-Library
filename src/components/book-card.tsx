import Image from 'next/image';
import Link from 'next/link';
import type { Book } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from './ui/badge';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/book/${book.id}`} className="block group">
      <Card className="h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1.5 border bg-card">
        <CardHeader className="p-0">
          <div className="aspect-[2/3] relative w-full overflow-hidden rounded-t-lg">
            <Image
              src={book.cover_url}
              alt={`Cover of ${book.title}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="book cover"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col">
          <CardTitle className="text-lg font-headline leading-tight mb-1 group-hover:text-primary transition-colors">
            {book.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground mb-2">{book.authors.join(', ')}</p>
          <div className="mt-auto pt-2">
            {book.categories.slice(0, 2).map((category) => (
              <Badge key={category} variant="secondary" className="mr-1 mb-1 bg-secondary/20 text-secondary-foreground/80">{category}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
