import React from 'react';
import { ContestForm } from './contest-form';

export default function AddContest() {
  return (
    <div className="min">
      <h1 className="font-bold text-2xl mb-10 flex gap-2 items-start">
        Add contest
      </h1>

      <ContestForm />
    </div>
  );
}
