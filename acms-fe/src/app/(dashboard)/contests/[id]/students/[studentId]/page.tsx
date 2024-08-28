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
import { useGetContestImagesQuery } from '@/store/monitoring/slice';
import { useAppSelector } from '@/store/store';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';

export default function Student() {
  const params = useParams();

  const user = useAppSelector((state) => state.auth.user);
  const { data: images, isLoading, error } = useGetContestImagesQuery({
    contestId: params.id as string,
    contestantId: params.studentId as string,
  }, {
    skip: !user,
  });

  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!carouselApi) {
      return;
    }

    setCount(images?.length ?? 0);
    if (!images || images?.length === 0) {
      setCurrent(carouselApi.selectedScrollSnap());
    } else {
      setCurrent(carouselApi.selectedScrollSnap());
    }

    carouselApi.on('select', () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi, images]);

  return (
    <>
      <h1 className="font-bold text-2xl mb-10 flex gap-2 items-start">
        Student images
      </h1>
      <div className="flex w-full overflow-auto gap-5 no-scrollbar pr-24">
        {isLoading ? (
          <div className="flex w-full h-[80vh] items-center justify-center">
            <Loading />
          </div>
        ) : (
          <div className="w-[90%]">
            {images?.length ? (
              <>
                <Carousel
                  setApi={setCarouselApi}
                  className="w-full bg-background relative"
                >
                  <CarouselContent>
                    {images.map((image, index) => (
                      <CarouselItem key={index} className="w-full">
                        <Card className="overflow-clip">
                          <CardContent className="overflow-clip dark:bg-background">
                            <Image
                              src={image}
                              alt={image}
                              width={1280}
                              height={720}
                              unoptimized={true}
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
              </>
            ) : (
              <div className="flex w-full items-center justify-center">
                <h1 className="font-bold text-2xl mb-10 flex gap-2 items-start opacity-50">
                  No recording was found for this student.
                </h1>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
