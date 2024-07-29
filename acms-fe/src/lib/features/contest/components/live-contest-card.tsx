"use client";

import React from "react";
import { Contest } from "../types/contest";
import Link from "next/link";
import { cn } from "@/lib/core/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { ExternalLinkIcon, Monitor } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { useUser } from "../../auth/hooks/useUser";
import { Roles } from "../../auth/types/role";
import Image from "next/image";
import contestImage from "@public/images/Vector_2648.jpg";

export interface LiveContestCardProps {
  contest: Contest;
  isLive?: boolean;
}

export default function LiveContestCard({
  contest,
  isLive = true,
}: LiveContestCardProps) {
  let timeRef = "";

  const { currentUser: user } = useUser();

  const diff = new Date(contest.endingTime).getTime() - Date.now();

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours === 0) {
    timeRef = `Ends in ${minutes} mins`;
  } else if (minutes === 0) {
    timeRef = `Ends in ${hours} hrs`;
  } else {
    timeRef = `Ends in ${hours} hrs and ${minutes} mins`;
  }

  return (
    <Tooltip>
      <TooltipTrigger className="">
        <Card
          className={` ${cn(
            "w-[420px]",
            "bg-background overflow-hidden rounded-3xl shadow-[0_10px_20px_rgba(0,0,0,_0.2)] dark:shadow-[0_10px_20px_rgba(0,0,0,_0.3)] border-0 h-full flex flex-col justify-between"
          )}`}
        >
          <CardContent className="max-h-44 overflow-hidden">
            <Image
              priority={false}
              src={contestImage}
              alt={"contest photo "}
            ></Image>
          </CardContent>
          <div className="flex justify-between ">
            <CardHeader className="py-4 pl-5 flex flex-col items-start justify-center">
              <CardTitle className="text-ellipsis text-md font-bold overflow-hidden text-left line-clamp-2">
                {contest.name}
              </CardTitle>
              <CardDescription className="text-xs font-sm">
                {timeRef}
              </CardDescription>
            </CardHeader>

            <CardFooter className="flex flex-col px-0 py-4 mr-3 gap-2 max-w-44 items-start justify-end">
              <Link
                href={contest.invitationLink ?? ""}
                target="_blank"
                className={` ${cn("", buttonVariants({ variant: "link" }))}`}
              >
                <ExternalLinkIcon className="mr-2 h-4 w-4" /> Open Contest
              </Link>
              {user?.role === Roles.student && isLive ? (
                <Link
                  href={`/monitoring/${contest._id}`}
                  className={`  ${cn(
                    buttonVariants({ variant: "default" }),
                    "rounded-xl"
                  )}`}
                >
                  <Monitor className="mr-2 h-4 w-4" /> Start Monitoring
                </Link>
              ) : null}
            </CardFooter>
          </div>
        </Card>
      </TooltipTrigger>
      <TooltipContent className="text-sm bg-opacity-0 text-muted-foreground ">
        {contest.name}
      </TooltipContent>
    </Tooltip>
  );
}
