import React from 'react';
import { TagProps } from '@/app/types/select';
import './style.css'

const Tag: React.FC<TagProps> = ({
    prefixCls = 'xUi-select',
    values = [],
    handleRemoveTag
}: TagProps) => {
    return (
        <div className={`${prefixCls}-tag-container`}>
            {values.map((tag, index) => (
                <div key={`${index}_${tag}`} className={`${prefixCls}-tag`}>
                    {tag}
                    <span className={`${prefixCls}-tag-close-icon`} onClick={() => handleRemoveTag(tag)}>&#x2715;</span>
                </div>
            ))}
        </div>
    );
};

export { Tag };
