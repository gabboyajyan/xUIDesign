import React from "react";
import { PopoverProps } from "../../types/popover";
import './style.css';
declare const Popover: ({ prefixCls, content, children, trigger, placement, open, onOpenChange, getPopupContainer }: PopoverProps) => React.JSX.Element;
export default Popover;
