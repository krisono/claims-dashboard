"use client";

import React, { useState } from "react";
import { signIn, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Chrome,
  Github,
  User,
  Shield,
  Settings,
  Search,
  FileText,
} from "lucide-react";

const demoRoles = [
  {
    id: "admin",
    title: "Admin User",
    description: "Full system access with user management",
    icon: Shield,
    color: "red",
  },
  {
    id: "manager",
    title: "Claims Manager",
    description: "Oversee claims operations and team performance",
    icon: Settings,
    color: "blue",
  },
  {
    id: "adjuster",
    title: "Claims Adjuster",
    description: "Process and evaluate insurance claims",
    icon: FileText,
    color: "green",
  },
  {
    id: "investigator",
    title: "Investigator",
    description: "Investigate suspicious claims and fraud",
    icon: Search,
    color: "orange",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function DemoRoleCard({
  role,
  isSelected,
  onSelect,
}: {
  role: (typeof demoRoles)[0];
  isSelected: boolean;
  onSelect: () => void;
}) {
  const colorClasses = {
    red: "border-red-200 bg-red-50 text-red-700",
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    green: "border-green-200 bg-green-50 text-green-700",
    orange: "border-orange-200 bg-orange-50 text-orange-700",
  };

  return (
    <motion.div
      variants={item}
      className={`cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${
        isSelected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border hover:border-primary/50"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start space-x-3">
        <div
          className={`rounded-lg p-2 ${
            colorClasses[role.color as keyof typeof colorClasses]
          }`}
        >
          <role.icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{role.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {role.description}
          </p>
        </div>
        <div
          className={`h-4 w-4 rounded-full border-2 ${
            isSelected ? "border-primary bg-primary" : "border-muted-foreground"
          }`}
        />
      </div>
    </motion.div>
  );
}

export default function SignInPage() {
  const [selectedRole, setSelectedRole] = useState("adjuster");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDemoSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signIn("demo", {
        role: selectedRole,
        redirect: false,
      });
      if (result?.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProviderSignIn = (providerId: string) => {
    signIn(providerId, { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FileText className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">Claims Dashboard</span>
          </Link>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to your claims management dashboard
          </p>
        </motion.div>

        {/* Demo Login Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border rounded-lg p-6 mb-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <User className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Demo Access</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Try the dashboard with different role permissions:
          </p>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-3 mb-6"
          >
            {demoRoles.map((role) => (
              <DemoRoleCard
                key={role.id}
                role={role}
                isSelected={selectedRole === role.id}
                onSelect={() => setSelectedRole(role.id)}
              />
            ))}
          </motion.div>

          <button
            onClick={handleDemoSignIn}
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground rounded-md px-4 py-3 font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Continue as Demo User"}
          </button>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative flex items-center justify-center mb-6"
        >
          <div className="border-t border-border w-full" />
          <span className="bg-background px-4 text-sm text-muted-foreground">
            or continue with
          </span>
          <div className="border-t border-border w-full" />
        </motion.div>

        {/* OAuth Providers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <button
            onClick={() => handleProviderSignIn("google")}
            className="w-full flex items-center justify-center space-x-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-3 transition-colors"
          >
            <Chrome className="h-4 w-4" />
            <span>Continue with Google</span>
          </button>

          <button
            onClick={() => handleProviderSignIn("github")}
            className="w-full flex items-center justify-center space-x-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-3 transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>Continue with GitHub</span>
          </button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-sm text-muted-foreground"
        >
          <p>
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
