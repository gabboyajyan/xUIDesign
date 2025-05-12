'use client'

import { Button, Upload as AntUpload } from "antd"
import { UploadOutlined } from '@ant-design/icons';
import Upload from "@/xUiDesign/components/Upload";

export default function Home() {
    return (
        <>
            <AntUpload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture"
                multiple
            >
                <Button
                    type="primary"
                    icon={<UploadOutlined />}>Select File</Button>
            </AntUpload>

            <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture"
                multiple
            >
                <Button
                    type="primary"
                    icon={<UploadOutlined />}>Select File</Button>
            </Upload>
        </>
    )
}