import { FC, MouseEvent } from 'react';
import { CustomTagProps } from '@/app/types/select';
import { prefixClsSelect } from '@/app/utils';
import './style.css';

const Tag: FC<CustomTagProps> = ({
    prefixCls = prefixClsSelect,
    style = {},
    onClose,
    value,
    label,
    closable,
    color,
    icon
}) => {
    return (
        <div style={{ ...style, backgroundColor: color }} className={`${prefixCls}-tag`}>
            <span>{label !== undefined ? label : value}</span>

            {closable && <span
                className={`${prefixCls}-tag-close-icon`}
                onClick={(e: MouseEvent<HTMLSpanElement> & { target: { valueAnyType: string[] } }) => {
                    e.preventDefault();
                    e.stopPropagation();

                    e.target.valueAnyType = [value]

                    onClose(e)
                }}>{icon || <>&#x2715;</>}</span>}
        </div>
    )
}

export { Tag };
