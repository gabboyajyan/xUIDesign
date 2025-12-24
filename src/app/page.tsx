'use client'

import { Dropdown } from '../../lib/components/Dropdown';

export default function Home() {
    return (
        <Dropdown
            trigger={['click']}
            placement='bottomRight'
            getPopupContainer={() => document.body}
        >
            Menu
        </Dropdown>
    )
}

