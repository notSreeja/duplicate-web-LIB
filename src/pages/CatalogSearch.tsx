import { useState } from "react";
import { Search, BookOpen, TrendingUp, FileText, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CatalogSearch() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const popularSearches = [
    "Computer Science",
    "Data Structures",
    "Machine Learning",
    "Web Development",
    "Database Systems",
    "Software Engineering",
    "Artificial Intelligence",
    "Algorithms",
  ];

  const collections = [
    {
      icon: BookOpen,
      title: "New Arrivals",
      count: "234 items",
      color: "bg-primary",
    },
    {
      icon: TrendingUp,
      title: "Popular Books",
      count: "156 items",
      color: "bg-success",
    },
    {
      icon: FileText,
      title: "E-Resources",
      count: "1,234 items",
      color: "bg-info",
    },
    {
      icon: BookMarked,
      title: "Research Papers",
      count: "567 items",
      color: "bg-warning",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Discover Library Resources</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Search through thousands of books, journals, e-books, and digital resources
            across all library branches
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search books, journals, articles, and more..."
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button size="lg" className="px-8">
              Search
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAdvanced(true)}
            >
              Advanced
            </Button>
          </div>
        </div>

        {/* Empty State */}
        {!searchQuery && (
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Start your search</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Enter keywords, author names, titles, or ISBN to find library resources.
            </p>
          </div>
        )}

        {/* Popular Searches */}
        <div className="mb-16">
          <h3 className="text-center text-sm font-medium mb-4">Popular Searches:</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {popularSearches.map((search) => (
              <Button
                key={search}
                variant="outline"
                size="sm"
                onClick={() => setSearchQuery(search)}
              >
                {search}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Collections */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">Featured Collections</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((collection) => (
              <Card key={collection.title} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg ${collection.color} flex items-center justify-center mb-4`}>
                    <collection.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{collection.title}</h3>
                  <p className="text-sm text-muted-foreground">{collection.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Search Dialog */}
      <Dialog open={showAdvanced} onOpenChange={setShowAdvanced}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Advanced Search</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input placeholder="Enter book title" />
              </div>
              <div className="space-y-2">
                <Label>Author</Label>
                <Input placeholder="Enter author name" />
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input placeholder="Enter subject" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>ISBN</Label>
                <Input placeholder="Enter ISBN" />
              </div>
              <div className="space-y-2">
                <Label>Publisher</Label>
                <Input placeholder="Enter publisher name" />
              </div>
              <div className="space-y-2">
                <Label>Year From</Label>
                <Input type="number" placeholder="2000" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Year To</Label>
                <Input type="number" placeholder="2024" />
              </div>
              <div className="space-y-2">
                <Label>Language</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Format</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="book">Book</SelectItem>
                    <SelectItem value="ebook">E-Book</SelectItem>
                    <SelectItem value="journal">Journal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Branch</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Library</SelectItem>
                  <SelectItem value="science">Science Library</SelectItem>
                  <SelectItem value="engineering">Engineering Library</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline">Reset Filters</Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowAdvanced(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAdvanced(false)}>
                Search with Filters
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
