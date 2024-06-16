'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DateRangePicker } from '@nextui-org/date-picker';
import { Button, buttonVariants } from '@/components/ui/button';
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
import { toast } from '@/components/ui/use-toast';

import { DateValue, now, parseAbsoluteToLocal } from '@internationalized/date';
import { useDateFormatter } from '@react-aria/i18n';
import Link from 'next/link';
import { cn } from '@/lib/core/utils';

const FormSchema = z.object({
  username: z.string().min(1, {
    message: "Contest name can't be empty.",
  }),
  timeRange: z.string(),
});

export function ContestForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      timeRange: '',
    },
  });

  const [date, setDate] = useState({
    start: parseAbsoluteToLocal('2024-04-01T18:45:22Z'),
    end: parseAbsoluteToLocal('2024-04-08T19:15:22Z'),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="A2SV Contest #..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timeRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Open hours</FormLabel>
              <FormControl>
                <DateRangePicker
                  granularity="minute"
                  value={date}
                  onChange={setDate}
                />
              </FormControl>
              <FormDescription>
                The contest will be open between the selected hours.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timeRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contestants</FormLabel>
              <FormControl>
                <Input placeholder="meraf, ffekirnew..." {...field} />
              </FormControl>
              <FormDescription className="flex gap-1">
                Comma separated list of contestants codeforces handles.
              </FormDescription>
              {/* <FormDescription className="flex gap-1">
                Monitoring will be available for the selected contestants. You
                can
                <Link href="" className="hover:underline text-foreground">
                  assign groups to contestants
                </Link>
                .
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
