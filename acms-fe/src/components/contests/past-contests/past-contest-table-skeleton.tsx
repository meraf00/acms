import React from "react";
import PastContestRowSkeleton from "./past-contest-row-skeleton";

export function PastContestsTableSkeleton() {
  return (
    <div className="w-full ">
      <div className=" bg-background rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,_0.08)] dark:shadow-[0_10px_20px_rgba(0,0,0,_0.3)] pb-8 ml-6 max-w-3xl">
        {
          Array.from({ length: 10 }).map((_, index) => (
            <PastContestRowSkeleton key={index}/>
          ))
        }
      </div>
    </div>
  );
}
