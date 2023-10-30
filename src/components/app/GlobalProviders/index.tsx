'use client';

import { PropsWithChildren } from 'react';
import ReactQueryProvider from './ReactQueryProvider';

const GlobalProviders: React.FC<PropsWithChildren> = ({ children }) => (
  <ReactQueryProvider>
    {children}
  </ReactQueryProvider>
);

export default GlobalProviders;
