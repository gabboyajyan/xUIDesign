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
import { useForm } from "./hooks/useForm"

export default function Home() {
    const form = useForm()

    return (
        <div style={{ width: 700, margin: '0 auto' }}>
            <h1>Ant Form</h1>
            <AntForm size="large" layout="vertical" onFinish={(e) => console.log(e)}>
                <AntForm.Item name='name' label='Name' rules={[{ required: true, message: 'Name is required!' }]}>
                    <AntInput value={'dfsdf'} />
                </AntForm.Item>

                <AntForm.Item name='surname' label='Surname' rules={[{ required: true, message: 'Surname is required!' }]}>
                    <AntInput value={'sdfdsf'} />
                </AntForm.Item>

                <AntForm.Item label='Gender' name='gender' rules={[{ required: true, message: 'Gender is required!' }]}>
                    <AntSelect options={[
                        { value: 'Male' },
                        { value: 'Female' }
                    ]} />
                </AntForm.Item>

                <AntForm.Item layout="horizontal" label="I agree" name='agree'>
                    <AntCheckbox />
                </AntForm.Item>

                <AntForm.Item layout="horizontal" label="Are you Robot?" name='robot' rules={[{ required: true, message: 'Robot detector is required!' }]}>
                    <AntRadio.Group value={1}>
                        <AntRadio value={1}>Yes</AntRadio>
                        <AntRadio value={2}>No</AntRadio>
                    </AntRadio.Group>
                </AntForm.Item>

                <button>Submit</button>
            </AntForm>
            <hr />

            <h1>Custom Form</h1>
            <Form form={form} size="large" layout="vertical" onFinish={(e) => console.log(e)}>
                <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Name is required!' }]}>
                    <Input value={'sdfdsf'} />
                </Form.Item>

                <Form.Item name='surname' label='Surname' rules={[{ required: true, message: 'Surname is required!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label='Gender' name='gender' rules={[{ required: true, message: 'Gender is required!' }]}>
                    <Select value={'Male'} options={[
                        { value: 'Male' },
                        { value: 'Female' }
                    ]} />
                </Form.Item>

                <Form.Item layout="horizontal" label="I agree" name='agree' rules={[{ required: true, message: 'Agree is required!' }]}>
                    <Checkbox />
                </Form.Item>

                <Form.Item layout="horizontal" label="Are you Robot?" name='robot' rules={[{ required: true, message: 'Robot detector is required!' }]}>
                    <Radio.Group>
                        <Radio value={1}>Yes</Radio>
                        <Radio value={2}>No</Radio>
                    </Radio.Group>
                </Form.Item>

                <button>Submit</button>
            </Form>
        </div>
    )
}