import { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { User } from '@/store/auth/types';
import { Contest } from '@/store/contests/types';

export const columns = (contest: Contest): ColumnDef<User>[] => [
  {
    accessorKey: 'index',
    header: () => {
      return (
        <div className='<div className="ml-5 px-5 max-w-64 text-ellipsis overflow-hidden text-nowrap">'>#</div>
      );
    },
    cell: ({ row, table }) => {
      return <div className="px-5 max-w-64 text-ellipsis overflow-hidden text-nowrap">{table.getFilteredRowModel().rows.indexOf(row) + 1}</div>;
    }
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="capitalize px-5 max-w-64 text-ellipsis overflow-hidden text-nowrap">
          <Link href={`/contests/${contest._id}/students/${row.original._id}`}>
            {row.original.name}
          </Link>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'profile.codeforcesHandle',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Codeforces handle
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="px-5">{row.original.profile.codeforcesHandle}</div>
      );
    },
  },
  {
    id: 'group',
    accessorKey: 'profile.group',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Group
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <div className="capitalize px-5 max-w-64 text-ellipsis overflow-hidden text-nowrap">
          {row.original.profile.group}
        </div>
      );
    },
    filterFn: (row, id, filterValue) => {
      return filterValue[row.original.profile.group]
    }
  },
  {
    id: 'participation',
    accessorKey: 'participated',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Monitored
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const participated = (row.original as unknown as any).participated;
      return (
        <div
          className={cn(
            'capitalize px-5 max-w-64 text-ellipsis overflow-hidden text-nowrap font-bold',
            participated ? 'text-green-600' : 'text-destructive'
          )}
        >
          {participated ? 'Yes' : 'No'}
        </div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: true,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="flex flex-col p-2 bg-background border border-red-50 rounded-md shadow-sm gap-2"
          >
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigator.clipboard.writeText(contest.id)}
            >
              Copy contest ID
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigator.clipboard.writeText(contest.invitationLink)}
            >
              Copy contest URL
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
