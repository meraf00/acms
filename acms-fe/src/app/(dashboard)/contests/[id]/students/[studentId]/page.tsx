'use client';

import { useParams } from 'next/navigation';
import React from 'react';

export default function Student() {
  const params = useParams();
  return <div>Student, {params.toString()}</div>;
}
