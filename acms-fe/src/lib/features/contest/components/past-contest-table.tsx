import React from "react";
import { Contest } from "../types/contest";
import PastContestRow from "./past-contest-row";

export interface ContestTableProps {
  contests: Contest[];
}

export function PastContestsTable({ contests }: ContestTableProps) {
  
  return (
    <div className="w-full ">
      <div className=" bg-background rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,_0.08)] dark:shadow-[0_10px_20px_rgba(0,0,0,_0.3)] pb-8 ml-6 max-w-3xl">
        {contests.map((contest, index) => (
            <PastContestRow contest={contest} key={index}/>
        ))}
      </div>
    </div>
  );
}
