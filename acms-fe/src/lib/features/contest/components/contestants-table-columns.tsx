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
import { User } from '../../auth/types/user';

export const columns = (contestId: string): ColumnDef<User>[] => [
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
        <div className="capitalize px-5">
          <Link href={`/contests/${contestId}/students/${row.original._id}`}>
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
        <div className="capitalize px-5">{row.original.profile.group}</div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: true,
    cell: ({ row }) => {
      const contestUrl = `https://codeforces.com/gym/${contestId}`;

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
              //   onClick={() => navigator.clipboard.writeText(contest.id)}
            >
              Copy contest ID
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigator.clipboard.writeText(contestUrl)}
            >
              Copy contest URL
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View contest details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
