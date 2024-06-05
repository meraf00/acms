import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ImageKit from 'imagekit';
import { ImageKitConfig } from 'src/config';
import { ImageKitService } from './services/image-kit.service';

@Module({
  providers: [
    {
      provide: ImageKit,
      useFactory: (configService: ConfigService) =>
        new ImageKit({
          publicKey: configService.get<ImageKitConfig>('imageKit')!.publicKey,
          privateKey: configService.get<ImageKitConfig>('imageKit')!.privateKey,
          urlEndpoint:
            configService.get<ImageKitConfig>('imageKit')!.urlEndpoint,
        }),
      inject: [ConfigService],
    },
    ImageKitService,
  ],
})
export class ImageKitModule {}
