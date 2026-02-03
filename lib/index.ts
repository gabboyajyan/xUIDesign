// Styles
import './styles/global.css';

import Button from '@/components/Button/Button';
import Checkbox from '@/components/Checkbox/Checkbox';
import Switch from '@/components/Switch/Switch';
import Empty from '@/components/Empty/Empty';
import Upload from '@/components/Upload/Upload';

import DatePicker from '@/components/DatePicker/DatePicker';
import RangePicker from '@/components/DatePicker/RangePicker/RangePicker';
import TimePicker from '@/components/DatePicker/TimePicker/TimePicker';

import Form from '@/components/Form/Form';
import FormItem from '@/components/Form/Item/Item';

import Input from '@/components/Input/Input';
import Textarea from '@/components/Input/Textarea/Textarea';

import Radio from '@/components/Radio/Radio';
import RadioButton from '@/components/Radio/Button/Button';
import RadioGroup from '@/components/Radio/Group/Group';

import Select from '@/components/Select/Select';
import Option from '@/components/Select/Option/Option';
import Tag from '@/components/Select/Tag/Tag';

import Skeleton from '@/components/Skeleton/Skeleton';
import SkeletonAvatar from '@/components/Skeleton/Avatar/Avatar';
import SkeletonButton from '@/components/Skeleton/Button/Button';
import SkeletonImage from '@/components/Skeleton/Image/Image';
import SkeletonInput from '@/components/Skeleton/Input/Input';

import Menu from '@/components/Menu/Menu';
import MenuItem from '@/components/Menu/Item/Item';
import MenuSubMenu from '@/components/Menu/SubMenu/SubMenu';

import Dropdown from '@/components/Dropdown/Dropdown';

import Popover from '@/components/Popover/Popover';

import Result from '@/components/Result/Result';

export {
  Button,
  Checkbox,
  Empty,
  DatePicker,
  RangePicker,
  TimePicker,
  Form,
  FormItem,
  Input,
  Textarea,
  Radio,
  RadioButton,
  RadioGroup,
  Select,
  Option,
  Tag,
  Skeleton,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonImage,
  SkeletonInput,
  Upload,
  Switch,
  Menu,
  MenuItem,
  MenuSubMenu,
  Dropdown,
  Popover,
  Result
};

export {
  ClearIcon,
  ArrowIcon,
  LoadingIcon,
  CheckIcon,
  SearchIcon,
  CalendarIcon,
  SuccessIcon,
  ErrorIcon,
  DateDistanceIcon,
  TimeIcon,
  StampleIcon,
  TrashIcon,
  SpinerIcon,
} from '@/components/Icons';

// Hooks
export { useForm } from '@/hooks/useForm';
export { useWatch } from '@/hooks/useWatch';

export type {
  FormInstance,
  RuleObject,
  RuleRender,
  FieldData,
  FieldInstancesInputRef,
  FieldError,
  FormProps,
  FormItemChildComponentProps
} from '@/types/form';

export type {
  DefaultProps,
  TargetProps,
  RuleTypes,
  RuleType,
  MouseEventHandlerSelect,
  SyntheticBaseEvent,
  Placement
} from '@/types';

export type {
  CheckboxProps
} from '@/types/checkbox';

export type {
  InputProps,
  TextareaProps
} from '@/types/input';

export type {
  PopoverProps
} from '@/types/popover';

export type {
  ButtonType,
  ButtonProps,
  BaseButtonProps
} from '@/types/button';

export type {
  ItemType,
  MenuProps,
  SubMenuItem
} from '@/types/menu';

export type {
  DropdownProps,
  DropdownItemType,
} from '@/types/dropdown';

export type {
  ResultProps,
  ResultStatusType
} from '@/types/result';

export type {
  RadioProps,
  RadioGroupProps,
  RadioButtonProps
} from '@/types/radio';

export type {
  TDatePickerProps,
  TRangePickerProps,
  TimePickerProps
} from '@/types/datepicker';

export type {
  SelectProps,
  OptionType,
  OptionProps,
  CustomTagProps,
  TagProps,
  DisplayValueType
} from '@/types/select';

export type {
  RcFile,
  UploadFile,
  UploadProps,
  UploadChangeParam
} from '@/types/upload';

export { FormContext } from '@/components/Form/Form';

export { clsx, createArray, parseValue } from '@/helpers'
export { flattenChildren } from '@/helpers/flatten';
