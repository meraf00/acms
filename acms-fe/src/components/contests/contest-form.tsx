'use client';

import { useEffect, useState } from 'react';
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
import { Roles, User } from '@/store/auth/types';
import { useCreateContestMutation, useUpdateContestMutation } from '@/store/contests/api';
import { Contest } from '@/store/contests/types';
import Loading from '@/components/ui/loading';
import { useRouter } from 'next/navigation';
import { useGetUsersQuery } from '@/store/auth/api';
import { useAppSelector } from '@/store/store';

const ContestFormSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1, {
        message: "Contest name can't be empty.",
    }),
    invitationLink: z.string().optional(),
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
    const user = useAppSelector((state) => state.auth.user);
    const { data: users, isLoading: isContestantsDataLoading, isSuccess } = useGetUsersQuery(undefined, { skip: !user || Boolean(contest) });


    const form = useForm<z.infer<typeof ContestFormSchema>>({
        resolver: zodResolver(ContestFormSchema),
        defaultValues: {
            name: contest?.name ?? '',
            id: contest?.id ?? '',
            timeRange: '',
            invitationLink: contest?.invitationLink ?? '',
            contestants:
                (contest?.students
                    ?.map((s: User) => s.profile.codeforcesHandle)
                    .join('\n')) ?? '',
        },
    });

    useEffect(() => {
        if (isSuccess) {
            const students = users?.filter((u) => u.role === Roles.student && u.name !== 'ACMS') ?? [];
            form.setValue('contestants', students.map((s) => s.profile.codeforcesHandle).join('\n'));
        }
    }, [isSuccess, form, users])

    const router = useRouter();

    const [date, setDate] = useState({
        start: parseAbsoluteToLocal(
            (contest?.startingTime as string) ?? new Date().toISOString()
        ),
        end: parseAbsoluteToLocal(
            (contest?.endingTime as string) ?? new Date().toISOString()
        ),
    });

    const [createContest, createResult] = useCreateContestMutation();
    const [updateContest, updateResult] = useUpdateContestMutation();

    async function onSubmit(data: z.infer<typeof ContestFormSchema>) {
        const contestants = data.contestants.split('\n').map((c) => c.trim());

        const newContest = {
            id: data.id,
            name: data.name,
            students: contestants,
            invitationLink: `https://codeforces.com/contests/${data.id}`,
            startingTime: date.start.toAbsoluteString(),
            endingTime: date.end.toAbsoluteString(),
        }

        if (contest) {
            try {
                await updateContest({
                    _id: contest._id,
                    ...newContest
                }).unwrap();
                toast({
                    title: 'Success',
                    description: 'Contest updated successfully.',
                });
                router.push(`/contests/${contest._id}`);

            } catch (error) {
                toast({
                    title: 'Error',
                    description:
                        'Failed to update contest. Perhaps there is unknown handle.',
                });
            }
        } else {
            try {
                await createContest(newContest).unwrap();
                toast({
                    title: 'Success',
                    description: 'Contest created successfully.',
                });
                setDate({
                    start: parseAbsoluteToLocal(new Date().toISOString()),
                    end: parseAbsoluteToLocal(new Date().toISOString()),
                });
                form.reset();
            } catch (error) {
                toast({
                    title: 'Error',
                    description:
                        'Failed to create contest. Perhaps there is unregistered handle.',
                });
            }
        }
    }

    const isLoading = createResult.isLoading || updateResult.isLoading;

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
                                    disabled
                                    placeholder="https://codeforces..."
                                    {...field}
                                    value={`https://codeforces.com/contests/${form.watch('id')}`}
                                    aria-label="Contest URL"
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
                                <Textarea {...field} disabled={isContestantsDataLoading} className={isContestantsDataLoading ? 'animate-pulse' : ''} aria-label="Contestants" />
                            </FormControl>
                            <FormDescription className="flex gap-1">
                                Contestants codeforces handles one handle per line.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {isLoading ? <Loading /> :
                    <Button type="submit">Submit</Button>}
            </form>
        </Form>
    );
}
