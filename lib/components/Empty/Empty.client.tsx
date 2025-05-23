'use client';

import React from 'react';
import { EmptyProps } from '../../types/empty';
import Empty from './Empty';
import './style.css';

const EmptyClient = (props: EmptyProps) => (
  <Empty {...props} />
);

export default EmptyClient;