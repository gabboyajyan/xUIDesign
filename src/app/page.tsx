'use client'

import { Result } from "../../lib/components/Result";
import { Button } from '../../lib/components/Button';

export default function Home() {
    return (
        <Result
            status="success"
            title="Success"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary">Back Home</Button>}
        />
    )
}

