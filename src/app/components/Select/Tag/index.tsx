import { FC, MouseEvent } from 'react';
import { TagProps } from '@/app/types/select';
import { prefixClsSelect } from '@/app/utils';
import './style.css'

const Tag: FC<TagProps> = ({
    prefixCls = prefixClsSelect,
    values = [],
    handleRemoveTag,
    searchContainer
}: TagProps) => {
    return (
        <div className={`${prefixCls}-tag-container`}>
            {values.map((tag, index) => (
                <div key={`${index}_${tag}`} className={`${prefixCls}-tag`}>
                    <span>{tag}</span>

                    <span
                        className={`${prefixCls}-tag-close-icon`}
                        onClick={(e: MouseEvent<HTMLSpanElement> & { target: { valueAnyType: string[] } }) => {
                            e.preventDefault();

                            e.target.valueAnyType = [tag]

                            handleRemoveTag(e)
                        }}>&#x2715;</span>
                </div>
            ))}

            {searchContainer}
        </div>
    );
};

export { Tag };
