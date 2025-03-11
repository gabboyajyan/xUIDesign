'use client'

import { Select } from "./components/Select"

export default function Home() {
    return (
        <div style={{ width: 700, margin: '0 auto' }}>
            <Select menuItemSelectedIcon mode="tags" options={[
                { value: '1' },
                { value: '2' }
            ]} />
        </div>
    )
}