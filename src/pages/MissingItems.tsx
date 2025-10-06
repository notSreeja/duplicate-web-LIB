import { Plus, FileDown, Eye, Search as SearchIcon, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Card } from "@/components/ui/card";

export default function MissingItems() {
  const stats = [
    { label: "Total Missing", value: "4", color: "bg-destructive/10 text-destructive" },
    { label: "Currently Searching", value: "1", color: "bg-warning/10 text-warning" },
    { label: "Replacements Ordered", value: "1", color: "bg-info/10 text-info" },
    { label: "Total Value", value: "₹20,400", color: "bg-primary/10 text-primary" },
  ];

  const items = [
    {
      title: "Advanced Database Systems",
      author: "Garcia, Maria",
      callNumber: "005.74 GAR • 123456789012",
      lastSeen: "2024-08-15",
      status: "Missing",
      statusVariant: "destructive" as const,
      daysLost: "38",
      severity: "Medium",
      cost: "₹4,500",
      searchAttempts: 3,
    },
    {
      title: "Organic Chemistry Handbook",
      author: "Brown, Robert",
      callNumber: "547 BRO • 123456789013",
      lastSeen: "2024-07-22",
      status: "Searching",
      statusVariant: "info" as const,
      daysLost: "62",
      severity: "Medium",
      cost: "₹6,800",
      searchAttempts: 5,
    },
    {
      title: "Modern Physics Concepts",
      author: "Thompson, Lisa",
      callNumber: "530 THO • 123456789014",
      lastSeen: "2024-06-10",
      status: "Replacement Ordered",
      statusVariant: "warning" as const,
      daysLost: "105",
      severity: "High",
      cost: "₹5,200",
      searchAttempts: 7,
    },
    {
      title: "Statistical Analysis Methods",
      author: "Kumar, Raj",
      callNumber: "519.5 KUM • 123456789015",
      lastSeen: "2024-05-28",
      status: "Lost",
      statusVariant: "destructive" as const,
      daysLost: "118",
      severity: "High",
      cost: "₹3,900",
      searchAttempts: 8,
    },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <SearchIcon className="h-8 w-8" />
            Missing Item Tracker
          </h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Report Missing
          </Button>
          <Button variant="outline" className="gap-2">
            <FileDown className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <p className="text-sm font-medium mb-2">Search Missing Items</p>
          <Input placeholder="Search by title, author, or call number" />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Status Filter</p>
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="missing">Missing</SelectItem>
              <SelectItem value="searching">Currently Searching</SelectItem>
              <SelectItem value="ordered">Replacement Ordered</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Item Details</TableHead>
              <TableHead>Last Seen</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Days Lost</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Search Attempts</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.author}</div>
                    <div className="text-xs text-muted-foreground">{item.callNumber}</div>
                  </div>
                </TableCell>
                <TableCell>{item.lastSeen}</TableCell>
                <TableCell>
                  <Badge variant={item.statusVariant}>{item.status}</Badge>
                </TableCell>
                <TableCell>
                  <div>
                    <div>{item.daysLost}</div>
                    <Badge variant={item.severity === "High" ? "destructive" : "warning"} className="text-xs">
                      {item.severity}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{item.cost}</TableCell>
                <TableCell>{item.searchAttempts}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <SearchIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ShoppingCart className="h-4 w-4" />
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
