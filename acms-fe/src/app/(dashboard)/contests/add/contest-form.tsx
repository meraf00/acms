'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DateRangePicker } from '@nextui-org/date-picker';
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
import { toast } from '@/components/ui/use-toast';

import { parseAbsoluteToLocal } from '@internationalized/date';
import { Textarea } from '@/components/ui/textarea';
import { useCreateContest } from '@/lib/features/hooks';

const FormSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, {
    message: "Contest name can't be empty.",
  }),
  timeRange: z.string(),
  contestants: z.string().refine(
    (value) => {
      return value.split(',').every((c) => c.trim().length > 0);
    },
    {
      message: 'Codeforces handles must be comma separated.',
    }
  ),
});

export function ContestForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      id: '',
      timeRange: '',
      contestants: '',
    },
  });

  const createContest = useCreateContest({
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Contest created successfully.',
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description:
          'Failed to create contest. Perhaps there is unregistered handle.',
      });
    },
  });

  const [date, setDate] = useState({
    start: parseAbsoluteToLocal(new Date().toISOString()),
    end: parseAbsoluteToLocal(new Date().toISOString()),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const contestants = data.contestants.split(',').map((c) => c.trim());

    createContest.mutate({
      id: data.id!,
      name: data.name,
      students: contestants,
      startingTime: date.start.toAbsoluteString(),
      endingTime: date.end.toAbsoluteString(),
    });

    // form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="A2SV Contest #..."
                  {...field}
                  aria-label="Name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contest Id</FormLabel>
              <FormControl>
                <Input placeholder="12345" {...field} aria-label="Contest Id" />
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
          name="contestants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contestants</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="meraf, ffekirnew..."
                  {...field}
                  aria-label="Contestants"
                />
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
