'use client'

import { DatePicker } from "../../lib/components/DatePicker";

export default function Home() {
    return (
        <div style={{ height: '300vh' }}>
            <div style={{ height: '100vh' }} />
            <DatePicker 
                // getPopupContainer={() => document.body}
            />
        </div>
    )
}

