'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import Loading from '@/components/ui/loading';
import { useGetContestImages } from '@/lib/features/recording/hooks/use-recordings';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';

export default function Student() {
  const params = useParams();
  const {
    data: images,
    isLoading,
    error,
  } = useGetContestImages(params.id as string, params.studentId as string);

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <h1 className="font-bold text-2xl mb-10 flex gap-2 items-start">
        Student images
      </h1>
      <div className="flex w-full overflow-auto gap-5 no-scrollbar">
        {isLoading && (
          <div className="flex w-full h-screen items-center justify-center">
            <Loading />
          </div>
        )}
        {/* {images &&
          images.map((image, i) => (
            <Image key={i} src={image} alt={image} width={1280} height={720} />
          ))} */}

        <div className="w-[90%]">
          <Carousel setApi={setApi} className="w-full bg-background relative">
            <CarouselContent>
              {images &&
                images.map((image, index) => (
                  <CarouselItem key={index} className="w-full">
                    <Card className="overflow-clip">
                      <CardContent className="overflow-clip dark:bg-background">
                        <Image
                          src={image}
                          alt={image}
                          width={1280}
                          height={720}
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="py-2 text-center text-sm text-muted-foreground">
            Image {current} of {count}
          </div>
        </div>
      </div>
    </>
  );
}
