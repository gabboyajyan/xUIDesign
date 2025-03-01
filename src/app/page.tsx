"use client"

import { Form } from "./xUi_6/Form";
import { Input } from "./xUi_6/Input";
import { FormItem } from "./xUi_6/Form/Item";
import { useForm } from "./xUi_6/Form/hooks/useForm";
import { RuleObject, RuleType } from "./xUi_6/Form/types";

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
      <Input suffix={<> rokoko </>} />
    </div>
  );
}
