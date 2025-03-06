"use client"

import { Form as AntForm, Input as AntInput, Select as AntSelect } from "antd";

import { Form } from "./components/Form";
import { Input } from "./components/Input";
import { Select } from "./components/Select";

export default function Home() {
  return (
    <>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <h2>Ant</h2>

        <AntInput onChange={console.log} />
        <AntSelect onChange={console.log} style={{ minWidth: '100%' }}>
          <AntSelect.Option value="Male">Male</AntSelect.Option>
          <AntSelect.Option value="Female">Female</AntSelect.Option>
        </AntSelect>

        <AntForm onValuesChange={console.log}>
          <AntForm.Item name={'username'}>
            <AntInput onChange={console.log} />
          </AntForm.Item>

          <AntForm.Item name={'gender'}>
            <AntSelect onChange={console.log}>
              <AntSelect.Option value="Male">Male</AntSelect.Option>
              <AntSelect.Option value="Female">Female</AntSelect.Option>
            </AntSelect>
          </AntForm.Item>
        </AntForm>
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <h2>Custom</h2>

        <Input onChange={console.log} />
        <Select onChange={console.log} style={{ minWidth: '100%' }}>
          <Select.Option value="Male">Male</Select.Option>
          <Select.Option value="Female">Female</Select.Option>
        </Select>

        <Form onValuesChange={console.log} onFieldsChange={console.log}>
          <Form.Item name={'username'} label="Username">
            <Input onChange={console.log} />
          </Form.Item>

          <Form.Item name={'gender'} label="Gender">
            <Select onChange={console.log}>
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
