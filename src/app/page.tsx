'use client'

import { Result } from "../../lib/components/Result";
import { Button } from '../../lib/components/Button';
import { Popover } from '../../lib/components/Popover';
import { Select } from "../../lib/components/Select";
import Option from "../../lib/components/Select/Option/Option";
import Tag from "../../lib/components/Select/Tag/Tag";

export default function Home() {
    return (
        <Select mode="tags" 
        tagRender={(tagProps) => {
            return <Tag {...tagProps}>{tagProps.value}</Tag>
        }}
         options={[ {value: 'tag_1', label: 'Tag 1'}]} 
        />
            // {/* <Option value={'tag_1'}>tag 1</Option> */}
        // </Select>
    )
}

