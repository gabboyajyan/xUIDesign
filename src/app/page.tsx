'use client'

// import TimePicker from "../../lib/components/DatePicker/TimePicker/TimePicker";
// import { Form } from "../../lib/components/Form";
// import { Radio } from "../../lib/components/Radio";
// import { Checkbox } from "../../lib/components/Checkbox";
// import { Item } from "../../lib/components/Form/Item";
// import { RangePicker } from "../../lib/components/DatePicker/RangePicker";
import { Menu } from "../../lib/components/Menu";
import { MenuProps } from "../../lib/types/menu";
// import { Input } from "../../lib/components/Input";
// import { Select } from "../../lib/components/Select";
// import { Switch } from "../../lib/components/Switch";
// import { Switch } from "../../lib/components/Switch";
// import { lazy } from '../../lib/utils/lazy'
// import { Upload } from '../../lib/components/Upload'
// import { Button } from "../../lib/components/Button";
import { useEffect, useState } from "react";
// import DatePicker from "../../lib/components/DatePicker/DatePicker";
import { CalendarIcon, CheckIcon, ClearIcon, LoadingIcon, SearchIcon } from "../../lib/components/Icons/Icons";
// import dayjs from 'dayjs';
// import { useForm } from "../../lib/hooks/useForm";
// import { RadioGroup } from "../../lib/components/Radio/Group";
// import { useWatch } from '../../lib/hooks/useWatch';
// import { ForwardedRef, useEffect, useRef, useState } from "react";
// import { RadioButton } from "../../lib/components/Radio/Button";
// import Option from "../../lib/components/Select/Option/Option";
// import { RuleType } from "../../lib/types";
// import { clsx } from "../../lib/helpers";
// import { ArrowIcon } from "../../lib/components/Icons/Icons";
import { Dropdown } from "../../lib/components/Dropdown";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: 'sub1',
        label: 'Navigation One',
        icon: <CalendarIcon />,
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
        icon: <SearchIcon />,
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
        icon: <LoadingIcon />,
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
    // const [selectedDates, setSelectedDates] = useState([
    //     new Date("2025-10-06T20:00:00.000Z"),
    //     new Date("2025-10-09T19:59:59.999Z")
    // ])

    return (
        <>
            <div style={{ height: 1000 }}>
            <div style={{  width: 700, overflow: 'auto' }}>
                <div style={{ height: 200 }}>
                    <div style={{ height: 100 }}>
                        <Dropdown
                menu={{
                    items: [
                        { key: '1', label: 'First', onClick: () => console.log('1') },
                        { key: '2', label: 'Second', disabled: true },
                        { key: '3', label: 'Second', disabled: true },
                        { key: '4', label: 'Second', disabled: true },
                        { key: '5', label: 'Second', disabled: true },
                        { key: '6', label: 'Danger', danger: true, onClick: () => console.log('danger') }
                    ]
                }}
                trigger={['hover']}
                placement="bottomLeft"
                arrow
                autoFocus
                onVisibleChange={(a) => console.log(a)}
            >
                <a href="#" style={{ textDecoration: 'none', color: 'black' }}>Hover Me</a>
            </Dropdown>
                    </div>
                </div>
                <div style={{ height: 200 }}>
                    <div style={{ height: 100 }}></div>
                </div>
                <div style={{ height: 200 }}>
                        <Dropdown
                menu={{
                    items: [
                        { key: '1', label: 'First', onClick: () => console.log('1') },
                        { key: '2', label: 'Second', disabled: true },
                        { key: '3', label: 'Second', disabled: true },
                        { key: '4', label: 'Second', disabled: true },
                        { key: '5', label: 'Second', disabled: true },
                        { key: '6', label: 'Danger', danger: true, onClick: () => console.log('danger') }
                    ]
                }}
                trigger={['click']}
                placement="topLeft"
                arrow
                autoFocus
                overlay={<Menu items={items} />}
            >
                <a href="#" style={{ textDecoration: 'none', color: 'black' }}>Click Me</a>
            </Dropdown>
                </div>
            </div>
        </div>
            {/* <Select
            mode="tags"
            size="middle"
            style={{ width: 400 }}
            options={CountryCodes}
            maxTagCount="responsive"
            // defaultValue={['Armenia', 'Russia', 'Italy', 'Georgia']}
        /> */}
        </>
    )
}

