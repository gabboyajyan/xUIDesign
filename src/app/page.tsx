'use client'

import { Form } from "../../lib/components/Form";
import { Input } from '../../lib/components/Input';
import { Popover } from '../../lib/components/Popover';
import { Select } from "../../lib/components/Select";
import Option from "../../lib/components/Select/Option/Option";
import { Button } from "../../lib/components/Button";

export default function Home() {
    return (
       <Form onFinish={(values) => console.log(values)} scrollToFirstError>
        <Form.Item rules={[ { required: true } ]} name="select" label="Select">
          <Select placeholder="Select an option">
            <Option value="option1">Option 1</Option>
            <Option value="option2">Option 2</Option>
            <Option value="option3">Option 3</Option>
          </Select>
        </Form.Item>
        <Form.Item rules={[ { required: true } ]} name="select-multiple" label="Select Multiple">
          <Input placeholder="Select multiple options" />
        </Form.Item>

        <Button htmlType="submit">Submit</Button>
       </Form>
    )
}

