'use client';
import React, { useContext, useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/context/AuthContext';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long.',
  }),
});

type Props = {};

function LoginPage({}: Props) {
  const { auth, login } = useContext(AuthContext);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    await login(values.email, values.password);
  }

  if (auth.user) {
    redirect('/drive');
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 min-h-screen">
      <h2 className="text-6xl font-bold text-center uppercase">Sign In</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-md"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter your email address.</FormDescription>
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
                  <Input
                    placeholder="password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
          >
            Login
          </Button>
        </form>
      </Form>
      <p>
        Don't have an account?{' '}
        <Link href="/register">
          <Button
            variant="link"
            className="ml-2 p-0"
          >
            Register
          </Button>
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
