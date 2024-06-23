import { FileInfo } from './file-info';

export type DecodedToken = {
  // event name
  action: string;

  // extra data passed to event handler
  extra: any;

  // uploaded file info
  fileInfo: FileInfo;
};
