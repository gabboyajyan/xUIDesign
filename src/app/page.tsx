'use client'

import { Select } from '../../lib/components/Select';

export default function Home() {
    return (
        <div>
            <Select
                showSearch
                placeholder='Select Option'
                options={[
                    { label: 'One', value: 'One' },
                    { label: 'Two', value: 'Two' },
                    { label: 'Three', value: 'Three' }
                ]}
            />

            <Select
                showSearch
                placeholder='Select Option'
                options={[
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '3', value: '3' }
                ]}
            />
        </div>
    )
}

