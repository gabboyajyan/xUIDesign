'use client'

import { Radio } from "antd"

export default function Home() {
    return (
        <div style={{ width: 700, margin: '0 auto' }}>
            <Radio.Group block optionType="button" buttonStyle="solid">
                <Radio.Button name="gender" value={'Male'}>Male</Radio.Button>
                <Radio.Button name="gender" value={'Female'}>Female</Radio.Button>
            </Radio.Group>
        </div>
    )
}