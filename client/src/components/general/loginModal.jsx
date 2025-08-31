"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Lock } from "lucide-react";

export default function LoginModal({ open, onOpenChange, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 🔹 Check if user is already logged in when modal mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        onLoginSuccess?.(parsedUser);
        toast.info("Already logged in!");
        onOpenChange(false);
      } catch (err) {
        console.error("Invalid user in localStorage:", err);
      }
    }
  }, [onLoginSuccess, onOpenChange]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const data = response.data;

      toast.success("Login successful!");
      localStorage.setItem("token", data.user.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      onLoginSuccess?.(data.user);
      onOpenChange(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Login failed");
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] p-8 bg-background border-border border shadow-2xl rounded-2xl">
        <DialogHeader className="text-center space-y-2 mb-8">
          <DialogTitle className="text-2xl font-semibold text-foreground">
            Welcome back
          </DialogTitle>
          <p className="text-muted-foreground">
            Login to your Acme Inc account
          </p>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                className="pl-10 h-11"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <button
                type="button"
                className="text-sm text-primary hover:underline underline-offset-2"
                onClick={() => toast.info("Password reset coming soon!")}
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="pl-10 h-11"
                disabled={isLoading}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11"
            disabled={isLoading}
            variant={"outline"}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account ?{" "}
            <button
              type="button"
              className="text-primary ml-1 hover:underline underline-offset-2 font-medium"
              onClick={() => {
                router.push("/signup");
                onOpenChange(false);
              }}
            >
              Sign up
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
