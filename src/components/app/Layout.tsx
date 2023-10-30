'use client';

import { PropsWithChildren } from 'react';

const Layout: React.FC<PropsWithChildren> = (props) => {
  return (
    <div className="relative">
      {props.children}
    </div>
  );
};

export default Layout;
