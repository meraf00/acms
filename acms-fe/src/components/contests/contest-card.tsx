import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Contest } from '@/store/contests/types';

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
