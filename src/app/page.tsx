'use client'

import { Result } from "../../lib/components/Result";
import { Button } from '../../lib/components/Button';
import { Popover } from '../../lib/components/Popover';
import { Dropdown } from '../../lib/components/Dropdown';
import { RangePicker } from '../../lib/components/DatePicker/RangePicker';
import { DatePicker } from '../../lib/components/DatePicker';
import { TimePicker } from '../../lib/components/DatePicker/TimePicker';
import { Menu } from '../../lib/components/Menu';
import { ArrowIcon, ClearIcon } from "../../lib/components/Icons/Icons";
import { ItemType } from "../../lib/types/menu";

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

                <div style={{ width: 700 }}>
                    <Popover
                        // placement="bottomRight"
                        trigger={['click', 'hover']}
                        style={{ width: 700 }}
                        getPopupContainer={(trigger: HTMLElement) => {
                            return document.body
                        }}
                        content={
                            <Result
                                status="success"
                                title="Success"
                                subTitle="Sorry, you are not authorized to access this page."
                                extra={<Button type="primary">Back Home</Button>}
                            />
                        }
                    >
                        <div><ArrowIcon isOpen /></div>
                    </Popover>
                </div>
                <Dropdown trigger={['click', 'hover']} overlay={<Menu items={items} />}>
                    Menu
                </Dropdown>
                <div style={{ width: '100%' }} />
            </div>
        </div>
    )
}

