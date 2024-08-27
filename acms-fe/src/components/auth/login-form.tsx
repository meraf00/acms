'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { MailIcon } from 'lucide-react';
import { useSendLoginLinkMutation } from '@/store/auth/api';

const FormSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Please enter a valid email.',
    })
    .refine((v) => v.endsWith('@a2sv.org'), {
      message: 'Email must be from A2SV.',
    }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });

  const [sendLoginLink, { isLoading, isError, error, isSuccess }] =
    useSendLoginLinkMutation();

  if (isSuccess) {
    toast({
      title: 'Success',
      description: 'Login link has been sent to your email.',
    });
    form.reset();
  }

  if (isError) {
    toast({
      title: 'Failed',
      description:
        'An error occurred while sending the login link. Please try again.',
    });
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    sendLoginLink({
      email: data.email,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="example@a2sv.org"
                  {...field}
                  className="ring-transparent focus-visible:ring-0 w-full"
                  aria-label="Email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'text-foreground'
          )}
          type="submit"
        >
          <MailIcon className="h-4 w-4 mr-5" /> Get login link via email
        </Button>
      </form>
    </Form>
  );
}
