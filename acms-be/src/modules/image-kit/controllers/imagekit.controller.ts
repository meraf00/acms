import { Controller, Get } from '@nestjs/common';
import { ImageKitService } from '../services/image-kit.service';
import { PresignedParams } from '../dtos/response.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

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
