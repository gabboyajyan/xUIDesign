import { FC } from 'react';
import { SkeletonAvatarProps } from '@/types/skeleton';
import './style.css';
export declare const AVATAR_DEFAULT_SIZE = 32;
export declare const AVATAR_GLOBAL_SIZE = 40;
export declare const GET_AVATAR_SKELETON_PROPS: (avatar: SkeletonAvatarProps | boolean) => SkeletonAvatarProps;
export declare const SkeletonAvatar: FC<SkeletonAvatarProps>;
