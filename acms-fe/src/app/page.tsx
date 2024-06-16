import LiveContestCard from '@/lib/features/contest/components/live-contest-card';
import LightLogo from '@public/logos/acms-high-resolution-logo-transparent.svg';
import DarkLogo from '@public/logos/acms-high-resolution-logo-transparent.svg';

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center gap-5 flex-wrap p-5">
      <LiveContestCard
        image={LightLogo}
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
  );
}
