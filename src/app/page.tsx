'use client'

import {
    Form as AntForm,
    Radio as AntRadio,
    Input as AntInput,
    Select as AntSelect,
    // Checkbox as AntCheckbox,
} from "antd"
import { Form } from "@/xUiDesign/components/Form"
import { Input } from "@/xUiDesign/components/Input"
import { Radio } from "@/xUiDesign/components/Radio"
import { Select } from "@/xUiDesign/components/Select"
import { Checkbox } from "@/xUiDesign/components/Checkbox"
import { useEffect } from "react"
import { useForm } from "@/xUiDesign/hooks/useForm"

export default function Home() {
    const form = useForm()
    const [antForm] = AntForm.useForm()

    useEffect(() => {
        setTimeout(() => {
            console.log(form.getFieldInstance('input'));
            console.log(antForm.getFieldInstance('input'));
        }, 300);
    }, [form, antForm])

    return (
        <div style={{ width: 700, margin: '0 auto' }}>
            <h1>Ant Form</h1>
            <AntForm form={antForm} layout="horizontal" onFinish={(e) => console.log(e)}>
                <AntForm.Item name='input' label='input' rules={[{ required: true }]}>
                    <AntInput  />
                </AntForm.Item>

                <AntForm.Item name='select' label='Select' rules={[{ required: true }]}>
                    <AntSelect
                        showAction={['focus']}
                        showSearch
                        options={[
                            { value: '1', label: 'one' },
                            { value: '2', label: 'two' }
                        ]} />
                </AntForm.Item>

                {/* <AntForm.Item name='checkbox' label='Checkbox'>
                    <AntCheckbox />
                </AntForm.Item> */}

                <AntForm.Item name='radio' label='Radio' rules={[{ required: true }]}>
                    <AntRadio.Group buttonStyle="solid">
                        <AntRadio.Button value="Male" title="Male">Male</AntRadio.Button>
                        <AntRadio.Button value="Female" title="Female">Female</AntRadio.Button>
                    </AntRadio.Group>
                </AntForm.Item>

                <button>Submit</button>
            </AntForm>
            <hr />

            <h1>Custom Form</h1>
            <Form form={form} layout="horizontal" onFinish={(e) => console.log(e)}>
                <Form.Item name='input' label='Input'>
                    <Input allowClear />
                </Form.Item>

                <Form.Item name='select' label='Select' rules={[{ required: true }]}>
                    <Select
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
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value="Male" title="Male">Male</Radio.Button>
                        <Radio.Button value="Female" title="Female">Female</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <button>Submit</button>
            </Form>
        </div>
    )
}