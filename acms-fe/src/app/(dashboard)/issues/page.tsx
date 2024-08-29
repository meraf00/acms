'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Textarea } from '@/components/ui/textarea';
import { useReportIssueMutation } from '@/store/issue/api';
import { toast } from '@/components/ui/use-toast';
import Loading from '@/components/ui/loading';


const IssueFormSchema = z.object({
  type: z.string().min(1),
  message: z.string().min(1, {
    message: 'Message should not be empty',
  }),
});

function IssueForm() {
  const form = useForm<z.infer<typeof IssueFormSchema>>({
    resolver: zodResolver(IssueFormSchema),
    defaultValues: {
      type: '',
      message: '',
    },
  });

  const [reportIssue, reportIssueResult] = useReportIssueMutation();

  async function onSubmit(data: z.infer<typeof IssueFormSchema>) {
    try {
      await reportIssue(data).unwrap();
      toast({
        title: 'Success',
        description: 'The issue has been reported successfully.',
      });
      form.reset();
    } catch (error) {
      console.log(error)
      toast({
        title: 'Failed',
        description: 'An error occurred while reporting the issue. Please contact your head.',
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full md:w-2/3 space-y-6"
      >
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

        {reportIssueResult.isLoading ? <Loading /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
}

export default IssueForm;
