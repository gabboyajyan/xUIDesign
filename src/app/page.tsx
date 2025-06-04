'use client'

import { Select } from "../../lib/components/Select";

export default function Home() {
    return (
        <>
           <Select 
            showSearch
            options={[
            { value: 'Spain', label: 'Spain' },
            { value: 'Armenia', label: 'Armenia' }
           ]} />
        </>
    )
}