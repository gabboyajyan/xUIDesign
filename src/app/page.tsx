'use client'

import { Popover } from '../../lib/components/Popover';

export default function Home() {
    return (
        <Popover
            trigger={'hover'}
            placement='bottomRight'
            content={
                <div>Popover</div>
            }
        >
            Menu
        </Popover>
    )
}

