"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: false,
    },
    security: {
      twoFactor: false,
      sessionTimeout: "30",
    },
    preferences: {
      theme: "system",
      language: "en",
      timezone: "UTC",
    },
  });

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage your account preferences and security
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Choose how you want to receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="font-medium text-sm sm:text-base">
                  Email Notifications
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Receive updates via email
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.email}
                className="h-4 w-4"
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      email: e.target.checked,
                    },
                  }))
                }
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="font-medium text-sm sm:text-base">
                  Push Notifications
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Browser push notifications
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.push}
                className="h-4 w-4"
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      push: e.target.checked,
                    },
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>
              Manage your account security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.security.twoFactor}
                className="h-4 w-4"
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    security: { ...prev.security, twoFactor: e.target.checked },
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Session Timeout (minutes)
              </label>
              <select
                value={settings.security.sessionTimeout}
                className="border rounded px-3 py-2"
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    security: {
                      ...prev.security,
                      sessionTimeout: e.target.value,
                    },
                  }))
                }
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>
              Customize your application experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Theme</label>
              <select
                value={settings.preferences.theme}
                className="border rounded px-3 py-2"
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    preferences: { ...prev.preferences, theme: e.target.value },
                  }))
                }
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select
                value={settings.preferences.language}
                className="border rounded px-3 py-2"
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    preferences: {
                      ...prev.preferences,
                      language: e.target.value,
                    },
                  }))
                }
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90">
          Save Changes
        </button>
      </div>
    </div>
  );
}
