import { DefaultProps, RuleType } from '.';
export interface RcFile extends File {
    uid: string;
    lastModifiedDate: Date;
    webkitRelativePath: string;
}
export type UploadFile<RcFile> = {
    originFileObj: RcFile;
    uid: string;
    name: string;
    status?: 'uploading' | 'done' | 'error' | 'removed';
    percent?: number;
    url?: string;
    file?: RcFile;
};
export type UploadChangeParam = {
    file: UploadFile<RuleType>;
    fileList: UploadFile<RuleType>[];
};
export type UploadProps = DefaultProps & {
    type?: string;
    name?: string;
    defaultFileList?: UploadFile<RuleType>[];
    fileList?: UploadFile<RuleType>[];
    action?: string | ((file: RcFile) => string) | ((file: RcFile) => PromiseLike<string>);
    directory?: boolean;
    data?: Record<string, unknown> | ((file: UploadFile<RuleType>) => Record<string, unknown> | Promise<Record<string, unknown>>);
    method?: 'POST' | 'PUT' | 'PATCH';
    headers?: Record<string, string>;
    showUploadList?: boolean;
    multiple?: boolean;
    accept?: string;
    beforeUpload?: (file: RcFile, fileList: File[]) => boolean | Promise<boolean>;
    onChange?: (info: UploadChangeParam) => void;
    onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
    listType?: string;
    className?: string;
    rootClassName?: string;
    onPreview?: (file: UploadFile<RuleType>) => void;
    onDownload?: (file: UploadFile<RuleType>) => void;
    onRemove?: (file: UploadFile<RuleType>) => void | boolean | Promise<void | boolean>;
    disabled?: boolean;
    style?: React.CSSProperties;
    customRequest?: (options: {
        file: RcFile;
        onSuccess: (response: RuleType) => void;
        onError: (error: RuleType) => void;
        onProgress: (event: ProgressEvent) => void;
    }) => void;
    withCredentials?: boolean;
    openFileDialogOnClick?: boolean;
    maxCount?: number;
    children?: React.ReactNode;
};
