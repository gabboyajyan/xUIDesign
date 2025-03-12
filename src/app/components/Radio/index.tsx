"use client";

import { RadioProps } from "@/app/types/radio";
import "./style.css";

const Radio = ({
    prefixCls,
    className = '',
    style = {}
}: RadioProps,

) => {
    return <input className={`${prefixCls} ${className}`} style={style} />
};

export { Radio };
