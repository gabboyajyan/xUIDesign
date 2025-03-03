"use client"

import { Form } from "./components/Form";
import { Input } from "./components/Input";
import { useForm } from "./hooks/useForm";
import { FormItem } from "./components/Form/Item";
import { RuleObject, RuleType } from "./types";

export default function Home() {
  const form = useForm()

  const handleSubmit = (values: Record<string, RuleType>) => {
    console.log("Form submitted with values:", values);
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <Form size="middle" form={form} onFinish={handleSubmit}>
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
        <Input size={'small'} />
      </label>
      <br />
      <label htmlFor="Middle">
        Middle:
        <Input size={'middle'} />
      </label>
      <br />
      <label htmlFor="Large">
        Large:
        <Input size={'large'} />
      </label>
    </div>
  );
}
