import { PageConfig, Pages } from 'constants/pages';
import { useEffect, useState } from 'react';
import { matchRoutes, useLocation } from 'react-router-dom';

interface RouteConfig {
   path: string;
}

const pages = Array.from(Pages.values());
const routes: RouteConfig[] = pages.map((p) => ({ path: p.path }));

export const useActiveLocation = () => {
   const location = useLocation();
   const [activeLocation, setActiveLocation] = useState<PageConfig | undefined>();

   useEffect(() => {
      const matches = matchRoutes<RouteConfig>(routes, location);
      const path = matches?.length ? matches[0].route.path : undefined;
      const page = pages.find((p) => p.path === path);
      setActiveLocation(page !== undefined ? { ...page } : undefined);
   }, [location]);

   return activeLocation;
};
