import { FileDown, TrendingUp, Package, Copy, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Analytics() {
  const categories = [
    {
      name: "Computer Science",
      callNumber: "004-006",
      totalItems: "2,847",
      available: "1,923",
      checkedOut: "824",
      missing: "15",
      avgAge: "8.2 years",
      circulationRate: "4.7",
      condition: [60, 30, 10],
    },
    {
      name: "Mathematics",
      callNumber: "510-519",
      totalItems: "1,654",
      available: "1,234",
      checkedOut: "398",
      missing: "8",
      avgAge: "12.5 years",
      circulationRate: "2.3",
      condition: [50, 35, 15],
    },
    {
      name: "Physics",
      callNumber: "530-539",
      totalItems: "1,289",
      available: "967",
      checkedOut: "298",
      missing: "12",
      avgAge: "15.1 years",
      circulationRate: "1.8",
      condition: [45, 40, 15],
    },
    {
      name: "Literature",
      callNumber: "800-899",
      totalItems: "3,456",
      available: "2,789",
      checkedOut: "634",
      missing: "23",
      avgAge: "18.7 years",
      circulationRate: "3.2",
      condition: [55, 30, 15],
    },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <TrendingUp className="h-8 w-8" />
            Collection Analysis
          </h1>
        </div>
        <Button className="gap-2">
          <FileDown className="h-4 w-4" />
          Export Analysis
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Format</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Formats</SelectItem>
                  <SelectItem value="book">Books</SelectItem>
                  <SelectItem value="ebook">E-Books</SelectItem>
                  <SelectItem value="journal">Journals</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Branch</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  <SelectItem value="main">Main Library</SelectItem>
                  <SelectItem value="science">Science Library</SelectItem>
                  <SelectItem value="engineering">Engineering Library</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input type="date" placeholder="dd-mm-yyyy" />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input type="date" placeholder="dd-mm-yyyy" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Collection Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">₹45,67,890</span>
              <div className="text-success">₹</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Avg. Circulation Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">3.2</span>
              <div className="text-info">📈</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Space Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">78%</span>
              <div className="text-warning">📦</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Collection Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Call Number</TableHead>
              <TableHead>Total Items</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>Checked Out</TableHead>
              <TableHead>Missing</TableHead>
              <TableHead>Avg Age</TableHead>
              <TableHead>Circulation Rate</TableHead>
              <TableHead>Condition</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.name}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="text-muted-foreground">{category.callNumber}</TableCell>
                <TableCell>{category.totalItems}</TableCell>
                <TableCell>{category.available}</TableCell>
                <TableCell>{category.checkedOut}</TableCell>
                <TableCell className="text-destructive">{category.missing}</TableCell>
                <TableCell>{category.avgAge}</TableCell>
                <TableCell className="font-medium text-success">{category.circulationRate}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full overflow-hidden bg-muted flex">
                      <div className="bg-success" style={{ width: `${category.condition[0]}%` }} />
                      <div className="bg-warning" style={{ width: `${category.condition[1]}%` }} />
                      <div className="bg-destructive" style={{ width: `${category.condition[2]}%` }} />
                    </div>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
