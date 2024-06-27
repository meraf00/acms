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
import { useCreateContest, useUpdateContest } from '@/lib/features/hooks';
import { Contest } from '@/lib/features/contest/types/contest';
import { User } from '@/lib/features/auth/types/user';
import { divider } from '@nextui-org/theme';

const FormSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, {
    message: "Contest name can't be empty.",
  }),
  invitationLink: z.string().url(),
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

export interface ContestFormProps {
  contest?: Contest;
}

export function ContestForm({ contest }: ContestFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: contest?.name ?? '',
      id: contest?.id ?? '',
      timeRange: '',
      invitationLink: contest?.invitationLink ?? '',
      contestants:
        contest?.students
          ?.map((s: User) => s.profile.codeforcesHandle)
          .join('\n') ?? '',
    },
  });

  const createContest = useCreateContest({
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Contest created successfully.',
      });
      setDate({
        start: parseAbsoluteToLocal(new Date().toISOString()),
        end: parseAbsoluteToLocal(new Date().toISOString()),
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

  const updateContest = useUpdateContest({
    id: contest?._id ?? '',
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Contest updated successfully.',
      });
      // form.reset();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description:
          'Failed to update contest. Perhaps there is unknown handle.',
      });
    },
  });

  const [date, setDate] = useState({
    start: parseAbsoluteToLocal(
      (contest?.startingTime as string) ?? new Date().toISOString()
    ),
    end: parseAbsoluteToLocal(
      (contest?.endingTime as string) ?? new Date().toISOString()
    ),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const contestants = data.contestants.split('\n').map((c) => c.trim());

    if (contest) {
      updateContest.mutate({
        id: contest.id,
        name: data.name,
        students: contestants,
        invitationLink: data.invitationLink,
        startingTime: date.start.toAbsoluteString(),
        endingTime: date.end.toAbsoluteString(),
      });
      return;
    }
    createContest.mutate({
      id: data.id!,
      name: data.name,
      students: contestants,
      invitationLink: data.invitationLink,
      startingTime: date.start.toAbsoluteString(),
      endingTime: date.end.toAbsoluteString(),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full md:w-2/3 space-y-6"
      >
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
          name="invitationLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Invitation Link</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://codeforces..."
                  {...field}
                  aria-label="Contest Id"
                />
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
                  className="overflow-hidden text-ellipsis w-full"
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
                <Textarea {...field} aria-label="Contestants" />
              </FormControl>
              <FormDescription className="flex gap-1">
                Contestants codeforces handles one handle per line.
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
