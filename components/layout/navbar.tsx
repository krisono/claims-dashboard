"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Search,
  BarChart3,
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
  Bell,
  Menu,
  X,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Claims Queue", href: "/dashboard/claims", icon: FileText },
  { name: "Investigation", href: "/dashboard/investigations", icon: Search },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const NOTIFICATIONS = [
  {
    id: "1",
    icon: FileText,
    iconClass: "text-blue-600 bg-blue-50",
    title: "New claim submitted",
    desc: "CLM-001848 — Jennifer Davis",
    time: "2 min ago",
    unread: true,
  },
  {
    id: "2",
    icon: CheckCircle,
    iconClass: "text-green-600 bg-green-50",
    title: "Investigation completed",
    desc: "CLM-001845 cleared for review",
    time: "1 hr ago",
    unread: true,
  },
  {
    id: "3",
    icon: AlertTriangle,
    iconClass: "text-orange-600 bg-orange-50",
    title: "Fraud alert flagged",
    desc: "CLM-001840 — score 65%",
    time: "3 hr ago",
    unread: true,
  },
  {
    id: "4",
    icon: Clock,
    iconClass: "text-muted-foreground bg-muted",
    title: "Report ready for review",
    desc: "Monthly Claims Summary — Jan 2024",
    time: "Yesterday",
    unread: false,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  const markRead = (id: string) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, unread: false } : n));

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden mr-2 p-2 text-foreground/60 hover:text-foreground"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        <div className="mr-4 flex">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FileText className="h-4 w-4" />
            </div>
            <span className="hidden font-bold sm:inline-block">
              Claims Dashboard
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 transition-colors hover:text-foreground/80",
                  isActive ? "text-foreground" : "text-foreground/60"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden lg:inline">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center space-x-2 md:space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative rounded-md p-2 text-foreground/60 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center font-medium">
                    {unreadCount}
                  </span>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between px-2 py-1.5">
                <DropdownMenuLabel className="p-0 text-sm font-semibold normal-case tracking-normal">
                  Notifications
                  {unreadCount > 0 && (
                    <span className="ml-2 px-1.5 py-0.5 bg-primary/10 text-primary rounded text-xs">
                      {unreadCount} new
                    </span>
                  )}
                </DropdownMenuLabel>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs text-primary hover:underline">
                    Mark all read
                  </button>
                )}
              </div>
              <DropdownMenuSeparator />
              {notifications.map((n) => {
                const Icon = n.icon;
                return (
                  <DropdownMenuItem
                    key={n.id}
                    className="flex items-start gap-3 py-3 cursor-pointer"
                    onClick={() => markRead(n.id)}
                  >
                    <div className={`rounded-full p-1.5 shrink-0 ${n.iconClass}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm leading-tight ${n.unread ? "font-semibold" : "font-normal"}`}>
                        {n.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{n.desc}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                    </div>
                    {n.unread && (
                      <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />
                    )}
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="justify-center text-sm text-primary font-medium">
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative rounded-md p-2 text-foreground/60 hover:text-foreground"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute top-2 left-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </button>

          <div className="flex items-center space-x-2">
            {session?.user ? (
              <div className="flex items-center space-x-2">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium">
                    {session.user.name || "Demo User"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {session.user.email || "demo@example.com"}
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <button
                  onClick={() => signOut()}
                  className="hidden sm:block rounded-md p-2 text-foreground/60 hover:text-foreground"
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="flex items-center space-x-2 rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:bg-primary/90"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 px-4 space-y-2">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
                    isActive
                      ? "bg-primary/10 text-foreground"
                      : "text-foreground/60 hover:bg-accent hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
            {session?.user && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOut();
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-foreground/60 hover:bg-accent hover:text-foreground transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
