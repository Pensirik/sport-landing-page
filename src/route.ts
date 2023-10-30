import { Permission } from '@/constants/role';

export enum RouteName {
  Home = 'Home',
  Error = 'Error',
  NotFound = 'NotFound',
}

export type RouteConfiguration = {
  pathname: string;
  parentRouteName?: RouteName;
  auth?: {
    required: true;
    needPermissions?: Permission[];
  } | ({
    required?: false;
    routeNameToRedirectIfAuthenticated?: RouteName;
  });
};

export const Route: Record<RouteName, RouteConfiguration> = {
  [RouteName.Home]: {
    pathname: '/',
  },
  [RouteName.Error]: {
    pathname: '/500',
  },
  [RouteName.NotFound]: {
    pathname: '/404',
  },
};

export const PathnameBasedRoute = Object.values(Route).reduce<Record<string, RouteConfiguration>>((acc, cur) => {
  return {
    ...acc,
    [cur.pathname]: cur,
  };
}, {});

export const Routes = Object.values(Route);
