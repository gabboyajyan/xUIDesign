"use client"

import { Form } from "./components/Form";
import { Input } from "./components/Input";
import { useForm } from "./hooks/useForm";
import { FormItem } from "./components/Form/Item";
import { RuleObject, RuleType } from "./types/form";
import { Select as AntSelect } from "antd";
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

        <button type="submit">Submit</button>
      </Form>

      <br />

      <label htmlFor="Small">
        Small:
        <Input size='small' />
      </label>
      <br />
      <label htmlFor="Middle">
        Middle:
        <Input size='middle' />
      </label>
      <br />
      <label htmlFor="Large">
        Large:
        <Input size='large' />
      </label>

      <h2>Select</h2>

      <AntSelect allowClear mode="tags" size="large" style={{ width: '100%', marginBottom: 20 }} placeholder="Select...">
        <AntSelect.Option value="Gabriel">Gabriel</AntSelect.Option>
        <AntSelect.Option value="Karen">Karen</AntSelect.Option>
        <AntSelect.Option value="Armen">Armen</AntSelect.Option>
      </AntSelect>

      <Select allowClear mode="tags" size="large" placeholder="Select...">
        <Select.Option value="Gabriel">Gabriel</Select.Option>
        <Select.Option value="Armen">Armen</Select.Option>
      </Select>
    </div>
  );
}
