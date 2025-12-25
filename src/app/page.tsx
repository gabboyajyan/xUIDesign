'use client'

import { Popover } from '../../lib/components/Popover';

export default function Home() {
    return (
        <Popover
            trigger={'click'}
            placement='bottomRight'
            content={
                <div>Popover</div>
            }
        >
            Menu
        </Popover>
    )
}

