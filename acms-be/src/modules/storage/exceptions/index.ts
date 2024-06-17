import { NotFoundException } from '@nestjs/common';

export class FileNotFoundException extends NotFoundException {
  constructor(public message: string) {
    super(`File ${message} not found`);
  }
}

export class FileUploadException {
  constructor(public message: string) {}
}

export class FileDownloadException {
  constructor(public message: string) {}
}

export class FileDeleteException {
  constructor(public message: string) {}
}
