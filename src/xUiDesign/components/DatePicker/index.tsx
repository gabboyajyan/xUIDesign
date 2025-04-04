"use client"

import React, { useState } from "react";
import { DefaultProps } from "@/xUiDesign/types";
import { prefixClsDatepicker } from "@/xUiDesign/utils";
import "./style.css";

type TDatePickerProps = DefaultProps & {
    value: Date,
    onChange: (date: string) => void,
    disabled?: boolean,
    placeholder?: string,
    error?: boolean
}

const DatePicker = ({
    value,
    onChange,
    disabled,
    error,
    placeholder = "Select date",
    prefixCls = prefixClsDatepicker
}: TDatePickerProps) => {
    const [selectedDate, setSelectedDate] = useState<Date>(value || null);
    const [isOpen, setIsOpen] = useState(false);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const handleSelect = (day: number) => {
        if (disabled) {
            return;
        }

        const date = new Date(currentYear, currentMonth, day);

        setSelectedDate(date);
        onChange?.(`${day}/${currentMonth}/${currentYear}`);
        setIsOpen(false);
    };

    return (
        <div className={`${prefixCls}-container`}>
            <button
                type="button"
                className={`${prefixCls}-input ${disabled ? `${prefixCls}-disabled` : ''} ${error ? `${prefixCls}-error` : ''}`}
                disabled={disabled}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selectedDate ? selectedDate.toLocaleDateString() : placeholder}</span>
                <span className={`${prefixCls}-icon`}>📅</span>
            </button>
            {isOpen && (
                <div className={`${prefixCls}-dropdown`}>
                    <div className={`${prefixCls}-header`}>
                        <select
                            value={currentYear}
                            className={`${prefixCls}-select`}
                            onChange={(e) => setCurrentYear(parseInt(e.target.value))}
                        >
                            {Array.from({ length: 100 }, (_, i) => 1925 + i).map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        <select
                            value={currentMonth}
                            className={`${prefixCls}-select`}
                            onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
                        >
                            {Array.from({ length: 12 }, (_, i) => i).map((month) => (
                                <option key={month} value={month}>{new Date(0, month).toLocaleString('default', { month: 'long' })}</option>
                            ))}
                        </select>
                    </div>
                    <div className={`${prefixCls}-grid`}>
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                            <div key={day} className={`${prefixCls}-day-header`}>{day}</div>
                        ))}
                        {[...Array(firstDayOfMonth(currentYear, currentMonth))].map((_, i) => (
                            <div key={`empty-${i}`} className={`${prefixCls}-empty`}></div>
                        ))}
                        {[...Array(daysInMonth(currentYear, currentMonth))].map((_, i) => (
                            <button
                                key={i}
                                className={`${prefixCls}-day ${selectedDate && selectedDate.getDate() === i + 1 &&
                                    selectedDate.getMonth() === currentMonth &&
                                    selectedDate.getFullYear() === currentYear ? `${prefixCls}-selected` : ""
                                    }`}
                                onClick={() => handleSelect(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DatePicker;
