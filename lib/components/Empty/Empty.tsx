import React from 'react';
import { EmptyContentProps } from '../../types/empty';
import { prefixClsEmpty } from '../../utils';
import EmptyContentClient from './Empty.client';

const Empty = ({
  icon,
  style = {},
  className = '',
  title = 'No Data',
  description = 'No data',
  prefixCls = prefixClsEmpty
}: EmptyContentProps) => {
  return (
    <EmptyContentClient
      icon={icon}
      style={style}
      className={className}
      title={title}
      description={description}
      prefixCls={prefixCls}
    />
  );
};

export default Empty;