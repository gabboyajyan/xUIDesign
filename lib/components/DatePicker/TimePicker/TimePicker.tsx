'use client';

import React, {
  ChangeEvent,
  CSSProperties,
  FC,
  FocusEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { clsx } from '../../../helpers';
import { RuleType } from '../../../types';
import { TimePickerProps } from '../../../types/datepicker';
import { prefixClsTimePicker } from '../../../utils';
import { ClearIcon, TimeIcon } from '../../Icons/Icons';
import { ConditionalWrapper } from '@/components/ConditionalWrapper';
import { createPortal } from 'react-dom';
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
  getPopupContainer
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [innerValue, setInnerValue] = useState<Date | null>(
    propValue || defaultValue ? new Date(propValue || defaultValue) : null
  );

  const [openUpward, setOpenUpward] = useState(false);

  const [[showHour, showMinutes, showSeconds]] = useState(`${format}`.split(':'))

  const [tempValue, setTempValue] = useState<Date | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);

  const [dropdownPosition, setDropdownPosition] = useState<CSSProperties>({});

  useEffect(() => {
    setInnerValue(propValue || defaultValue ? new Date(propValue || defaultValue) : null);
  }, [propValue])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
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

  const handleShowNow = (): void => {
    const now = new Date();
    setTempValue(now);
    setInnerValue(now);
    onChange?.(now, formatDate(now));
    onSelect?.(now);
    setOpen(false);
  };

  const handleOkButton = (): void => {
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

  const dropdownPossition = useCallback(() => {
    if (!inputRef.current) return {};

    const inputRect = inputRef.current.getBoundingClientRect();
    const popupEl = popupRef.current;
    const dropdownHeight = popupEl?.offsetHeight || 230;

    const parents = getScrollParents(inputRef.current);
    const popupContainer = getPopupContainer
      ? getPopupContainer(document.body)
      : parents[parents.length - 2] || parents[1] || document.body;

    const containerRect = popupContainer.getBoundingClientRect();

    const spaceAbove = inputRect.top - containerRect.top;
    const spaceBelow = containerRect.bottom - inputRect.bottom;

    const shouldShowAbove = spaceBelow < dropdownHeight && spaceAbove > dropdownHeight;

    if (getPopupContainer) {
      if (shouldShowAbove) {
        setDropdownPosition({
          top: (inputRef.current?.getBoundingClientRect().top || 0) + document.documentElement.scrollTop - 230,
          left: (inputRef.current?.getBoundingClientRect().left || 0) + document.documentElement.scrollLeft,
        })
      } else {
        setDropdownPosition({
          top: (inputRef.current?.getBoundingClientRect().top || 0) + document.documentElement.scrollTop + (inputRef.current?.offsetHeight || 0),
          left: (inputRef.current?.getBoundingClientRect().left || 0) + document.documentElement.scrollLeft,
        })
      }
    } else {
      setDropdownPosition({
        top:
          shouldShowAbove
            ? inputRef.current.offsetTop -
            (popupEl?.offsetHeight || dropdownHeight) - 8
            : inputRef.current.offsetTop + inputRef.current.offsetHeight,
        left: inputRef.current.offsetLeft,
      });
    }
  }, [open, getPopupContainer]);


  const getScrollParents = useCallback((element: HTMLElement): HTMLElement[] => {
    const parents: HTMLElement[] = [];
    let current = element.parentElement;

    while (current) {
      if (current.scrollHeight > current.clientHeight) {
        parents.push(current);
      }
      current = current.parentElement;
    }

    return parents;
  }, []);

  useEffect(() => {
    if (!open) return;

    const _dropdownPossition = () => dropdownPossition();

    _dropdownPossition();

    const controller = new AbortController();

    const scrollableParents = getScrollParents(inputRef.current!);

    scrollableParents.forEach(el => {
      el.addEventListener('scroll', _dropdownPossition, {
        passive: true,
        signal: controller.signal
      });
    });

    window.addEventListener('scroll', _dropdownPossition, {
      passive: true,
      signal: controller.signal
    });

    window.addEventListener('resize', _dropdownPossition, {
      signal: controller.signal
    });

    return () => {
      controller.abort();
    };
  }, [open, getPopupContainer, dropdownPossition]);

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
          ref={inputRef}
          size={INPUT_SIZE}
          placeholder={placeholder}
          className={`${prefixCls}-input`}
          readOnly={inputReadOnly}
          onChange={handleOnChange}
          // {...(open ? {} : { value: formatDate(innerValue) })}
          value={open ? formatDate(tempValue) : formatDate(innerValue) || ''}
          onBlur={(e: FocusEvent<HTMLInputElement>) => {
            onBlur?.(e, { source: 'input' });
          }}
        />
        <div className={`${prefixCls}-icons`}>
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
        </div>
      </div>

      {open && (
        <ConditionalWrapper
          condition={getPopupContainer !== undefined}
          wrapper={(element) => getPopupContainer ? createPortal(element, getPopupContainer(popupRef.current as HTMLElement)) : <>{element}</>}>
          <div
            ref={popupRef}
            style={{
              ...dropdownPosition,
              opacity: Object.keys(dropdownPosition).length ? 1 : 0
            }}
            className={`${prefixCls}-popup`}>
            {renderOptions()}
          </div>
        </ConditionalWrapper>
      )}
    </div>
  );
};

export default TimePicker;
