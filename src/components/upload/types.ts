import type { DropzoneOptions } from 'react-dropzone';
import type { Theme, SxProps } from '@mui/material/styles';

import type { FileThumbnailProps } from '../file-thumbnail';

// ----------------------------------------------------------------------

export type FileUploadType = File | string | null;

export type FilesUploadType = (File | string)[];

export type SingleFilePreviewProps = React.ComponentProps<'div'> & {
  file: File | string;
  sx?: SxProps<Theme>;
};

export type MultiFilePreviewProps = React.ComponentProps<'ul'> & {
  sx?: SxProps<Theme>;
  files: FilesUploadType;
  lastNode?: React.ReactNode;
  firstNode?: React.ReactNode;
  onRemove: UploadProps['onRemove'];
  thumbnail: UploadProps['thumbnail'];
  slotProps?: {
    thumbnail?: Omit<FileThumbnailProps, 'file'>;
  };
};

export interface UploadProps extends Omit<DropzoneOptions, 'onDrop'> {
  error?: boolean;
  files?: (File | string)[];
  disabled?: boolean;
  thumbnail?: boolean;
  placeholder?: React.ReactNode;
  onDrop?: <T extends File>(acceptedFiles: T[]) => void;
  onDelete?: (file: File | string) => void;
  onRemove?: (file: File | string) => void;
  onUpload?: () => void;
  helperText?: React.ReactNode;
}
