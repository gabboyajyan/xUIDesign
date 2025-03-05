import { FC, SyntheticEvent } from 'react';
import { SyntheticEventTargetProps, TagProps } from '@/app/types/select';
import './style.css'

const Tag: FC<TagProps> = ({
    prefixCls = 'custom-select',
    values = [],
    handleRemoveTag
}: TagProps) => {
    return (
        <div className={`${prefixCls}-tag-container`}>
            {values.map((tag, index) => (
                <div key={`${index}_${tag}`} className={`${prefixCls}-tag`}>
                    {tag}
                    <span
                        className={`${prefixCls}-tag-close-icon`}
                        onClick={(e: SyntheticEvent) => {
                            (e as SyntheticEventTargetProps).target.value = tag
                            handleRemoveTag(e as SyntheticEventTargetProps)
                        }}>×</span>
                </div>
            ))}
        </div>
    );
};

export { Tag };
