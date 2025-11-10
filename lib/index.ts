// Styles
import dynamic from 'next/dynamic';
import './styles/global.css';

const Button = dynamic(() => import('@/components/Button/Button'), { ssr: false });
const Checkbox = dynamic(() => import('@/components/Checkbox/Checkbox'), { ssr: false });
const Switch = dynamic(() => import('@/components/Switch/Switch'), { ssr: false });
const Empty = dynamic(() => import('@/components/Empty/Empty'), { ssr: false });
const Upload = dynamic(() => import('@/components/Upload/Upload'), { ssr: false });

const DatePicker = dynamic(() => import('@/components/DatePicker/DatePicker'), { ssr: false });
const RangePicker = dynamic(() => import('@/components/DatePicker/RangePicker/RangePicker'), { ssr: false });
const TimePicker = dynamic(() => import('@/components/DatePicker/TimePicker/TimePicker'), { ssr: false });

const Form = dynamic(() => import('@/components/Form/Form'), { ssr: false });
const FormItem = dynamic(() => import('@/components/Form/Item/Item'), { ssr: false });

const Input = dynamic(() => import('@/components/Input/Input'), { ssr: false });
const Textarea = dynamic(() => import('@/components/Input/Textarea/Textarea'), { ssr: false });

const Radio = dynamic(() => import('@/components/Radio/Radio'), { ssr: false });
const RadioButton = dynamic(() => import('@/components/Radio/Button/Button'), { ssr: false });
const RadioGroup = dynamic(() => import('@/components/Radio/Group/Group'), { ssr: false });

const Select = dynamic(() => import('@/components/Select/Select'), { ssr: false });
const Option = dynamic(() => import('@/components/Select/Option/Option'), { ssr: false });
const Tag = dynamic(() => import('@/components/Select/Tag/Tag'), { ssr: false });

const Skeleton = dynamic(() => import('@/components/Skeleton/Skeleton'), { ssr: false });
const SkeletonAvatar = dynamic(() => import('@/components/Skeleton/Avatar/Avatar'), { ssr: false });
const SkeletonButton = dynamic(() => import('@/components/Skeleton/Button/Button'), { ssr: false });
const SkeletonImage = dynamic(() => import('@/components/Skeleton/Image/Image'), { ssr: false });
const SkeletonInput = dynamic(() => import('@/components/Skeleton/Input/Input'), { ssr: false });

const Menu = dynamic(() => import('@/components/Menu/Menu'), { ssr: false });
const MenuItem = dynamic(() => import('@/components/Menu/Item/Item'), { ssr: false });
const MenuSubMenu = dynamic(() => import('@/components/Menu/SubMenu/SubMenu'), { ssr: false });

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
  MenuSubMenu
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
  SyntheticBaseEvent
} from '@/types';

export type {
  CheckboxProps
} from '@/types/checkbox';

export type {
  InputProps,
  TextareaProps
} from '@/types/input';

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
