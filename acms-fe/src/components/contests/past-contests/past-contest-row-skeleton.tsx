import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function PastContestRowSkeleton() {
  return (
    <div className="flex pt-8 px-8 justify-between items-center ">
      <div className="flex flex-col md:flex-row space-y-2 md:space-x-4 justify-center items-center">
        <div className=" rounded-xl overflow-hidden  max-w-40">
          <Skeleton className="w-40 h-28 rounded-none" />
        </div>
        <div className="  flex flex-col justify-center">
          <Skeleton className="w-44 h-5 mb-2" />
          <Skeleton className="w-32 h-3 " />
        </div>
      </div>
      <div>
        <Skeleton className="w-32 h-8" />
      </div>
    </div>
  );
}
