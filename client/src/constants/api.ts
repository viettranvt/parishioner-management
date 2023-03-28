const basePath = '/api';

export const resourcePaths = new Proxy(
   {
      auth: '/auth',
      parishioner: '/parishioners',
   },
   {
      get: (target: Record<string, string>, property: string) => `${basePath}${target[property]}`,
   }
);
