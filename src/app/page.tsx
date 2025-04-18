"use client"

import {
    Form as AntForm,
    Input as AntInput,
    Select as AntSelect,
    Checkbox as AntCheckbox,
    Radio as AntRadio,
    DatePicker as AntDatePicker
} from "antd";

import { Form } from "@/xUiDesign/components/Form"
import { Input } from "@/xUiDesign/components/Input"
import { Radio } from "@/xUiDesign/components/Radio"
import { Select } from "@/xUiDesign/components/Select"
import { Checkbox } from "@/xUiDesign/components/Checkbox"
import { useForm } from "@/xUiDesign/hooks/useForm"
import Upload from "@/xUiDesign/components/Upload"
import DatePicker from "@/xUiDesign/components/DatePicker"

export default function Home() {
    const form = useForm();

    const [antForm] = AntForm.useForm();

    return (
        <div style={{
            gap: 100,
            margin: "0 auto",
            display: 'flex',
            // flexDirection: 'column-reverse',
            justifyContent: 'center'
        }}>
            <div>
                <h1>xUiDesign Form</h1>
                <Form
                    form={form}
                    size="large"
                    layout="vertical"
                    onFinish={(e) => console.log(e)}
                >
                    <Form.Item
                        name="select"
                        label="Select"
                        rules={[{ required: true }]}
                    >
                        <Select
                            allowClear
                            options={[
                                { value: "1", label: "one" },
                                { value: "2", label: "two" },
                                { value: "3", label: "three" },
                                { value: "4", label: "four" },
                                { value: "5", label: "five" }
                            ]} />
                    </Form.Item>

                    <Form.Item
                        normalize={(value: string) => value.trim().replace(/\s{2,}/, ' ')}
                        name="input"
                        label="Input"
                        rules={[{ required: true }]}
                    >
                        <Input
                            allowClear
                            suffix={<>sf</>}
                            prefix={<>pf</>}
                            addonAfter={<>aa</>}
                            addonBefore={<>ab</>}
                        />
                    </Form.Item>

                    <Form.Item
                        name="checkbox"
                        layout="horizontal"
                        label="Checkbox"
                        rules={[{ required: true }]}
                    >
                        <Checkbox name="Check1">Check 1</Checkbox>
                        <Checkbox name="Check2">Check 2</Checkbox>
                    </Form.Item>

                    <Form.Item
                        name="radio"
                        layout="horizontal"
                        label="Radio"
                        rules={[{ required: true }]}
                    >
                        <Radio value="8" title="8">8</Radio>
                        <Radio value="false" title="false">false</Radio>
                    </Form.Item>

                    <Form.Item
                        name="upload"
                        label="Upload"
                        rules={[{ required: true }]}
                    >
                        <Upload />
                    </Form.Item>

                    <Form.Item
                        name="datepicker"
                        label="Date Picker"
                        rules={[{ required: true }]}
                    >
                        <DatePicker onChange={() => { }} />
                    </Form.Item>

                    <button>Submit</button>
                    <button type="button" onClick={() => form.resetFields()}>Reset</button>
                </Form>
            </div>

            <div>
                <h1>Ant Form</h1>
                <AntForm
                    form={antForm}
                    size="large"
                    layout="vertical"
                    onFinish={(e) => console.log(e)}
                >
                    <AntForm.Item
                        name="select"
                        label="Select"
                        rules={[{ required: true }]}
                    >
                        <AntSelect
                            allowClear
                            options={[
                                { value: "1", label: "one" },
                                { value: "2", label: "two" },
                                { value: "3", label: "three" },
                                { value: "4", label: "four" },
                                { value: "5", label: "five" }
                            ]} />
                    </AntForm.Item>

                    <AntForm.Item
                        name="input"
                        label="Input"
                        rules={[{ required: true }]}
                        normalize={(value: string) => value.trim().replace(/\s{2,}/, ' ')}
                    >
                        <AntInput
                            allowClear
                            suffix={<>sf</>}
                            prefix={<>pf</>}
                            addonAfter={<>aa</>}
                            addonBefore={<>ab</>}
                        />
                    </AntForm.Item>

                    <AntForm.Item
                        name="checkbox"
                        layout="horizontal"
                        label="Checkbox"
                        rules={[{ required: true }]}
                    >
                        <AntCheckbox name="Check1">Check 1</AntCheckbox>
                        <AntCheckbox name="Check2">Check 2</AntCheckbox>
                    </AntForm.Item>

                    <AntForm.Item
                        name="radio"
                        layout="horizontal"
                        label="Radio"
                        rules={[{ required: true }]}
                    >
                        <AntRadio value="8" title="8">8</AntRadio>
                        <AntRadio value="false" title="false">false</AntRadio>
                    </AntForm.Item>

                    <AntForm.Item
                        name="datepicker"
                        label="Date Picker"
                        rules={[{ required: true }]}
                    >
                        <AntDatePicker value={new Date()} onChange={() => { }} />
                    </AntForm.Item>

                    <button>Submit</button>
                    <button onClick={() => antForm.resetFields()}>Reset</button>
                </AntForm>
            </div>
        </div>
    )

    // return (
    //     <div style={{ display: 'flex' }}>
    //         <div><AntDatePicker /></div>
    //         <div><AntSelect showSearch placeholder="Select" options={[{ value: 1 }, { value: 2 }, { value: 3 }]} /></div>

    //         <div><DatePicker /></div>
    //         <div><Select showSearch placeholder="Select" options={[{ value: 1 }, { value: 2 }, { value: 3 }]} /></div>
    //     </div>
    // )
}