'use client'

import {
    // Form as AntForm,
    Radio as AntRadio,
    Checkbox as AntCheckbox,
    Input as AntInput,
    Select as AntSelect
} from "antd"
import { Input } from "./components/Input"
import { Select } from "./components/Select"
import { Radio } from "./components/Radio"
import { Checkbox } from "./components/Checkbox"

export default function Home() {
    return (
        <div style={{ width: 700, margin: '0 auto' }}>
            <AntInput />
            <br />
            <AntSelect mode="tags" placeholder="Select Gender" options={[{ value: 'Male' }, { value: 'Female' }]} allowClear />
            <br />
            <AntRadio name="Male" value={'male'} title="Male">Male</AntRadio>
            <br />
            <AntCheckbox />

            <hr />

            <Input />
            <br />
            <Select mode="tags" placeholder="Select Gender" options={[{ value: 'Male' }, { value: 'Female' }]} allowClear />
            <br />
            <Radio title="Male" value={'Male'} name="Male">Male</Radio>
            <br />
            <Checkbox />
        </div>
    )
}