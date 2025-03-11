'use client'

import { Form as AntForm, Input as AntInput, Select as AntSelect } from "antd"
import { Form } from "./components/Form"
import { Input } from "./components/Input"
import { Select } from "./components/Select"

export default function Home() {
    return (
        <div style={{ width: 700, margin: '0 auto' }}>
            <AntForm onFinish={(e) => console.log('Ant AntForm', e)}>
                <AntForm.Item label="Name" name='name'>
                    <AntInput />
                </AntForm.Item>

                <AntForm.Item label="Surname" name='surname'>
                    <AntInput />
                </AntForm.Item>

                <AntForm.Item label="Gender" name='gender'>
                    <AntSelect mode="tags">
                        <AntSelect.Option value="male"><div style={{color: 'red' }}>sfsdfdsf</div></AntSelect.Option>
                        <AntSelect.Option value="female"><div style={{color: 'green' }}>sfsdfdsf</div></AntSelect.Option>
                    </AntSelect>
                </AntForm.Item>

                <button type="submit">Submit</button>
            </AntForm>
            <hr />
            <Form onFinish={(e) => console.log('Ant Form', e)}>
                <Form.Item label="Name" name='name'>
                    <Input />
                </Form.Item>

                <Form.Item label="Surname" name='surname'>
                    <Input />
                </Form.Item>

                <Form.Item label="Gender" name='gender'>
                    <Select mode="tags">
                        <Select.Option value="male"><div style={{color: 'red' }}>sfsdfdsf</div></Select.Option>
                        <Select.Option value="female"><div style={{color: 'green' }}>sfsdfdsf</div></Select.Option>
                    </Select>
                </Form.Item>

                <button type="submit">Submit</button>
            </Form>
        </div>
    )
}