'use client'

import { Form } from "@/app/components/Form"
import { Input } from "@/app/components/Input"
import { Select } from "./components/Select";

export default function Home() {
    return (
        <div style={{ width: 700, margin: '0 auto' }}>
            <h2>Form</h2>

            <hr />

            <h3>Small</h3>

            <Form size="small" onFinish={(values) => {
                alert('Values show in console');

                console.log(values);
            }}>
                <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Username is required.' }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="password" label="Password" rules={[{
                    required: true,
                    message: 'Password is required.'
                }, {
                    pattern: /^(?!.* )(?=.*?[A-Z])(?=.*?[a-z])(?=.*[0-9]).{8,}$/,
                    message: 'Password is not a valid.'
                }]}>
                    <Input type="password" />
                </Form.Item>

				<Form.Item name="gender" label="Gender" rules={[{
                    required: true,
                    message: 'Gender is required.'
                }]}>
                    <Select allowClear mode="tags" placeholder="Gender: Mode Tags">
						<Select.Option value="Male">Male</Select.Option>
						<Select.Option value="Female">Female</Select.Option>
					</Select>
                </Form.Item>

                <button type="submit">Submit</button>
            </Form>

            <hr />

            <h3>Middle</h3>

            <Form size="middle" onFinish={(values) => {
                alert('Values show in console');

                console.log(values);
            }}>
                <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Username is required.' }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="password" label="Password" rules={[{
                    required: true,
                    message: 'Password is required.'
                }, {
                    pattern: /^(?!.* )(?=.*?[A-Z])(?=.*?[a-z])(?=.*[0-9]).{8,}$/,
                    message: 'Password is not a valid.'
                }]}>
                    <Input type="password" />
                </Form.Item>

				<Form.Item name="gender" label="Gender" rules={[{
                    required: true,
                    message: 'Gender is required.'
                }]}>
                    <Select allowClear mode="multiple" placeholder="Gender: Mode Multiple" menuItemSelectedIcon>
						<Select.Option value="Male">Male</Select.Option>
						<Select.Option value="Female">Female</Select.Option>
					</Select>
                </Form.Item>

                <button type="submit">Submit</button>
            </Form>

            <hr />
            
            <h3>Large</h3>

            <Form size="large" onFinish={(values) => {
                alert('Values show in console');

                console.log(values);
            }}>
                <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Username is required.' }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="password" label="Password" rules={[{
                    required: true,
                    message: 'Password is required.'
                }, {
                    pattern: /^(?!.* )(?=.*?[A-Z])(?=.*?[a-z])(?=.*[0-9]).{8,}$/,
                    message: 'Password is not a valid.'
                }]}>
                    <Input type="password" />
                </Form.Item>

				<Form.Item name="gender" label="Gender" rules={[{
                    required: true,
                    message: 'Gender is required.'
                }]}>
                    <Select allowClear placeholder="Gender: Mode Default">
						<Select.Option value="Male">Male</Select.Option>
						<Select.Option value="Female">Female</Select.Option>
					</Select>
                </Form.Item>

                <button type="submit">Submit</button>
            </Form>

            <hr />

            <Input size="small" placeholder="Input Small" />
            <hr />
            <Input size="middle" placeholder="Input Middle" />
            <hr />
            <Input size="large" placeholder="Input Large" />
        </div>
    )
}