'use client'

import { Result } from "../../lib/components/Result";
import { Button } from '../../lib/components/Button';
import { Popover } from '../../lib/components/Popover';
import { ClearIcon } from "../../lib/components/Icons/Icons";

export default function Home() {
    return (
        <>
            <Result
                status="success"
                title="Success"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Button type="primary">Back Home</Button>}
            />

            <Popover content={<ClearIcon />}>svsdf</Popover>
        </>
    )
}

