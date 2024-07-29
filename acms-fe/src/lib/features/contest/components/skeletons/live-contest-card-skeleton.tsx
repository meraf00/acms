"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/core/utils";
import {
  Card,
  CardFooter,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { useUser } from "../../../auth/hooks/useUser";
import { Roles } from "../../../auth/types/role";

export default function LiveContestCardSkeleton({
  isUpcoming,
}: {
  isUpcoming: boolean;
}) {
  const { currentUser: user } = useUser();

  return (  
    <Card
      className={` ${cn(
        "w-[420px]",
        "bg-background overflow-hidden rounded-3xl shadow-[0_10px_20px_rgba(0,0,0,_0.2)] dark:shadow-[0_10px_20px_rgba(0,0,0,_0.3)] border-0 h-64 flex flex-col justify-between"
      )}`}
    >
      <CardContent className="max-h-44 overflow-hidden">
        <Skeleton className="w-auto h-44" />
      </CardContent>
      <div className="flex justify-between ">
        <CardHeader className="py-4 pl-5 flex flex-col items-start justify-center">
          <Skeleton />
          <Skeleton />
        </CardHeader>

        <CardFooter className="flex flex-col px-0 py-4 mr-3 gap-2 max-w-44 items-start justify-end">
          <Skeleton />
          {user?.role === Roles.student && isUpcoming ? <Skeleton /> : null}
        </CardFooter>
      </div>
    </Card>
  );
}
