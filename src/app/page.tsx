'use client'

import Input from "../../lib/components/Input/Input";
import { useEffect, useRef } from "react";

export default function Home() {
    const ref = useRef<any>(null);

    useEffect(() => {
        if (ref.current) {
            console.log(ref.current);

            ref.current.focus();
        }
    }, [])

    return (
        <Input ref={ref} />
    )
}

