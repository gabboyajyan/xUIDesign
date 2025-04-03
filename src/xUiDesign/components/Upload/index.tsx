import { useRef, useState } from "react";
import { UploadFile, UploadChangeParam, UploadProps, RcFile } from "@/xUiDesign/types/upload";
import { prefixClsUpload } from "@/xUiDesign/utils";
import './style.css';

const Upload = ({
    prefixCls = prefixClsUpload,
    multiple = false,
    onChange,
    action,
    beforeUpload,
    fileList: controlledFileList,
    customRequest,
    accept,
    listType = "text",
    showUploadList = true,
    children
}: UploadProps) => {
    const uploadRef = useRef(null);
    const [fileList, setFileList] = useState<(UploadFile | File)[]>(controlledFileList || []);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        let filteredFiles = files;

        if (beforeUpload) {
            filteredFiles = (await Promise
                .all(files.map(file => beforeUpload(file, files))))
                .filter(Boolean) as unknown as UploadFile[];
        }

        if (customRequest) {
            filteredFiles.forEach((file: RcFile) => {
                customRequest({
                    file,
                    onSuccess: (res) => console.info('Upload success:', res),
                    onError: (err) => console.error('Upload error:', err),
                    onProgress: (event) => console.info('Upload progress:', event.loaded / event.total * 100)
                });
            });
        }

        if (!customRequest && action) {
            filteredFiles.forEach((file: RcFile) => {
                if (typeof action === "string") {
                    const formData = new FormData();
                    formData.append('file', file);

                    fetch(action, {
                        method: 'POST',
                        body: formData,
                    })
                        .then(response => response.json())
                        .then((res) => console.info('Upload success:', res))
                        .catch((err) => console.error('Upload error:', err));
                } else {
                    action(file)
                }
            });
        }

        const updatedFileList = multiple ? [...fileList, ...filteredFiles] : filteredFiles;
        setFileList(updatedFileList);

        if (onChange) {
            onChange({ fileList: updatedFileList } as UploadChangeParam);
        }
    };

    const handleRemove = (index: number) => {
        const updatedList = fileList.filter((_, i) => i !== index);
        setFileList(updatedList);

        if (!updatedList.length && uploadRef.current) {
            (uploadRef.current as HTMLInputElement).files = null;
            (uploadRef.current as HTMLInputElement).value = '';
        }

        if (onChange) {
            onChange({ fileList: updatedList } as UploadChangeParam);
        }
    };

    return (
        <div className={`${prefixCls}-wrapper`}>
            <label className={`${prefixCls} ${prefixCls}-${listType}`}>
                {children || <span>📁 Click or Drag files here</span>}
                <input
                    type="file"
                    ref={uploadRef}
                    accept={accept}
                    multiple={multiple}
                    onChange={handleFileChange}
                    className={`${prefixCls}-input`}
                />
            </label>
            {showUploadList && fileList.length > 0 && (
                <ul className={`${prefixCls}-list ${prefixCls}-list-${listType}`}>
                    {fileList.map((file, index) => (
                        <li key={index} className={`${prefixCls}-item`}>
                            <span>{file.name}</span>
                            <button className={`${prefixCls}-remove`} onClick={() => handleRemove(index)}>
                                &#x2715;
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Upload;
