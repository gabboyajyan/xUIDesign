'use client'

import { Select } from "./components/Select";
import { Tag } from "./components/Select/Tag";
import { CustomTagProps } from "./types/select";

const options = [
    { value: "gold" },
    { value: "lime" },
    { value: "green" },
    { value: "cyan" },
];

export default function Home() {
    const tagRender = (props: CustomTagProps) => {
        const { label, value, closable, onClose } = props;

        return (
            <div style={{ display: 'flex' }}>
                <Tag
                color={value}
                value={value}
                label={label}
                onClose={onClose}
                closable={closable}
            />
            </div>
        );
    }

    return (
        <div style={{ width: 700, margin: '0 auto' }}>
            <Select
                mode="tags"
                options={options}
                tagRender={tagRender}
                defaultValue={["gold", "cyan"]}
            />
        </div>
    )
}