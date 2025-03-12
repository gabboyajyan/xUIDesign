import { FC, MouseEvent } from 'react';
import { CustomTagProps } from '@/app/types/select';
import { prefixClsSelect } from '@/app/utils';
import { TargetProps } from '@/app/types';
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
    const handleOnClick = (e: MouseEvent<HTMLSpanElement> & TargetProps) => {
        e.preventDefault();
        e.stopPropagation();

        e.target.value = value

        onClose(e)
    }

    return (
        <div style={{ ...style, backgroundColor: color }} className={`${prefixCls}-tag`}>
            <span>{label !== undefined ? label : value}</span>

            {closable && <span
                className={`${prefixCls}-tag-close-icon`}
                onClick={handleOnClick}
            >
                {icon || <>&#x2715;</>}
            </span>}
        </div>
    )
}

export { Tag };
