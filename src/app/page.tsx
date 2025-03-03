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
      <Form size="small" form={form} onFinish={handleSubmit}>
        <FormItem name="username" label="Username" rules={[{ required: true, message: "Username is required" }]}>
          <Input />
        </FormItem>

        <FormItem name="age" label="Age" rules={[
          {
            required: true,
            validator: (_: RuleObject, value: RuleType) => {
              if (`${value}`.length > 2) {
                return Promise.reject('Validator runing....')
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
      <Input size="middle" suffix={<> rokoko </>} />
    </div>
  );
}
