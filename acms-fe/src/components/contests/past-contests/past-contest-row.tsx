import React from "react";
import Image from "next/image";
import contestImage from "@public/images/Vector_2648.jpg";
import { buttonVariants } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/formatters";
import { Contest } from "@/store/contests/types";

export default function PastContestRow({ contest }: { contest: Contest }) {
  return (
    <div className="flex pt-8 px-8 justify-between items-center ">
      <div className="flex flex-col md:flex-row space-y-2 md:space-x-4 justify-center items-center">
        <div className=" rounded-xl overflow-hidden  max-w-40">
          <Image
            priority={false}
            className=" max-w-40 object-cover"
            src={contestImage}
            alt="contest image"
          />
        </div>
        <div className="  flex flex-col justify-center">
          <div className="line-clamp-2 text-sm font-medium text-start pb-1">
            {contest.name}
          </div>
          <div className="text-xs font-sm opacity-70 text-wrap">
            {formatDate(contest.startingTime.toString())}
          </div>
        </div>
      </div>
      <div>
        <Link
          href={`https://codeforces.com/contests/${contest.id}`}
          target="_blank"
          className={`  ${cn(
            buttonVariants({ variant: "default" }),
            "rounded-xl"
          )}`}
        >
          <ExternalLinkIcon className="mr-2 h-4 w-4" /> Open Contest
        </Link>
      </div>
    </div>
  );
}
