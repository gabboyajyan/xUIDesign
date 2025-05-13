'use client'

import Upload from "@/xUiDesign/components/Upload";

export default function Home() {
    return (
        <>
            <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture"
                multiple
                onChange={(e) => console.log(e)}
            >
                <button>Select File</button>
            </Upload>
        </>
    )
}