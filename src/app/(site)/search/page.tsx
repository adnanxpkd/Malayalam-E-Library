import BookCard from '@/components/book-card';
import { books } from '@/lib/placeholder-data';
import { SearchX } from 'lucide-react';

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const query = searchParams?.q || '';
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase()) ||
    book.authors.some(author => author.toLowerCase().includes(query.toLowerCase())) ||
    book.categories.some(category => category.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-headline font-bold mb-8">
        Search Results {query && `for "${query}"`}
      </h1>

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
            <SearchX className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-4 text-xl font-semibold">No Books Found</h2>
            <p className="mt-2 text-muted-foreground">
                We couldn&apos;t find any books matching your search. Try a different keyword.
            </p>
        </div>
      )}
    </div>
  );
}
