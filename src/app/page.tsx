'use client'

import {
    Form as AntForm,
    Radio as AntRadio,
    Checkbox as AntCheckbox,
    Input as AntInput,
    Select as AntSelect,
} from "antd"
import { Input } from "./components/Input"
import { Select } from "./components/Select"
import { Radio } from "./components/Radio"
import { Checkbox } from "./components/Checkbox"
import { Form } from "./components/Form"

export default function Home() {
    return (
        <div style={{ width: 700, margin: '0 auto' }}>
            <h1>Ant Form</h1>
            <AntForm size="large" layout="vertical" onFinish={(e) => console.log(e)}>
                <AntForm.Item name='input' label='input' rules={[{ required: true }]}>
                    <AntInput />
                </AntForm.Item>

                <AntForm.Item name='select' label='select' rules={[{ required: true }]}>
                    <AntSelect
                        mode="tags"
                        options={[
                            { value: '1', label: 'one' },
                            { value: '2', label: 'two' }
                        ]} />
                </AntForm.Item>

                <AntForm.Item name='ck' label='ck'>
                    <AntCheckbox />
                </AntForm.Item>

                <AntForm.Item name='radio' label='radio' rules={[{ required: true }]}>
                    <AntRadio.Group>
                        <AntRadio value="Male" title="Male" />
                        <AntRadio value="Female" title="Female" />
                    </AntRadio.Group>
                </AntForm.Item>

                <button>Submit</button>
            </AntForm>
            <hr />

            <h1>Custom Form</h1>
            <Form size="large" layout="vertical" onFinish={(e) => console.log(e)}>
                <Form.Item name='input' label='input' rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name='select' label='select' rules={[{ required: true }]}>
                    <Select
                        mode="tags"
                        options={[
                            { value: '1', label: 'one' },
                            { value: '2', label: 'two' }
                        ]} />
                </Form.Item>

                <Form.Item name='checkbox' label='checkbox' rules={[{ required: true }]}>
                    <Checkbox />
                </Form.Item>

                <Form.Item name='radio' label='radio' rules={[{ required: true }]}>
                    <Radio.Group>
                        <Radio value="Male" title="Male" />
                        <Radio value="Female" title="Female" />
                    </Radio.Group>
                </Form.Item>

                <button>Submit</button>
            </Form>
        </div>
    )
}