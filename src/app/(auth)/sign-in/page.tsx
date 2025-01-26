"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInFormSchema } from "@/lib/auth-schema";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/hooks/use-toast";
import { CircleX, LoaderCircle } from "lucide-react";
import { useState } from "react";


export default function SignIn() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const { email, password } = values;
    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          setLoading(true);
          toast({
            title: "Please Wait",
            description: (
              <div className="flex items-center space-x-2">
                <LoaderCircle className="animate-spin w-4 h-4" />
                <span>Signing you in...</span>
              </div>
            ),
          });
        },
        onSuccess: () => {
          setLoading(false);
          form.reset();
        },
        onError: (ctx) => {
          setLoading(false);
          toast({
            variant: "destructive",
            title: "Failed",
            description: (
              <div className="flex items-center space-x-2">
                <CircleX  className="w-4 h-4" />
                <span>{ctx.error.message}</span>
              </div>
            ),
          });
        },
      }
    );
    
  }

  return (
    
    <Card className="w-full max-w-md mx-auto ">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Welcome bank! Please Sign In to Continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@mail.com" {...field} />
                  </FormControl>
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
                  <FormControl>
                    <Input type="password" placeholder="*******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={loading}>
            {loading ? (
                <LoaderCircle className="animate-spin w-5 h-5 mx-auto" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account yet?{" "}
          <Link href="/sign-up" className="text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
