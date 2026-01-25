"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { Apple, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { GoogleIcon } from "../icons/google";
import { useAuth, initiateEmailSignUp } from "@/firebase";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export function SignupForm() {
  const auth = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      initiateEmailSignUp(auth, values.email, values.password);
      // The onAuthStateChanged listener in FirebaseProvider will create the user profile
      // and handle redirection via the protected route layout.
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign-up Failed",
        description: error.message || "An unexpected error occurred.",
      });
    }
  }

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="font-headline text-3xl font-bold">Level Up Your Life.</h2>
        <p className="text-muted-foreground">
          Track habits, reach goals, and grow every day with our community.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} className="pl-10" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <FormControl>
                    <Input type={showPassword ? "text" : "password"} placeholder="Create a strong password" {...field} className="pl-10 pr-10" />
                  </FormControl>
                  <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff /> : <Eye />}
                    <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground">
            Get Started
          </Button>
        </form>
      </Form>
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="h-12">
            <Apple className="mr-2" /> Apple
        </Button>
        <Button variant="outline" className="h-12">
            <GoogleIcon className="mr-2" /> Google
        </Button>
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/" className="font-medium text-primary hover:underline">
          Log In
        </Link>
      </p>

      <p className="mt-4 text-center text-xs text-muted-foreground px-4">
        By signing up, you agree to our{" "}
        <Link href="#" className="underline hover:text-primary">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="underline hover:text-primary">
          Privacy Policy
        </Link>.
      </p>
    </>
  );
}
