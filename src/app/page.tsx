'use client'

import Button from "@/xUiDesign/components/Button"
import { TrashIcon } from "@/xUiDesign/components/icons"
import { Button as AntButton } from "antd"

export default function Home() {
    return (
        <>
            <AntButton
                shape="round"
                size="middle"
                htmlType="submit"
                iconPosition="end"
                icon={<TrashIcon />}>
                Ant Button
            </AntButton>

            <Button
                shape="round"
                size="middle"
                htmlType="submit"
                iconPosition="end"
                icon={<TrashIcon />}>
                Button
            </Button>
        </>
    )
}