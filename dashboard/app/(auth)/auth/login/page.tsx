"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Logo } from "@/app/(landing)/_components/logo";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/global/loader";
import { AuthSchema } from "@/schemas/auth";
import { useAuth } from "@/providers/auth-provider";

const LoginPage = () => {
  const [submitError, setSubmitError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof AuthSchema>>({
    mode: "onChange",
    resolver: zodResolver(AuthSchema),
    defaultValues: { email: "", password: "" },
  });

  const isLoading = form.formState.isSubmitting;
  const { login } = useAuth();
  const onSubmit: SubmitHandler<z.infer<typeof AuthSchema>> = async ({
    email,
    password,
  }) => {
    await login(email, password);
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <p className="font-semibold text-[48px] text-slate-50">Log In</p>
      <Form {...form}>
        <form
          onChange={() => {
            if (submitError) setSubmitError("");
          }}
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full sm:w-[500px] space-y-6 flex flex-col border p-14 shadow-black/10 dark:shadow-white/10 bg-slate-50"
          style={{
            borderRadius: 24,
          }}
        >
          <FormField
            disabled={isLoading}
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="email">Email *</Label>
                    <Input type="email" id="email" placeholder="Email" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isLoading}
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Password"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isLoading}
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Sign me in automatically
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {submitError && <FormMessage>{submitError}</FormMessage>}
          <Button
            type="submit"
            className="w-full p-6"
            size="lg"
            disabled={isLoading}
          >
            {isLoading && <Loader className="h-4 w-4 mr-2" />}
            Log In
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
