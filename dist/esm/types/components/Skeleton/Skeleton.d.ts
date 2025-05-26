import { ReactElement } from 'react';
import { SkeletonProps } from '../../types/skeleton';
import './style.css';
declare const Skeleton: {
    ({ prefixCls, active, className, style, avatar, paragraph, round, title, teamLogo }: SkeletonProps): ReactElement;
    Image: import("react").FC<import("../../types/skeleton").SkeletonImageProps>;
    Input: import("react").FC<import("../../types/skeleton").SkeletonInputProps>;
    Avatar: import("react").FC<import("../../types/skeleton").SkeletonAvatarProps>;
    Button: import("react").FC<import("../../types/skeleton").SkeletonButtonProps>;
};
export default Skeleton;
