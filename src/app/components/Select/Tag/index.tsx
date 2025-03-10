import { FC, MouseEvent } from 'react';
import { CustomTagProps, TagProps } from '@/app/types/select';
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

const SelectTag: FC<TagProps> = ({
    style = {},
    className = '',
    prefixCls = prefixClsSelect,
    values = [],
    onClose,
    onChange,
    onKeyDown,
    tagRender,
    closable = true,
    search = {
        query: '',
        open: false,
        disabled: false,
        fullWidth: false,
        placeholder: '',
        setIsOpen: () => { }
    }
}: TagProps) => {
    return (
        <div style={style} className={`${className} ${prefixCls}-tag-container`}>
            {(values).map((tag, index) => (
                tagRender?.({ label: tag, value: tag, onClose, closable }) || <Tag
                    value={tag}
                    label={tag}
                    onClose={onClose}
                    closable={closable}
                    key={`${index}_${tag}`}
                />
            ))}

            <div
                className={`${prefixCls}-tag`}
                style={{
                    minWidth: '30px',
                    width: search.query.length ? `${search.query.length * 10}px` : search.fullWidth ? '100%' : '10px'
                }}
            >
                <input
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    disabled={search.disabled}
                    className={`${prefixCls}-tag-input`}
                    placeholder={values.length ? '' : search.placeholder}
                    onClick={() => !search.disabled && search.setIsOpen?.(p => !p || !!search.open)}
                />
            </div>
        </div>
    );
};

export { Tag, SelectTag };
