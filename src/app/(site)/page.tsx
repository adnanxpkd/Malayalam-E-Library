import Link from 'next/link';
import { books, categories } from '@/lib/placeholder-data';
import BookCard from '@/components/book-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const latestBooks = [...books].sort((a, b) => b.year - a.year).slice(0, 8);
  const mostDownloadedBooks = [...books].sort((a, b) => b.downloads - a.downloads).slice(0, 8);

  return (
    <div className="flex flex-col">
      <section className="py-20 md:py-32 bg-background">
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-primary">
            Explore Free Malayalam Books & Audiobooks
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Explore a rich collection of copyright-free Malayalam eBooks and audiobooks. All works are legally available in the public domain.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/search">Explore Books <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/10">
        <div className="container">
          <h2 className="text-3xl font-headline font-bold mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`} className="block group">
                <Card className="text-center hover:bg-accent hover:text-accent-foreground transition-colors duration-200 h-full hover:-translate-y-1 shadow hover:shadow-md">
                  <CardContent className="p-6 flex items-center justify-center">
                    <h3 className="font-semibold">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl font-headline font-bold mb-8">Latest Additions</h2>
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {latestBooks.map((book) => (
                <CarouselItem key={book.id} className="md:basis-1/3 lg:basis-1/4">
                  <BookCard book={book} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      <section className="py-16 bg-secondary/10">
        <div className="container">
          <h2 className="text-3xl font-headline font-bold mb-8">Most Downloaded</h2>
           <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {mostDownloadedBooks.map((book) => (
                <CarouselItem key={book.id} className="md:basis-1/3 lg:basis-1/4">
                  <BookCard book={book} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>
    </div>
  );
}
