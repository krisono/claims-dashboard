"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toaster";
import { useTheme } from "next-themes";
import {
  Bell,
  Shield,
  Palette,
  Globe,
  Clock,
  Save,
  User,
  Mail,
  Smartphone,
  CheckCircle,
} from "lucide-react";

export default function SettingsPage() {
  const { addToast } = useToast();
  const { setTheme, theme } = useTheme();
  const [isSaving, setIsSaving] = useState(false);

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: false,
      claimUpdates: true,
      fraudAlerts: true,
      weeklyDigest: false,
    },
    security: {
      twoFactor: false,
      sessionTimeout: "30",
      loginAlerts: true,
    },
    preferences: {
      language: "en",
      timezone: "UTC",
      dateFormat: "MM/DD/YYYY",
      currency: "USD",
    },
  });

  const toggle = (section: keyof typeof settings, key: string) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !(prev[section] as Record<string, unknown>)[key],
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setIsSaving(false);
    addToast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
      variant: "success",
    });
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-3xl">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage your account preferences and security
        </p>
      </div>

      <div className="grid gap-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-2">
                <Bell className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how and when you receive notifications
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              { key: "email", label: "Email Notifications", desc: "Receive updates via email", icon: Mail },
              { key: "push", label: "Push Notifications", desc: "Browser push notifications", icon: Bell },
              { key: "sms", label: "SMS Alerts", desc: "Text message alerts for critical events", icon: Smartphone },
              { key: "claimUpdates", label: "Claim Status Updates", desc: "Notified when claim status changes", icon: CheckCircle },
              { key: "fraudAlerts", label: "Fraud Alerts", desc: "Immediate alerts on high fraud scores", icon: Shield },
              { key: "weeklyDigest", label: "Weekly Digest", desc: "Summary of claims activity each week", icon: Clock },
            ].map(({ key, label, desc, icon: Icon }) => (
              <div key={key} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-muted p-1.5">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </div>
                <Switch
                  checked={!!(settings.notifications as Record<string, unknown>)[key]}
                  onCheckedChange={() => toggle("notifications", key)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-orange-500/10 p-2">
                <Shield className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your account security settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-muted p-1.5">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
              </div>
              <Switch
                checked={settings.security.twoFactor}
                onCheckedChange={() => toggle("security", "twoFactor")}
              />
            </div>
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-muted p-1.5">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">Login Alerts</p>
                  <p className="text-xs text-muted-foreground">Get notified of new sign-ins to your account</p>
                </div>
              </div>
              <Switch
                checked={settings.security.loginAlerts}
                onCheckedChange={() => toggle("security", "loginAlerts")}
              />
            </div>
            <div className="pt-1">
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Session Timeout
              </label>
              <select
                value={settings.security.sessionTimeout}
                className="w-full sm:w-64 border border-input rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    security: { ...prev.security, sessionTimeout: e.target.value },
                  }))
                }
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="0">Never</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-500/10 p-2">
                <Palette className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your application experience</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 flex items-center gap-2">
                  <Palette className="h-3.5 w-3.5 text-muted-foreground" />
                  Theme
                </label>
                <select
                  value={theme ?? "system"}
                  className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System Default</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                  Language
                </label>
                <select
                  value={settings.preferences.language}
                  className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      preferences: { ...prev.preferences, language: e.target.value },
                    }))
                  }
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  Timezone
                </label>
                <select
                  value={settings.preferences.timezone}
                  className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      preferences: { ...prev.preferences, timezone: e.target.value },
                    }))
                  }
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Date Format</label>
                <select
                  value={settings.preferences.dateFormat}
                  className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      preferences: { ...prev.preferences, dateFormat: e.target.value },
                    }))
                  }
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={() =>
            addToast({ title: "Changes Discarded", description: "No changes were saved." })
          }
        >
          Discard
        </Button>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
