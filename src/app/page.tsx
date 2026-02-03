'use client'

import { Result } from "../../lib/components/Result";
import { Button } from '../../lib/components/Button';
import { Popover } from '../../lib/components/Popover';
import { Select } from "../../lib/components/Select";
import Option from "../../lib/components/Select/Option/Option";
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

