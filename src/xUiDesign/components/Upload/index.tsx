'use client';

import { useRef, useState } from 'react';
import cc from 'classcat';
import { RuleType } from '@/xUiDesign/types';
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps
} from '@/xUiDesign/types/upload';
import { prefixClsUpload } from '@/xUiDesign/utils';
import './style.css';
import { StampleIcon, TrashIcon } from '../icons';

const IMAGE_SIZE = 40;
const IMAGE_PROGRESS_PERCENT = 100;

const Upload = ({
  prefixCls = prefixClsUpload,
  multiple = false,
  style,
  className,
  onChange,
  action,
  name = 'file',
  method = 'POST',
  headers,
  directory,
  beforeUpload,
  rootClassName,
  onRemove,
  disabled,
  withCredentials,
  openFileDialogOnClick = true,
  maxCount,
  fileList: controlledFileList,
  customRequest,
  accept,
  listType = 'text',
  showUploadList = true,
  children,
  noStyle,
  defaultFileList
}: UploadProps) => {
  const uploadRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile<RuleType>[]>(() =>
    (controlledFileList || defaultFileList || []).map((file, idx) => ({
      ...file,
      uid: file.uid || `${Date.now()}-${idx}`,
      status: file.status || 'done',
      percent: file.percent || IMAGE_PROGRESS_PERCENT
    }))
  );

  const updateFileList = (newList: UploadFile<RuleType>[]) => {
    setFileList(newList);

    if (onChange) {
      onChange({ fileList: newList } as UploadChangeParam);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rawFiles: File[] = Array.from(event.target.files || []);
    let uploadFiles: UploadFile<RuleType>[] = rawFiles.map((file, i) => ({
      uid: `${Date.now()}-${i}`,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      percent: 0,
      originFileObj: file
    }));

    if (beforeUpload) {
      const filtered: UploadFile<RuleType>[] = [];

      for (let i = 0; i < uploadFiles.length; i++) {
        const file = uploadFiles[i].originFileObj as RcFile;
        const result = await beforeUpload(file, rawFiles);

        if (result === false) {
          continue;
        }

        filtered.push(uploadFiles[i]);
      }

      uploadFiles = filtered;
    }

    const newList = multiple
      ? [...fileList, ...uploadFiles]
      : uploadFiles.slice(0, maxCount || 1);

    updateFileList(newList);

    uploadFiles.forEach(file => {
      const rcFile = file.originFileObj as RcFile;

      const updateProgress = (percent: number) => {
        file.percent = percent;
        updateFileList([...newList]);
      };

      const markSuccess = () => {
        file.status = 'done';
        file.percent = 100;
        updateFileList([...newList]);
      };

      const markError = () => {
        file.status = 'error';
        updateFileList([...newList]);
      };

      if (customRequest) {
        customRequest({
          file: rcFile,
          onSuccess: markSuccess,
          onError: markError,
          onProgress: event => {
            const percent = Math.round(
              (event.loaded / (event.total || event.loaded)) *
                IMAGE_PROGRESS_PERCENT
            );

            updateProgress(percent);
          }
        });
      } else if (typeof action === 'string') {
        const formData = new FormData();
        formData.append(name, rcFile);

        fetch(action, {
          method,
          body: formData,
          headers,
          credentials: withCredentials ? 'include' : 'same-origin'
        })
          .then(res => {
            if (!res.ok) {
              throw new Error('Upload failed');
            }

            return res.json();
          })
          .then(markSuccess)
          .catch(markError);
      } else if (typeof action === 'function') {
        action(rcFile);
        markSuccess();
      } else {
        markSuccess();
      }
    });

    if (uploadRef.current) {
      uploadRef.current.value = '';
    }
  };

  const handleRemove = (uid: string) => {
    const filtered = fileList.filter(file => file.uid !== uid);
    updateFileList(filtered);
    onRemove?.(uid);
  };

  const handleClick = () => {
    if (!disabled && openFileDialogOnClick && uploadRef.current) {
      uploadRef.current.click();
    }
  };

  return (
    <div
      className={cc([
        `${prefixCls}-wrapper`,
        className,
        rootClassName,
        {
          noStyle: noStyle,
          [`${prefixCls}-disabled`]: disabled
        }
      ])}
      style={style}
    >
      <span
        className={cc([`${prefixCls}`, `${prefixCls}-${listType}`])}
        onClick={handleClick}
      >
        {children}
        <input
          type="file"
          ref={uploadRef}
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className={`${prefixCls}-input`}
          disabled={disabled}
          directory={directory ? 'true' : undefined}
          webkitdirectory={directory ? 'true' : undefined}
        />
      </span>

      {showUploadList && fileList.length > 0 && (
        <ul className={`${prefixCls}-list ${prefixCls}-list-${listType}`}>
          {fileList.map(file => (
            <li
              key={file.uid}
              className={`${prefixCls}-item ${prefixCls}-item-${file.status}`}
            >
              <span
                className={`${prefixCls}-remove`}
                onClick={() => handleRemove(file.uid)}
              >
                {listType === 'picture' && (file.originFileObj || file.url) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    width={IMAGE_SIZE}
                    height={IMAGE_SIZE}
                    alt={file.name}
                    src={file.url || URL.createObjectURL(file.originFileObj)}
                    className={`${prefixCls}-item-thumbnail`}
                  />
                ) : (
                  <StampleIcon />
                )}
              </span>
              <div style={{ width: '100%' }}>
                <div
                  className={`${prefixCls}-item-title`}
                  style={{
                    ...(file.status === 'uploading' ? { marginBottom: 12 } : {})
                  }}
                >
                  <span>{file.name}</span>
                  <TrashIcon />
                </div>
                {file.status === 'uploading' && (
                  <>
                    <div className={`${prefixCls}-item-progress-line`} />
                    <div
                      className={`${prefixCls}-item-progress-line-percent`}
                      style={{ width: `${file.percent}%` }}
                    />
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Upload;
