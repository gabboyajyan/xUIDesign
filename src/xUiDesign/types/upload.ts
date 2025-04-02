import { DefaultProps } from ".";

export interface RcFile extends File {
    uid: string;
}

export type UploadFile = {
    uid: string;
    name: string;
    status?: "uploading" | "done" | "error" | "removed";
    percent?: number;
    url?: string;
    file?: RcFile;
}

export type UploadChangeParam = {
    file: UploadFile;
    fileList: UploadFile[];
}

export type UploadProps = DefaultProps & {
    type?: string;
    name?: string;
    defaultFileList?: Array<UploadFile>;
    fileList?: Array<UploadFile>;
    action?: string | ((file: RcFile) => string) | ((file: RcFile) => PromiseLike<string>);
    directory?: boolean;
    data?: Record<string, unknown> | ((file: UploadFile) => Record<string, unknown> | Promise<Record<string, unknown>>);
    method?: 'POST' | 'PUT' | 'PATCH';
    headers?: Record<string, string>;
    showUploadList?: boolean;
    multiple?: boolean;
    accept?: string;
    beforeUpload?: (file: RcFile, fileList: RcFile[]) => boolean | Promise<boolean>;
    onChange?: (info: UploadChangeParam) => void;
    onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
    listType?: string;
    className?: string;
    rootClassName?: string;
    onPreview?: (file: UploadFile) => void;
    onDownload?: (file: UploadFile) => void;
    onRemove?: (file: UploadFile) => void | boolean | Promise<void | boolean>;
    disabled?: boolean;
    style?: React.CSSProperties;
    customRequest?: (options: { file: RcFile; onSuccess: (response: any) => void; onError: (error: any) => void; onProgress: (event: ProgressEvent) => void; }) => void;
    withCredentials?: boolean;
    openFileDialogOnClick?: boolean;
    maxCount?: number;
    children?: React.ReactNode;
}