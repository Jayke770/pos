"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { appConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const LoginFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
export default function MainPage() {
  const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false);
  const loginForm = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onToggleIsSubmitting = useCallback(
    () => setIsSubmittingForm((e) => !e),
    [],
  );
  const onLogin = async (data: z.infer<typeof LoginFormSchema>) => {
    onToggleIsSubmitting();
    toast.promise(
      signIn("credentials", { callbackUrl: "/redirect", ...data }),
      {
        loading: "Please wait...",
        error: "Error",
        success: "Redirecting....",
      },
    );
  };
  return (
    <main className=" h-dvh w-dvw flex justify-center-safe items-center-safe p-4">
      <Card className=" w-full max-w-sm">
        <CardHeader>
          <div className="flex justify-center items-center py-4">
            <Image
              src={"/logo.png"}
              priority
              width={500}
              height={500}
              alt="logo"
              className=" rounded-full size-40"
            />
          </div>
          <CardTitle className=" text-xl text-center">
            {appConfig.appName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLogin)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={loginForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Username or email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="******"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                asChild
                disabled={isSubmittingForm}
                type="submit"
                className="w-full mt-5 cursor-pointer transition-all"
              >
                <motion.button
                  whileTap={{
                    scale: 0.9,
                  }}
                >
                  <Loader2
                    className={cn(
                      "size-4 animate-spin",
                      !isSubmittingForm && "hidden",
                    )}
                  />
                  Login
                </motion.button>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
