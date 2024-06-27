import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

export function Guides() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-semibold text-3xl">Guides</h1>
      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col gap-5"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>How to login?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <p>
              To access ACMS, you can use your A2SV account. If you are already
              signed in to your A2SV Google account, simply follow the Google
              authentication flow to log in.
            </p>
            <p>
              Alternatively, you can request a login link, which will be sent to
              your A2SV email, and open it in your preferred browser.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How to start monitoring?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <p>
              Visit{' '}
              <Link href="https://acms-five.vercel.app/ongoing">
                acms-five.vercel.app/ongoing
              </Link>
              . You will see a list of ongoing contests. Click on{' '}
              <span className="font-bold">&quot;Start Monitoring&quot;</span>{' '}
              next to the contest you want to join.
            </p>
            <p>
              Make sure to allow camera and screen permissions when prompted.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
