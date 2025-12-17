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
import { lazy, Suspense, useEffect, useState } from "react";
import MenuItem from '../../lib/components/Menu/Item/Item';

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
    const [s, setS] = useState({});

    useEffect(() => {
        setTimeout(() => {
            setS({ top: 200, left: 200 })
        }, 1000);
    }, [])

    return (
        // <div style={{ height: 1000 }}>
        //     <div />
        //     <div
        //         className='sdfdsgfsfdg'
        //         style={{
        //             height: 500,
        //             // width: 2000,
        //             display: "flex",
        //             overflow: 'auto',
        //             border: '1px solid',
        //             position: 'relative',
        //         }}>
        //         <div style={{ width: 900 }} />

        //         <div style={{
        //                 width: 900,
        //                 position: 'relative',
        //                 // height: 1500,
        //                 // border: '1px solid',
        //             }}>
        //             <div style={{ height: 300, width: '100%' }} />
        //             <div
        //             className='dsfdf'
        //             style={{
        //                 width: 1500,
        //                 position: 'relative',
        //                 height: 500,
        //                 border: '1px solid',
        //             }}>
        //             {/* <div style={{ height: 900, width: '100%' }} /> */}
        //             <Popover
        //                 placement='bottomRight'
        //                 content={
        //                     <Suspense>
        //                         <Result
        //                             status="success"
        //                             title="Success"
        //                             subTitle="Sorry, you are not authorized to access this page."
        //                             extra={<Button type="primary">Back Home</Button>}
        //                         />
        //                     </Suspense>
        //                 }
        //                 // getPopupContainer={() => document.body}
        //                 // getPopupContainer={() => document.getElementsByClassName('sdfdsgfsfdg')?.[0] as HTMLDivElement}
        //                 // getPopupContainer={() => document.getElementsByClassName('dsfdf')?.[0] as HTMLDivElement}
        //             >
        //                 Menu
        //                 <br />
        //                 Menu
        //             </Popover>
        //             {/* <DatePicker
        //                 // getPopupContainer={() => document.body}
        //                 getPopupContainer={() => document.getElementsByClassName('sdfdsgfsfdg')?.[0] as HTMLDivElement}
        //             /> */}
        //         </div>
        //         </div>
        //         {/* <div style={{ width: '100%' }} /> */}
        //     </div>
        // </div>


        // <div className='dsfdf' style={{ display: 'flex', width: 1200, border: '1px solid', overflow: 'scroll', height: 1700, position: 'relative' }}>
        //     <div style={{ minWidth: 1500 }} />
        //     <div
        //         className='sdfdsgfsfdg'
        //     style={{
        //         height: 2000, minWidth: 1000, border: '1px solid',
        //         position: 'relative'
        //     }}>
        //         <div style={{
        //             height: 1000,
        //             position: 'relative'
        //         }} />
                // <div style={{
                //     display: 'flex',
                //     justifyContent: 'center'
                // }}>
                    <Popover
                    placement='bottomLeft'
                    listenPopoverPositions={s}
                    content={
                        <Suspense fallback={<div style={{ width: 12, height: 12 }}></div>}>
                            <Result
                                status="success"
                                title="Success"
                                subTitle="Sorry, you are not authorized to access this page."
                                extra={<Button type="primary">Back Home</Button>}
                            />
                        </Suspense>
                    }
                    // getPopupContainer={() => document.body}
                    // getPopupContainer={() => document.getElementsByClassName('sdfdsgfsfdg')?.[0] as HTMLDivElement}
                    // getPopupContainer={() => document.getElementsByClassName('dsfdf')?.[0] as HTMLDivElement}
                >
                    <div style={{
                        // marginRight: 100
                    }}>
                        Menu
                    <br />
                    Menu
                    </div>
                </Popover>
                // </div>
            //     {/* <DatePicker placement='right' getPopupContainer={() => document.body} /> */}
            // <Dropdown trigger={'click'} overlay={() => {
            //     return <Menu items={items} selectable selectedKeys={['13']} />
            //         {/* {items.map((item) => {
            //             return <MenuItem key={item.key} itemKey={item.key} label={item.label} />
            //         })}
            //     </Menu> */}
            // }}>
            //     Dropdown 
            // </Dropdown>
            // </div>
            // <div style={{ minWidth: 1500 }} />
        // </div>
    )
}

