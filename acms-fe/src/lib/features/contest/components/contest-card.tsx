import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ExternalLinkIcon } from 'lucide-react';
import { Contest } from '../types/contest';
import { cn } from '@/lib/core/utils';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export interface ContestProps {
  contest: Contest;
}

export function ContestCard({ contest }: ContestProps) {
  return (
    <Card className="w-[250px]">
      <CardHeader>
        <CardTitle>{contest.name}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
    </Card>
  );
}
