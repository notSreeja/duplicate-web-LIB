import { useState } from "react";
import { Eye, Edit, Mail, AlertTriangle, RefreshCw, FileDown, Settings } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HoldQueue() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [branchFilter, setBranchFilter] = useState("all");

  const holds = [
    {
      id: "#1",
      patron: "Rahul Kumar",
      patronId: "STU001234",
      patronType: "Graduate Student",
      item: "Advanced Database Systems",
      authors: "Ramakrishnan, Raghu",
      callNumber: "QA76.9.D3 R36 2019",
      barcode: "BK001234567",
      requestDate: "15/01/2025",
      waitDays: "254 days waiting",
      pickupLocation: "Main Library",
      expires: "16/02/2025",
      status: "AVAILABLE",
      statusVariant: "success" as const,
    },
    {
      id: "#2",
      patron: "Anita Singh",
      patronId: "STU002345",
      patronType: "Faculty",
      item: "Organic Chemistry: Structure and Function",
      authors: "Vollhardt, K. Peter C.",
      callNumber: "QD251.2 V65 2018",
      barcode: "BK002345678",
      requestDate: "16/01/2025",
      waitDays: "253 days waiting",
      pickupLocation: "Science Library",
      expires: "17/02/2025",
      status: "IN TRANSIT",
      statusVariant: "warning" as const,
      hasAlert: true,
    },
    {
      id: "#3",
      patron: "Vikram Patel",
      patronId: "STU003456",
      patronType: "Undergraduate",
      item: "Introduction to Algorithms",
      authors: "Cormen, Thomas H.",
      callNumber: "QA76.6 C662 2022",
      barcode: "BK003456789",
      requestDate: "17/01/2025",
      waitDays: "252 days waiting",
      pickupLocation: "Engineering Library",
      expires: "18/02/2025",
      status: "PENDING",
      statusVariant: "info" as const,
    },
  ];

  const stats = [
    { label: "Total Holds", value: "124", icon: "clock" },
    { label: "Available", value: "21", icon: "check" },
    { label: "In Transit", value: "15", icon: "truck" },
    { label: "Expired", value: "6", icon: "alert" },
  ];

  const branches = [
    { name: "Main Library", holds: 45, available: 12, pending: 3 },
    { name: "Science Library", holds: 28, available: 8, pending: 1 },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Hold Queue Management</h1>
          <p className="text-muted-foreground">
            Process and manage hold requests across all library branches
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FileDown className="h-4 w-4" />
            Export Report
          </Button>
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-3">
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <Input placeholder="Search by patron name, barcode, or title..." className="flex-1" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="transit">In Transit</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Select value={branchFilter} onValueChange={setBranchFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Branches" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                <SelectItem value="main">Main Library</SelectItem>
                <SelectItem value="science">Science Library</SelectItem>
                <SelectItem value="engineering">Engineering Library</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Queue #</TableHead>
                  <TableHead>Patron</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Pickup Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {holds.map((hold) => (
                  <TableRow key={hold.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {hold.id}
                        {hold.hasAlert && (
                          <AlertTriangle className="h-4 w-4 text-warning" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{hold.patron}</div>
                        <div className="text-xs text-muted-foreground">{hold.patronId}</div>
                        <div className="text-xs text-muted-foreground">{hold.patronType}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium max-w-xs">{hold.item}</div>
                        <div className="text-xs text-muted-foreground">{hold.authors}</div>
                        <div className="text-xs text-muted-foreground">
                          {hold.callNumber} • {hold.barcode}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">{hold.requestDate}</div>
                        <div className="text-xs text-muted-foreground">{hold.waitDays}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">{hold.pickupLocation}</div>
                        <div className="text-xs text-muted-foreground">Expires:</div>
                        <div className="text-xs text-muted-foreground">{hold.expires}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={hold.statusVariant}>{hold.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Queue Overview</CardTitle>
              <Button variant="ghost" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Branch Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {branches.map((branch) => (
                <div key={branch.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{branch.name}</span>
                    <span className="text-sm text-muted-foreground">{branch.holds} total holds</span>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span className="text-success">• {branch.available}</span>
                    <span className="text-destructive">• {branch.pending}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
