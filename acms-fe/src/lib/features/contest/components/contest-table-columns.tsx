import { Checkbox } from '@radix-ui/react-checkbox';
import { Contest } from '../types/contest';
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
import { Edit } from 'lucide-react';

export const columns: ColumnDef<Contest>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
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
        <div className="capitalize max-w-64 text-ellipsis">
          <Link href={`/contests/${row.original._id}`}>
            {row.getValue('name')}
          </Link>
          <span className="text-sm px-2">{`(${row.original.id})`}</span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'startingTime',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Starting time
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const startingTime = new Date(row.getValue<Date>('startingTime'));
      const formatted = startingTime.toLocaleTimeString('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        year: 'numeric',
      });
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'endingTime',
    header: () => <div>Ending time</div>,
    cell: ({ row }) => {
      const endingTime = new Date(row.getValue<Date>('endingTime'));

      const formatted = endingTime.toLocaleTimeString('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        year: 'numeric',
      });

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: true,
    cell: ({ row }) => {
      const contest = row.original;

      const contestUrl = `https://codeforces.com/gym/${contest.id}`;

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
              onClick={() => navigator.clipboard.writeText(contestUrl)}
            >
              Copy contest URL
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                navigator.clipboard.writeText(contest.invitationLink)
              }
            >
              Copy contest invitation link
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer flex items-center">
              <Link
                href={`/contests/${row.original._id}/edit`}
                className="flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
