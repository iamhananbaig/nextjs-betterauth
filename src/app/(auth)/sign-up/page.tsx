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
import { formSchema } from "@/lib/auth-schema";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/hooks/use-toast";
import { CircleX, LoaderCircle, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, password } = values;
    await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: "/sign-in",
      },
      {
        onRequest: () => {
          setLoading(true);
          toast({
            title: "Please Wait",
            description: (
              <div className="flex items-center space-x-2">
                <LoaderCircle className="animate-spin w-4 h-4" />
                <span>Signing you up...</span>
              </div>
            ),
          });
        },
        onSuccess: () => {
          setLoading(false);
          form.reset();
          toast({
            variant: "default",
            title: "You are registered Successfully!",
            description: (
              <div className="flex items-center space-x-2">
                <ShieldCheck  className="w-4 h-4" />
                <span>Please Activate Your Account by Contacting Administrator -- 0309-9069994</span>
              </div>
            ),
          });
        },
        onError: (ctx) => {
          setLoading(false);
          toast({
            variant: "destructive",
            title: "Failed",
            description: (
              <div className="flex items-center space-x-2">
                <CircleX className="w-4 h-4" />
                <span>{ctx.error.message}</span>
              </div>
            ),
          });
        },
      }
    );
    console.log(values);
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create Your Acount to Get Started</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Button className="w-full" type="submit">
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
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
