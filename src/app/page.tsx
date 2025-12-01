'use client'

import { Button } from '../../lib/components/Button';
import { Popover } from '../../lib/components/Popover';
import { Dropdown } from '../../lib/components/Dropdown';
import { RangePicker } from '../../lib/components/DatePicker/RangePicker';
import { DatePicker } from '../../lib/components/DatePicker';
import { TimePicker } from '../../lib/components/DatePicker/TimePicker';
import { Menu } from '../../lib/components/Menu';
import { ArrowIcon, ClearIcon } from "../../lib/components/Icons/Icons";
import { ItemType } from "../../lib/types/menu";
import { lazy, Suspense } from "react";

const Result = lazy(() => import('../../lib/components/Result/Result'))

const items: ItemType[] = [
    {
        key: 'sub1',
        label: 'Navigation One',
        children: [
            {
                key: 'g1',
                label: 'Item 1',
                type: 'group',
                children: [
                    { key: '1', label: 'Option 1' },
                    { key: '2', label: 'Option 2' },
                ],
            },
            {
                key: 'g2',
                label: 'Item 2',
                type: 'group',
                children: [
                    { key: '3', label: 'Option 3' },
                    { key: '4', label: 'Option 4' },
                ],
            },
        ],
    },
    {
        key: 'sub2',
        label: 'Navigation Two',
        children: [
            { key: '5', label: 'Option 5' },
            { key: '6', label: 'Option 6' },
            {
                key: 'sub3',
                label: 'Submenu',
                children: [
                    { key: '7', label: 'Option 7' },
                    { key: '8', label: 'Option 8' },
                ],
            },
        ],
    },
    {
        type: 'divider',
        key: 'divider'
    },
    {
        key: 'sub4',
        label: 'Navigation Three',
        children: [
            { key: '9', label: 'Option 9' },
            { key: '10', label: 'Option 10' },
            { key: '11', label: 'Option 11' },
            { key: '12', label: 'Option 12' },
        ],
    },
    {
        key: 'grp',
        label: 'Group',
        type: 'group',
        children: [
            { key: '13', label: 'Option 13' },
            { key: '14', label: 'Option 14' },
        ]
    },
];

export default function Home() {
    return (
        <div>
            <div style={{ height: 200 }} />
            <div style={{ display: "flex" }}>
                <div style={{ width: '100%' }} />

                <div style={{ width: 1100, 
                    height: 1500
                     }}>
                    <Popover
                        placement="left"
                        trigger={['click']}
                        getPopupContainer={() => document.body}
                        style={{ width: 700 }}
                        content={
                            <Suspense>
                                <Result
                                    status="success"
                                    title="Success"
                                    subTitle="Sorry, you are not authorized to access this page."
                                    extra={<Button type="primary">Back Home</Button>}
                                />
                            </Suspense>
                        }
                    >
                        <div style={{ border: '1px solid' }}>
                            <ArrowIcon isOpen />

                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem accusantium doloremque quibusdam tenetur fuga distinctio nihil praesentium molestias consectetur assumenda, cum dolor repudiandae laudantium hic iure at. Ut aspernatur voluptatibus aperiam placeat officiis fugiat rerum suscipit, mollitia quod sapiente impedit cumque cupiditate nisi! Modi minus, dolore velit eos ratione assumenda tempore dolorum, provident corporis ab architecto iure reiciendis, quo similique. Quod atque, repudiandae sint amet quia voluptate dolores. Laborum doloribus nihil et esse architecto molestiae asperiores error excepturi quia ad?
                        </div>
                    </Popover>
                </div>
                <Dropdown arrow placement='left' trigger={['hover']} overlay={<Menu items={items} />}>
                    Menu
                </Dropdown>
                <div style={{ width: '100%' }} />
            </div>
        </div>
    )
}

