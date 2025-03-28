'use client'

import { Form } from "@/xUiDesign/components/Form"
import { Input } from "@/xUiDesign/components/Input"
import { Radio } from "@/xUiDesign/components/Radio"
import { Select } from "@/xUiDesign/components/Select"
import { Checkbox } from "@/xUiDesign/components/Checkbox"
import { useForm } from "@/xUiDesign/hooks/useForm"

export default function Home() {
    const form = useForm()
    // const [antForm] = AntForm.useForm()

    return (
        <div style={{ width: 700, margin: '0 auto' }}>
            <h1>Custom Form</h1>
            <Form form={form} size="large" layout="horizontal" onFinish={(e) => console.log(e)}>
                <Form.Item name='input' label='Input' rules={[{ required: true }]}>
                    <Input allowClear suffix={<>sf</>} prefix={<>pf</>} addonAfter={<>aa</>} addonBefore={<>ab</>} />
                </Form.Item>

                <Form.Item name='select' label='Select' rules={[{ required: true }]}>
                    <Select
                        allowClear
                        showSearch
                        options={[
                            { value: '1', label: 'one' },
                            { value: '2', label: 'two' },
                            { value: '3', label: 'two' },
                            { value: '4', label: 'two' },
                            { value: '5', label: 'two' },
                            { value: '6', label: 'two' },
                            { value: '7', label: 'two' },
                            { value: '8', label: 'two' },
                            { value: '9', label: 'two' },
                            { value: '10', label: 'two' },
                            { value: '11', label: 'two' },
                            { value: '12', label: 'two' },
                            { value: '13', label: 'two' },
                            { value: '14', label: 'two' },
                            { value: '15', label: 'two' },
                            { value: '16', label: 'two' },
                            { value: '17', label: 'two' },
                            { value: '18', label: 'two' },
                            { value: '19', label: 'two' },
                        ]} />
                </Form.Item>

                <Form.Item name='checkbox' label='Checkbox' rules={[{ required: true }]}>
                    <Checkbox />
                    <Checkbox />
                </Form.Item>

                <Form.Item name='radio' label='Radio' rules={[{ required: true }]}>
                    <Radio value="8" title="8">8</Radio>
                    <Radio value="false" title="false">false</Radio>
                </Form.Item>

                <button>Submit</button>
            </Form>
        </div>
    )
}