"use client"

import { Form } from "@/xUiDesign/components/Form"
import { Input } from "@/xUiDesign/components/Input"
import { Radio } from "@/xUiDesign/components/Radio"
import { Select } from "@/xUiDesign/components/Select"
import { Checkbox } from "@/xUiDesign/components/Checkbox"
import { useForm } from "@/xUiDesign/hooks/useForm"
import Upload from "@/xUiDesign/components/Upload"
import DatePicker from "@/xUiDesign/components/DatePicker"

export default function Home() {
    const form = useForm()

    return (
        <div style={{ width: 700, margin: "0 auto" }}>
            <h1>Custom Form</h1>
            <Form form={form} size="large" layout="vertical" onFinish={(e) => console.log(e)}>
                <Form.Item name="input" label="Input" rules={[{ required: true }]}>
                    <Input allowClear suffix={<>sf</>} prefix={<>pf</>} addonAfter={<>aa</>} addonBefore={<>ab</>} />
                </Form.Item>

                <Form.Item name="select" label="Select" rules={[{ required: true }]}>
                    <Select
                        allowClear
                        showSearch
                        options={[
                            { value: "1", label: "one" },
                            { value: "2", label: "two" },
                            { value: "3", label: "three" },
                            { value: "4", label: "four" },
                            { value: "5", label: "five" }
                        ]} />
                </Form.Item>

                <Form.Item name="checkbox" layout="horizontal" label="Checkbox" rules={[{ required: true }]}>
                    <Checkbox name="Check1">Check 1</Checkbox>
                    <Checkbox name="Check2">Check 2</Checkbox>
                </Form.Item>

                <Form.Item name="radio" layout="horizontal" label="Radio" rules={[{ required: true }]}>
                    <Radio value="8" title="8">8</Radio>
                    <Radio value="false" title="false">false</Radio>
                </Form.Item>

                <Form.Item name="upload" label="Upload" rules={[{ required: true }]}>
                    <Upload />
                </Form.Item>

                <Form.Item name="datepicker" label="Date Picker" rules={[{ required: true }]}>
                    <DatePicker value={new Date()} onChange={() => {}} />
                </Form.Item>

                <button>Submit</button>
            </Form>
        </div>
    )
}