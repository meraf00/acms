import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Contest } from "../types/contest";
import { Button } from "@/components/ui/button";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./contest-table-columns";
import PastContestRow from "./past-contest-row";

export interface ContestTableProps {
  contests: Contest[];
}

export function ContestsTable({ contests }: ContestTableProps) {
  
  return (
    <div className="w-full ">
      <div className=" bg-background rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,_0.2)] dark:shadow-[0_10px_20px_rgba(0,0,0,_0.3)] pb-8 ml-6 max-w-3xl">
        {contests.map((contest, index) => (
            <PastContestRow contest={contest} key={index}/>
        ))}
      </div>
    </div>
  );
}
