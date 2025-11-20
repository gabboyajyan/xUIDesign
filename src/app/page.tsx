'use client'

import { DatePicker } from "../../lib/components/DatePicker";
import { Popover } from "../../lib/components/Popover";

export default function Home() {
    return (
        <div style={{ height: 1000 }}>
            <div style={{ width: 700, overflow: 'auto' }}>
                <div style={{ height: 200, border: '1px solid' }}>
                    <div style={{ height: 100 }}>
                        <Popover title="sdfdsfdsf" content={<div>
                            <button>Click Popover</button>
                            <br />
                            <button>Click Popover</button>
                            <br />
                            <button>Click Popover</button>
                            <br />
                            <button>Click Popover</button>
                            <br />
                            <button>Click Popover</button>
                            <br />
                            <button>Click Popover</button>
                            <br />
                            <button>Click Popover</button>
                            <br />
                            <button>Click Popover</button>
                        </div>}>
                            <button>Click Popover</button>
                        </Popover>
                    </div>
                </div>
                <div style={{ height: 200, border: '1px solid' }}>
                    <div style={{ height: 100 }}></div>
                </div>
                <div style={{ height: 200, border: '1px solid' }}>
                    <div style={{ height: 100, display: 'flex' }}>
                        <Popover getPopupContainer={() => document.body} content={<div>
                            <button>Click Popover</button>
                            <br />
                            <button>Click Popover</button>
                            <br />
                            <button>Click Popover</button>
                            <br />
                            <button>Click Popover</button>
                            <br />
                            <button>Click Popover</button>
                            <br />
                            <button>Click Popover</button>
                            <br />
                            <button>Click Popover</button>
                            <br />
                            <button>Click Popover</button>
                        </div>}>
                            <button>Click Popover</button>
                        </Popover>
                    </div>
                </div>
            </div>
        </div>
    )
}

