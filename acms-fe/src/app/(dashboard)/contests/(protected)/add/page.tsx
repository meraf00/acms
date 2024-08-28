import { ContestForm } from '@/components/contests/contest-form';
import React from 'react';

export default function AddContest() {
  return (
    <div className="min">
      <h1 className="font-bold text-2xl mb-10 flex gap-2 items-start">
        Add contest
      </h1>

      <div className="h-screen">
        <ContestForm />
      </div>
    </div>
  );
}
