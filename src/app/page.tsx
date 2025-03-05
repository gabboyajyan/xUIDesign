"use client"

import { Form } from "./components/Form";
import { Input } from "./components/Input";
import { useForm } from "./hooks/useForm";
import { FormItem } from "./components/Form/Item";
import { RuleObject, RuleType } from "./types/form";
import { Select as AntSelect } from "antd";
import { Form as AntForm } from 'antd'
import Select from "./components/Select";

export default function Home() {
  const form = useForm()

  const handleSubmit = (values: Record<string, RuleType>) => {
    console.log("Form submitted with values:", values);
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <Form size="middle" form={form} onFinish={handleSubmit}>
        <h1>Input</h1>
        <FormItem name="username" label="Username" rules={[{ required: true, message: "Username is required" }]}>
          <Input />
        </FormItem>

        <FormItem name="age" label="Age" rules={[
          {
            required: true,
            validator: (_: RuleObject, value: RuleType) => {
              if (value && parseInt(`${value}`) < 18 || parseInt(`${value}`) > 50) {
                return Promise.reject('Age is not a valid!')
              }

              return Promise.resolve()
            }
          }
        ]}>
          <Input type="string" allowClear />
        </FormItem>

        <FormItem name="gender" label="Gender" rules={[{ required: true }]}>
          <Select onChange={(values) => { console.log(values) }} mode="tags" allowClear size="large" placeholder="Select...">
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
          </Select>
        </FormItem>

        <button type="submit">Submit</button>
      </Form>

      <AntForm onFinish={(values) => {
        console.log(values);
      }}>
        <AntForm.Item name='gender' label="gender">
          <AntSelect mode="tags" onChange={(e) => {
            console.log(e);
          }}>
            <AntSelect.Option value="Male">Male</AntSelect.Option>
            <AntSelect.Option value="Female">Female</AntSelect.Option>
          </AntSelect>
        </AntForm.Item>

        <button type="submit">Submit</button>
      </AntForm>
    </div>
  );
}
