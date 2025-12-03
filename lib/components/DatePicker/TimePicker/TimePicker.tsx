'use client';

import React, {
  ChangeEvent,
  FC,
  FocusEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  RefObject,
  SyntheticEvent,
  useEffect,
  useRef,
  useState
} from 'react';
import { clsx } from '../../../helpers';
import { RuleType } from '../../../types';
import { TimePickerProps } from '../../../types/datepicker';
import { prefixClsPopupPosition, prefixClsTimePicker } from '../../../utils';
import { ClearIcon, TimeIcon } from '../../Icons/Icons';
import { ConditionalWrapper } from '../../../components/ConditionalWrapper';
import { createPortal } from 'react-dom';
import { usePopupPosition } from '../../../hooks/usePopupPosition';
import './style.css';

const HOURS = 24;
const INPUT_SIZE = 13;
const TIME_OPTION_PADDING = 4;
const MINUTES_AND_SECONDS = 60;
const ADD_EMPTY_SECTION_COUNT = 5;

const pad = (num: number): string => String(num).padStart(2, '0');

const TimePicker: FC<TimePickerProps> = ({
  prefixCls = prefixClsTimePicker,
  style = {},
  className = '',
  disabledTime,
  inputReadOnly = false,
  format = 'HH:mm:ss',
  defaultValue = null,
  value: propValue = null,
  onChange,
  onBlur,
  onSelect,
  showNow = true,
  clearIcon = <ClearIcon />,
  suffixIcon = <TimeIcon />,
  placeholder = 'Select time',
  getPopupContainer,
  placement = "bottomLeft"
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [innerValue, setInnerValue] = useState<Date | null>(
    propValue || defaultValue ? new Date(propValue || defaultValue) : null
  );

  const [[showHour, showMinutes, showSeconds]] = useState(`${format}`.split(':'))

  const [tempValue, setTempValue] = useState<Date | null>(null);

  const targetRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);

  const { popupStyle } = usePopupPosition({
    open,
    popupRef,
    placement,
    targetRef,
    inBody: getPopupContainer?.(targetRef.current as HTMLElement)?.tagName === 'BODY'
  })

  useEffect(() => {
    setInnerValue(propValue || defaultValue ? new Date(propValue || defaultValue) : null);
  }, [propValue])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target as Node) &&
        targetRef.current &&
        !targetRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setTempValue(null);

        if (!innerValue) {
          onChange?.(null as RuleType, '');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [innerValue, onChange]);

  useEffect(() => {
    if (open) {
      setTempValue(innerValue ? new Date(innerValue) : null);

      const { hour = 0, minute = 0, second = 0 } = getTimeParts(innerValue);
      scrollToTop(hourRef as { current: HTMLDivElement }, hour || 0);
      scrollToTop(minuteRef as { current: HTMLDivElement }, minute || 0);
      scrollToTop(secondRef as { current: HTMLDivElement }, second || 0);
    }
  }, [open, innerValue]);

  useEffect(() => {
    onSelect?.(tempValue);
  }, [tempValue, onSelect]);

  useEffect(() => {
    if (open) {
      setTempValue(innerValue ? new Date(innerValue) : null);
    }
  }, [open, innerValue]);

  const formatDate = (date: Date | null): string => {
    if (!date) {
      return '';
    }

    return `${format}`
      .replace(/HH|hh/, pad(date.getHours()))
      .replace(/MM|mm/, pad(date.getMinutes()))
      .replace(/SS|ss/, pad(date.getSeconds()));
  };

  const getTimeParts = (date: Date | null) => ({
    hour: date?.getHours() ?? null,
    minute: date?.getMinutes() ?? null,
    second: date?.getSeconds() ?? null
  });

  const getDisabled = (
    type: 'hour' | 'minute' | 'second',
    hour = 0,
    minute = 0
  ): number[] => {
    const disabled = disabledTime?.(tempValue || new Date());

    if (!disabled) {
      return [];
    }

    if (type === 'hour') {
      return disabled.disabledHours?.() || [];
    }

    if (type === 'minute') {
      return disabled.disabledMinutes?.(hour) || [];
    }

    if (type === 'second') {
      return disabled.disabledSeconds?.(hour, minute) || [];
    }

    return [];
  };

  const scrollToTop = (
    ref: RefObject<HTMLDivElement>,
    selectedIndex: number
  ): void => {
    const el = ref.current?.querySelectorAll('div')[selectedIndex];

    if (el && ref.current) {
      ref.current.scrollTo({
        top: el.offsetTop - TIME_OPTION_PADDING * 2,
        behavior: 'smooth'
      });
    }
  };

  const updateTempValue = (hour: number, minute: number, second: number) => {
    const newDate = new Date();
    newDate.setHours(hour, minute, second, 0);
    setTempValue(newDate);
  };

  const onSelectHour = (h: number, auto?: boolean): void => {
    const { minute = 0, second = 0 } = getTimeParts(tempValue);

    if (!auto) {
      if (!minute) {
        onSelectMinute(0, true);
      }

      if (!second) {
        onSelectSecond(0, true);
      }
    }

    updateTempValue(h, minute || 0, second || 0);
    scrollToTop(hourRef as { current: HTMLDivElement }, h);
  };

  const onSelectMinute = (m: number, auto?: boolean): void => {
    const { hour = 0, second = 0 } = getTimeParts(tempValue);

    if (!auto) {
      if (!hour) {
        onSelectHour(0, true);
      }

      if (!second) {
        onSelectSecond(0, true);
      }
    }

    updateTempValue(hour || 0, m, second || 0);
    scrollToTop(minuteRef as { current: HTMLDivElement }, m);
  };

  const onSelectSecond = (s: number, auto?: boolean): void => {
    const { hour = 0, minute = 0 } = getTimeParts(tempValue);

    if (!auto) {
      if (!hour) {
        onSelectHour(0, true);
      }

      if (!minute) {
        onSelectMinute(0, true);
      }
    }

    updateTempValue(hour || 0, minute || 0, s);
    scrollToTop(secondRef as { current: HTMLDivElement }, s);
  };

  const handleClear = (e?: ReactMouseEvent<HTMLSpanElement>): void => {
    e?.stopPropagation();
    setInnerValue(null);
    setTempValue(null);
    onChange?.(null as RuleType, '');
  };

  const handleShowNow = (e: SyntheticEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    const now = new Date();

    setTempValue(now);
    setInnerValue(now);
    onChange?.(now, formatDate(now));
    onSelect?.(now);
    setOpen(false);
  };

  const handleOkButton = (e: SyntheticEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (tempValue) {
      setInnerValue(tempValue);
      onChange?.(tempValue, formatDate(tempValue));
      onSelect?.(tempValue);
    }

    setOpen(false);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value.trim();
    const timeRegex = /^(\d{2}):(\d{2}):(\d{2})$/;
    const match = inputVal.match(timeRegex);

    if (match) {
      const [, hStr, mStr, sStr] = match;
      const h = parseInt(hStr, 10);
      const m = parseInt(mStr, 10);
      const s = parseInt(sStr, 10);

      if (
        h >= 0 &&
        h < HOURS &&
        m >= 0 &&
        m < MINUTES_AND_SECONDS &&
        s >= 0 &&
        s < MINUTES_AND_SECONDS &&
        !getDisabled('hour').includes(h) &&
        !getDisabled('minute', h).includes(m) &&
        !getDisabled('second', h, m).includes(s)
      ) {
        onSelectHour(h);
        onSelectMinute(m);
        onSelectSecond(s);
      }
    }
  };

  const renderOptions = (): ReactNode => {
    const hours = Array.from(
      { length: HOURS + ADD_EMPTY_SECTION_COUNT },
      (_, i) => (i < HOURS ? i : false)
    );

    const minutesSeconds = Array.from(
      { length: MINUTES_AND_SECONDS + ADD_EMPTY_SECTION_COUNT },
      (_, i) => (i < MINUTES_AND_SECONDS ? i : false)
    );

    const {
      hour: selectedHour,
      minute: selectedMinute,
      second: selectedSecond
    } = getTimeParts(tempValue);

    const currentHour = selectedHour ?? 0;
    const currentMinute = selectedMinute ?? 0;

    return (
      <div>
        <div className={`${prefixCls}-panel`}>
          {showHour ? <div ref={hourRef} className={`${prefixCls}-column`}>
            {hours.map((h, index) =>
              h === false ? (
                <div
                  key={`${h}_${index}`}
                  className={`${prefixCls}-cell`}
                  style={{ opacity: 0, userSelect: 'none', cursor: 'inherit' }}
                >
                  0
                </div>
              ) : (
                <div
                  key={h}
                  className={clsx([
                    `${prefixCls}-cell`,
                    {
                      [`${prefixCls}-cell-disabled`]:
                        getDisabled('hour').includes(h),
                      [`${prefixCls}-cell-selected`]: selectedHour === h
                    }
                  ])}
                  onClick={() =>
                    !getDisabled('hour').includes(h) && onSelectHour(h)
                  }
                >
                  {pad(h)}
                </div>
              )
            )}
          </div> : null}

          {showMinutes ? <div ref={minuteRef} className={`${prefixCls}-column`}>
            {minutesSeconds.map((m, index) =>
              m === false ? (
                <div
                  key={`${m}_${index}`}
                  className={`${prefixCls}-cell`}
                  style={{ opacity: 0, userSelect: 'none', cursor: 'inherit' }}
                >
                  0
                </div>
              ) : (
                <div
                  key={m}
                  className={clsx([
                    `${prefixCls}-cell`,
                    {
                      [`${prefixCls}-cell-disabled`]: getDisabled(
                        'minute',
                        currentHour
                      ).includes(m),
                      [`${prefixCls}-cell-selected`]: selectedMinute === m
                    }
                  ])}
                  onClick={() =>
                    !getDisabled('minute', currentHour).includes(m) &&
                    onSelectMinute(m)
                  }
                >
                  {pad(m)}
                </div>
              )
            )}
          </div> : null}

          {showSeconds ? <div ref={secondRef} className={`${prefixCls}-column`}>
            {minutesSeconds.map((s, index) =>
              s === false ? (
                <div
                  key={`${s}_${index}`}
                  className={`${prefixCls}-cell`}
                  style={{ opacity: 0, userSelect: 'none', cursor: 'inherit' }}
                >
                  0
                </div>
              ) : (
                <div
                  key={s}
                  className={clsx([
                    `${prefixCls}-cell`,
                    {
                      [`${prefixCls}-cell-disabled`]: getDisabled(
                        'second',
                        currentHour,
                        currentMinute
                      ).includes(s),
                      [`${prefixCls}-cell-selected`]: selectedSecond === s
                    }
                  ])}
                  onClick={() =>
                    !getDisabled('second', currentHour, currentMinute).includes(
                      s
                    ) && onSelectSecond(s)
                  }
                >
                  {pad(s)}
                </div>
              )
            )}
          </div> : null}
        </div>
        <div className={`${prefixCls}-actions`}>
          {showNow ? (
            <div className={`${prefixCls}-now-btn`} onClick={handleShowNow}>
              Now
            </div>
          ) : (
            <span />
          )}
          <button
            className={`${prefixCls}-ok-btn`}
            disabled={
              selectedHour === null ||
              selectedMinute === null ||
              selectedSecond === null
            }
            onClick={handleOkButton}
          >
            OK
          </button>
        </div>

        <div className={`${prefixCls}-arrow ${prefixClsPopupPosition}-${placement}`} />
      </div>
    );
  };

  return (
    <div className={clsx([`${prefixCls}-wrapper`, className])} style={style}>
      <div
        className={`${prefixCls}-input-wrapper`}
        onClick={() => setOpen(true)}
      >
        <input
          ref={targetRef}
          size={INPUT_SIZE}
          placeholder={placeholder}
          className={`${prefixCls}-input`}
          readOnly={inputReadOnly}
          onChange={handleOnChange}
          value={open ? formatDate(tempValue) : formatDate(innerValue) || ''}
          onBlur={(e: FocusEvent<HTMLInputElement>) => {
            onBlur?.(e, { source: 'input' });
          }}
        />
        {clearIcon && innerValue ? (
          <span className={`${prefixCls}-clear`} onClick={handleClear}>
            {clearIcon}
          </span>
        ) : (
          suffixIcon && (
            <span
              className={`${prefixCls}-suffix`}
              onClick={e => {
                e.stopPropagation();
                setOpen(true);
              }}
            >
              {suffixIcon}
            </span>
          )
        )}

        {open && (
          <ConditionalWrapper
            condition={!!getPopupContainer}
            wrapper={(element) => getPopupContainer
              ? createPortal(element, getPopupContainer(targetRef.current as HTMLElement) as HTMLElement)
              : <>{element}</>
            }>
            <div
              ref={popupRef}
              style={popupStyle}
              className={`${prefixCls}-popup ${prefixClsPopupPosition}`}>
              {renderOptions()}
            </div>
          </ConditionalWrapper>
        )}
      </div>

    </div>
  );
};

export default TimePicker;
