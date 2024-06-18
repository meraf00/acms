import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StorageConfig } from '@shared/config';
import { ZodValidationPipe } from '@shared/pipes/zod.pipe';
import { ApiVersion } from '@shared/types/version';

import {
  PresignedUrlDto,
  PresignedUrlResponse,
  presignedUrlSchema,
} from '../dtos/presigned-url.dto';
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
  @ApiResponse({ type: PresignedUrlResponse })
  @Post('presigned-upload-url')
  async presignedUpload(
    @Body(new ZodValidationPipe(presignedUrlSchema)) dto: PresignedUrlDto<any>,
    @Req() request: any,
  ) {
    const { fileName, presignedUrl } =
      await this.storageService.generatePresignedUploadUrl({
        bucketName: this.bucketName,
        originalName: dto.fileName,
        contentType: dto.contentType,
      });

    const confirmationToken =
      await this.storageService.generateConfirmUploadToken(
        {
          bucketName: this.bucketName,
          objectName: fileName,
          contentType: dto.contentType,
          originalName: dto.fileName,
        },
        dto.action,
        { user: request.user.id, ...dto.extra },
      );

    return {
      presignedUrl,
      fileName,
      contentType: dto.contentType,
      confirmationToken,
    };
  }

  @Post('confirm-upload')
  async confirmUpload(@Body('token') token: string) {
    return await this.storageService.confirmUpload(token);
  }

  @Get('presigned-download-url/:id')
  async getPresignedDownloadUrl(@Param('id') id: string) {
    try {
      return await this.storageService.generatePresignedDownloadUrl(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
