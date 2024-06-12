import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { PresignedParams } from '../dtos/response.dto';
import { ImageKitService } from '../services/image-kit.service';

@ApiTags('images')
@Controller('images')
export class ImageKitController {
  constructor(readonly imageKitService: ImageKitService) {}

  @ApiResponse({ status: 200, type: PresignedParams })
  @Get('presigned-credentials')
  async presignedUpload(): Promise<PresignedParams> {
    return this.imageKitService.presignedUpload();
  }
}
