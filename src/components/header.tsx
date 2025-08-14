import Link from "next/link";
import { Book as BookIcon, Search } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { categories } from "@/lib/placeholder-data";
import { useRouter } from "next/navigation";

const NavLinks = () => (
    <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
        {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`} className="text-foreground/80 hover:text-foreground transition-colors">
                {category.name}
            </Link>
        ))}
        <Link href="/admin/dashboard" className="text-foreground/80 hover:text-foreground transition-colors">
            Admin
        </Link>
    </nav>
);

const SearchBar = () => {
    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get("search") as string;
        if (query) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full max-w-xs ml-auto">
            <Input
                type="search"
                name="search"
                placeholder="Search books..."
                className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </form>
    );
};


export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                    <BookIcon className="h-6 w-6 text-primary" />
                    <span className="font-headline">Malayalam E-Library</span>
                </Link>
                <div className="hidden md:flex flex-1 items-center justify-center">
                   <NavLinks />
                </div>
                <div className="flex items-center gap-2 ml-auto">
                    <div className="hidden md:block">
                        <SearchBar />
                    </div>
                    <ThemeToggle />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <div className="flex flex-col gap-4 p-4">
                                <SearchBar />
                                <nav className="grid gap-2 text-lg font-medium">
                                    {categories.map((category) => (
                                        <Link key={category.slug} href={`/category/${category.slug}`} className="text-muted-foreground hover:text-foreground">
                                            {category.name}
                                        </Link>
                                    ))}
                                    <Link href="/admin/dashboard" className="text-muted-foreground hover:text-foreground">
                                        Admin
                                    </Link>
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
