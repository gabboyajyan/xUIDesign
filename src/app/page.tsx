"use client"

import { 
  Form as AntForm, 
  // Input as AntInput, 
  Select as AntSelect 
} from "antd";

import { Form } from "./components/Form";
// import { Input } from "./components/Input";
import { Select } from "./components/Select";

export default function Home() {
  return (
    <>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <h2>Ant</h2>

        {/* <AntInput onChange={(...argument) => console.log(argument)} />
        <AntSelect onChange={(...argument) => console.log(argument)} style={{ minWidth: '100%' }}>
          <AntSelect.Option value="Male">Male</AntSelect.Option>
          <AntSelect.Option value="Female">Female</AntSelect.Option>
        </AntSelect> */}

        <AntForm >
          {/* <AntForm.Item name={'username'} rules={[{ required: true }]}>
            <AntInput  />
          </AntForm.Item> */}

          <AntForm.Item name={'gender'} rules={[{ required: true }]}>
            <AntSelect mode="tags" >
              <AntSelect.Option value="Male">Male</AntSelect.Option>
              <AntSelect.Option value="Female">Female</AntSelect.Option>
            </AntSelect>
          </AntForm.Item>

          <button type="submit">Submit</button>
        </AntForm>
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <h2>Custom</h2>

        {/* <Input onChange={(...argument) => console.log(argument)} />
        <Select onChange={(...argument) => console.log(argument)} style={{ minWidth: '100%' }}>
          <Select.Option value="Male">Male</Select.Option>
          <Select.Option value="Female">Female</Select.Option>
        </Select> */}

        <Form >
          {/* <Form.Item name={'username'} label="Username" rules={[{ required: true }]}>
            <Input  />
          </Form.Item> */}

          <Form.Item name={'gender'} label="Gender" rules={[{ required: true }]}>
            <Select mode="tags" >
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
            </Select>
          </Form.Item>

          <button type="submit">Submit</button>
        </Form>
      </div>
    </>
  );
}
