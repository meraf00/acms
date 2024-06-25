'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

import { Textarea } from '@/components/ui/textarea';
import { useReportIssue } from '@/lib/features/issue/hooks';

const FormSchema = z.object({
  type: z.string().min(1),
  message: z.string().min(1, {
    message: 'Message should not be empty',
  }),
});

function IssueForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: '',
      message: '',
    },
  });

  const reportIssue = useReportIssue({
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Message sent successfully.',
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to send message.',
      });
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    reportIssue.mutate(data);

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Feature request | Bug | Other ..."
                  {...field}
                  aria-label="type"
                />
              </FormControl>
              <FormDescription className="flex gap-1">
                Short description of the issue
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="I'm facing an issue with ..."
                  {...field}
                  aria-label="message"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default IssueForm;
