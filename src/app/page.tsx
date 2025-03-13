'use client'

import {
    Form as AntForm,
    Radio as AntRadio,
    Input as AntInput,
    Select as AntSelect,
    Checkbox as AntCheckbox,
} from "antd"
import { Form } from "./components/Form"
import { Input } from "./components/Input"
import { Radio } from "./components/Radio"
import { Select } from "./components/Select"
import { Checkbox } from "./components/Checkbox"

export default function Home() {
    return (
        <div style={{ width: 700, margin: '0 auto' }}>
            <h1>Ant Form</h1>
            <AntForm size="large" layout="horizontal" onFinish={(e) => console.log(e)}>
                <AntForm.Item name='input' label='Input' rules={[{ required: true }]}>
                    <AntInput />
                </AntForm.Item>

                <AntForm.Item name='select' label='Select' rules={[{ required: true }]}>
                    <AntSelect
                        mode="tags"
                        options={[
                            { value: '1', label: 'one' },
                            { value: '2', label: 'two' }
                        ]} />
                </AntForm.Item>

                <AntForm.Item name='checkbox' label='Checkbox'>
                    <AntCheckbox />
                </AntForm.Item>

                <AntForm.Item name='radio' label='Radio' rules={[{ required: true }]}>
                    <AntRadio.Group buttonStyle="outline">
                        <AntRadio value="Male" title="Male">Male</AntRadio>
                        <AntRadio value="Female" title="Female">Female</AntRadio>
                    </AntRadio.Group>
                </AntForm.Item>

                <button>Submit</button>
            </AntForm>
            <hr />

            <h1>Custom Form</h1>
            <Form size="large" layout="horizontal" onFinish={(e) => console.log(e)}>
                <Form.Item name='input' label='Input' rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name='select' label='Select' rules={[{ required: true }]}>
                    <Select
                        mode="tags"
                        options={[
                            { value: '1', label: 'one' },
                            { value: '2', label: 'two' }
                        ]} />
                </Form.Item>

                <Form.Item name='checkbox' label='Checkbox' rules={[{ required: true }]}>
                    <Checkbox />
                </Form.Item>

                <Form.Item name='radio' label='Radio' rules={[{ required: true }]}>
                    <Radio.Group buttonStyle="outline">
                        <Radio value="Male" title="Male">Male</Radio>
                        <Radio value="Female" title="Female">Female</Radio>
                    </Radio.Group>
                </Form.Item>

                <button>Submit</button>
            </Form>
        </div>
    )
}