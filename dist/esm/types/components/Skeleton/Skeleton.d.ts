import React, { ReactElement } from 'react';
import { SkeletonProps } from '../../types/skeleton';
import './style.css';
declare const Skeleton: {
    ({ prefixCls, active, className, style, avatar, paragraph, round, title, teamLogo }: SkeletonProps): ReactElement;
    Image: React.FC<import("../../types/skeleton").SkeletonImageProps>;
    Input: React.FC<import("../../types/skeleton").SkeletonInputProps>;
    Avatar: React.FC<import("../../types/skeleton").SkeletonAvatarProps>;
    Button: React.FC<import("../../types/skeleton").SkeletonButtonProps>;
};
export default Skeleton;
