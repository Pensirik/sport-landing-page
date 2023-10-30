'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

type Props = {
  type: 'push' | 'replace';
  href: string;
  beforeRedirection?: () => any;
  afterRedirection?: () => any;
};

const Redirect: React.FC<Props> = (props) => {
  const router = useRouter();
  const isRouteChanging = useRef<boolean>(false);
  useEffect(() => {
    async function handle() {
      if (isRouteChanging.current) return;
      isRouteChanging.current = true;
      await props.beforeRedirection?.();
      if (props.type === 'push') {
        await router.push(props.href);
      }
      if (props.type === 'replace') {
        await router.replace(props.href);
      }
      await props.afterRedirection?.();
      isRouteChanging.current = false;
    }
    handle();
  }, []);
  return null;
};

export default Redirect;
