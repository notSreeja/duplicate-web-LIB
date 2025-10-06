import { Search, Clock, Package, BarChart3, MoreHorizontal, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card">
      <div className="flex h-16 items-center px-4 gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mr-4">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <Package className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <div className="font-bold text-lg leading-none">LYBSYS</div>
            <div className="text-xs text-muted-foreground">Library Management</div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2 flex-1">
          <Link to="/">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              size="sm"
              className="gap-2"
            >
              <Search className="h-4 w-4" />
              Catalog Search
            </Button>
          </Link>
          <Link to="/hold-queue">
            <Button
              variant={isActive("/hold-queue") ? "default" : "ghost"}
              size="sm"
              className="gap-2"
            >
              <Clock className="h-4 w-4" />
              Hold Queue
            </Button>
          </Link>
          <Link to="/inventory">
            <Button
              variant={isActive("/inventory") || isActive("/missing-items") ? "default" : "ghost"}
              size="sm"
              className="gap-2"
            >
              <Package className="h-4 w-4" />
              Inventory
            </Button>
          </Link>
          <Link to="/analytics">
            <Button
              variant={isActive("/analytics") ? "default" : "ghost"}
              size="sm"
              className="gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Button>
          </Link>
        </nav>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <MoreHorizontal className="h-4 w-4" />
              More
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Help & Support</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-3 border-l pl-4">
          <div className="text-right">
            <div className="text-sm font-medium">Priya Sharma</div>
            <div className="text-xs text-muted-foreground">Librarian</div>
          </div>
          <Button variant="ghost" size="icon">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
