import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ImageKit from 'imagekit';
import { ImageKitConfig } from 'src/config';
import { PresignedParams } from '../dtos/response.dto';

@Injectable()
export class ImageKitService {
  constructor(
    private readonly imageKit: ImageKit,
    private readonly configService: ConfigService,
  ) {}

  async presignedUpload(): Promise<PresignedParams> {
    const currentTime = Math.floor(new Date().getTime() / 1000);
    const expire =
      currentTime +
      this.configService.get<ImageKitConfig>('imageKit')!.presignedExpire;

    return this.imageKit.getAuthenticationParameters(undefined, expire);
  }
}
