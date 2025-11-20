'use client'

import { DatePicker } from "../../lib/components/DatePicker";
import { Popover } from "../../lib/components/Popover";

export default function Home() {
    return (
        <div style={{ height: '300vh' }}>
            <div style={{ height: '100vh' }} />
            {/* <DatePicker 
                getPopupContainer={() => document.body}
            /> */}
            <Popover 
                trigger="hover"
                content={'Content'}
                // getPopupContainer={() => document.body}
            >
                Popover
            </Popover>
        </div>
    )
}

