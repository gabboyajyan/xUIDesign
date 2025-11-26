'use client'

import { Result } from "../../lib/components/Result";
import { Button } from '../../lib/components/Button';
import { Popover } from '../../lib/components/Popover';
import { ArrowIcon, ClearIcon } from "../../lib/components/Icons/Icons";

export default function Home() {
    return (
        <div>
            <div style={{ height: 200 }} />
            <div style={{ display: "flex" }}>
                <div style={{ width: '100%' }} />

                <Popover
                    // placement="bottomRight"
                    trigger="click"
                    controlDropdownPosition={{
                        maxWidth: 30
                    }}
                    // getPopupContainer={() => document.body}
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
                    <ClearIcon />
                </Popover>
                <div style={{ width: '100%' }} />
            </div>
        </div>
    )
}

