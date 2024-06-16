import LiveContestCard from '@/lib/features/contest/components/live-contest-card';

export default function ActiveContests() {
  return (
    <>
      <h1 className="font-bold text-2xl mb-10 flex gap-2 items-start">
        Active contests
      </h1>
      <div className="flex w-full overflow-auto gap-5 no-scrollbar">
        <LiveContestCard
          contest={{
            name: 'A2SV contest #21',
            id: '32142',
            startingTime: new Date('06/16/2024'),
            endingTime: new Date('06/17/2024'),
            _id: '',
            students: [],
          }}
        />
        <LiveContestCard
          contest={{
            name: 'A2SV contest #21',
            id: '32142',
            startingTime: new Date('06/16/2024'),
            endingTime: new Date('06/17/2024'),
            _id: '',
            students: [],
          }}
        />
        <LiveContestCard
          contest={{
            name: 'A2SV contest #21',
            id: '32142',
            startingTime: new Date('06/16/2024'),
            endingTime: new Date('06/17/2024'),
            _id: '',
            students: [],
          }}
        />
        <LiveContestCard
          contest={{
            name: 'A2SV contest #21',
            id: '32142',
            startingTime: new Date('06/16/2024'),
            endingTime: new Date('06/17/2024'),
            _id: '',
            students: [],
          }}
        />
        <LiveContestCard
          contest={{
            name: 'A2SV contest #21',
            id: '32142',
            startingTime: new Date('06/16/2024'),
            endingTime: new Date('06/17/2024'),
            _id: '',
            students: [],
          }}
        />
      </div>
    </>
  );
}
