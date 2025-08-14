import BookCard from '@/components/book-card';
import { books, categories } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  const filteredBooks = books.filter((book) =>
    book.categories.some(cat => cat.toLowerCase() === category.name.toLowerCase())
  );

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-headline font-bold mb-8">
        Category: {category.name}
      </h1>

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
            <h2 className="mt-4 text-xl font-semibold">No Books Found</h2>
            <p className="mt-2 text-muted-foreground">
                There are no books in this category yet.
            </p>
        </div>
      )}
    </div>
  );
}
