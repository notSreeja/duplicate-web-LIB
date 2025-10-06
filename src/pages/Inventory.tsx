import { Package, CheckCircle, BookOpen, AlertTriangle, RotateCcw, BarChart3, Search, Trash2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

export default function Inventory() {
  const stats = [
    {
      label: "Total Items",
      value: "1,25,847",
      icon: Package,
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Available",
      value: "89,234",
      icon: CheckCircle,
      color: "bg-success/10 text-success",
    },
    {
      label: "Checked Out",
      value: "32,156",
      icon: BookOpen,
      color: "bg-warning/10 text-warning",
    },
    {
      label: "Missing/Lost",
      value: "458",
      icon: AlertTriangle,
      color: "bg-destructive/10 text-destructive",
    },
  ];

  const quickActions = [
    { icon: RotateCcw, label: "Start Shelf Reading", href: "#" },
    { icon: BarChart3, label: "View Analytics", href: "/analytics" },
    { icon: Search, label: "Track Missing Items", href: "/missing-items" },
    { icon: Trash2, label: "Weeding Workflow", href: "#" },
  ];

  const recentActivity = [
    { action: "Shelf audit completed", location: "Science Library - Floor 2", time: "2 hours ago", user: "Raj Kumar" },
    { action: "15 items marked as missing", location: "Main Library", time: "4 hours ago", user: "System" },
    { action: "Weeding process initiated", location: "Engineering Library", time: "Yesterday", user: "Anita Verma" },
    { action: "Collection analysis exported", location: "All Branches", time: "2 days ago", user: "Priya Sharma" },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Inventory Management</h1>
          <p className="text-muted-foreground">
            Comprehensive collection oversight and maintenance tools
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-right mr-4">
            <div className="text-sm text-muted-foreground">Last Updated</div>
            <div className="text-sm font-medium">26/09/2025, 12:51 pm</div>
          </div>
          <Button className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="shelf-reading">Shelf Reading</TabsTrigger>
          <TabsTrigger value="weeding">Weeding</TabsTrigger>
          <TabsTrigger value="analysis">Collection Analysis</TabsTrigger>
          <TabsTrigger value="missing">Missing Items</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-lg">⚡</span>
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action) => (
                  <Link key={action.label} to={action.href}>
                    <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                      <action.icon className="h-5 w-5" />
                      <span>{action.label}</span>
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <span className="text-lg">🕐</span>
                Recent Inventory Activity
              </CardTitle>
              <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.location} • by {activity.user}</p>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shelf-reading">
          <Card>
            <CardContent className="p-12 text-center">
              <RotateCcw className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Shelf Reading Module</h3>
              <p className="text-muted-foreground mb-4">
                Systematic shelf reading and organization tools coming soon
              </p>
              <Button>Start Shelf Reading</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weeding">
          <Card>
            <CardContent className="p-12 text-center">
              <Trash2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Weeding Workflow</h3>
              <p className="text-muted-foreground mb-4">
                Identify and process items for removal from collection
              </p>
              <Button>Start Weeding Process</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <Card>
            <CardContent className="p-12 text-center">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Collection Analysis</h3>
              <p className="text-muted-foreground mb-4">
                Detailed analytics and insights about your collection
              </p>
              <Link to="/analytics">
                <Button>View Analytics</Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="missing">
          <Card>
            <CardContent className="p-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Missing Item Tracker</h3>
              <p className="text-muted-foreground mb-4">
                Track and manage missing or lost library items
              </p>
              <Link to="/missing-items">
                <Button>Open Tracker</Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
