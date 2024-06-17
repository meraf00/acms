import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { StorageConfig } from '@shared/config';
import { ZodValidationPipe } from '@shared/pipes/zod.pipe';
import { ApiVersion } from '@shared/types/version';

import { PresignedUrlDto, presignedUrlSchema } from '../dtos/presigned-url.dto';
import { StorageService } from '../services/storage.service';

@ApiTags('storage')
@ApiBearerAuth()
@Controller({ version: ApiVersion.V2, path: 'storage' })
@UseGuards(JwtAuthGuard)
export class StorageController {
  private readonly bucketName: string;

  constructor(
    private readonly storageService: StorageService,
    private readonly configService: ConfigService,
  ) {
    this.bucketName =
      this.configService.get<StorageConfig>('storage')!.bucketName;
  }

  @ApiBody({ type: PresignedUrlDto })
  @Post('presigned-upload-url')
  async presignedUpload(
    @Body(new ZodValidationPipe(presignedUrlSchema)) dto: PresignedUrlDto,
  ) {
    return await this.storageService.generatePresignedUploadUrl({
      bucketName: this.bucketName,
      originalName: dto.fileName,
      contentType: dto.contentType,
    });
  }

  @Post('presigned-download-url')
  async getPresignedDownloadUrl(
    @Body(new ZodValidationPipe(presignedUrlSchema)) dto: PresignedUrlDto,
  ) {
    return await this.storageService.generatePresignedDownloadUrl({
      bucketName: this.bucketName,
      objectName: dto.fileName,
      originalName: dto.fileName,
      contentType: dto.contentType,
    });
  }
}
