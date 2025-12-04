import React from "react";
import { ResultProps } from "../../types/result";
import { prefixClsResult } from "../../utils";
import { renderDefaultIcon } from "../Icons/Icons";
import './style.css';

const Result = ({
    icon,
    status = "info",
    title,
    subTitle,
    extra,
    prefixCls = prefixClsResult,
    className = "",
    style,
    children,
}: ResultProps) => {
    const renderIcon = () => {
        if (icon) {
            return <div className={`${prefixCls}-icon`}>{icon}</div>;
        }

        return <div className={`${prefixCls}-icon`}>{renderDefaultIcon(status)}</div>;
    };

    return (
        <div className={`${prefixCls} ${prefixCls}-${status} ${className}`} style={style}>
            {renderIcon()}

            {title && <div className={`${prefixCls}-title`}>{title}</div>}
            {subTitle && <div className={`${prefixCls}-subtitle`}>{subTitle}</div>}
            {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}

            {children && <div className={`${prefixCls}-content`}>{children}</div>}
        </div>
    );
};

export default Result;